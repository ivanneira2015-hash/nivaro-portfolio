// Corre en Vercel antes del deploy. Escanea projects/ y genera projects/manifest.json.
// Cada subcarpeta con un meta.json se convierte en un card del portfolio.
const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "..", "projects");
const manifestPath = path.join(projectsDir, "manifest.json");

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
  fs.writeFileSync(manifestPath, "[]");
  console.log("projects/ creado, manifest vacío.");
  process.exit(0);
}

const folders = fs.readdirSync(projectsDir)
  .filter((f) => {
    if (f.startsWith("_") || f.startsWith(".") || f === "manifest.json") return false;
    return fs.statSync(path.join(projectsDir, f)).isDirectory();
  })
  .sort();

const HUES = {
  pink: "linear-gradient(135deg, #FF2D78 0%, #6B0F3A 100%)",
  cyan: "linear-gradient(135deg, #00E5FF 0%, #0A4D5A 100%)",
  "pink-cyan": "linear-gradient(135deg, #FF2D78 0%, #00E5FF 100%)",
  "cyan-pink": "linear-gradient(135deg, #00E5FF 0%, #FF2D78 100%)",
  purple: "linear-gradient(135deg, #7B2FFF 0%, #2A0F6B 100%)",
  lime: "linear-gradient(135deg, #B6FF2D 0%, #2A6B0F 100%)",
};

const manifest = [];
let n = 1;

for (const folder of folders) {
  const metaPath = path.join(projectsDir, folder, "meta.json");
  if (!fs.existsSync(metaPath)) {
    console.warn(`⚠  ${folder} — sin meta.json, ignorado`);
    continue;
  }
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    const hueKey = meta.hue || "pink";
    manifest.push({
      n: String(n).padStart(2, "0"),
      folder,
      url: `/projects/${folder}/`,
      title: meta.title || folder.toUpperCase(),
      tag: meta.tag || "",
      desc: meta.desc || "",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      color: meta.color === "cyan" ? "var(--cyan)" : "var(--pink)",
      hue: HUES[hueKey] || HUES.pink,
      repoUrl: meta.repoUrl || "",
    });
    console.log(`✓  ${folder} → /projects/${folder}/`);
    n++;
  } catch (e) {
    console.warn(`⚠  ${folder} — meta.json inválido: ${e.message}`);
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest generado: ${manifest.length} proyecto(s)`);
