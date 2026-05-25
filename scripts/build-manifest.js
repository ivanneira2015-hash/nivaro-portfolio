// Vercel build script — escanea projects/ y genera projects/manifest.json
// meta.json es OPCIONAL: si no existe, el script auto-detecta título, descripción y tecnologías.
const fs   = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "..", "projects");
const manifestPath = path.join(projectsDir, "manifest.json");

// ── Listar archivos ignorando carpetas de build/deps ──────────────────────
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", "coverage", "__pycache__"]);

function listFiles(dir, depth = 0) {
  if (depth > 4) return [];
  const out = [];
  try {
    for (const entry of fs.readdirSync(dir)) {
      if (SKIP_DIRS.has(entry)) continue;
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) out.push(...listFiles(full, depth + 1));
      else out.push(full);
    }
  } catch {}
  return out;
}

// ── Detección automática de tecnologías ──────────────────────────────────
const DEP_MAP = [
  // Frontend frameworks
  [/^react(-dom)?$/, "React"],
  [/^vue$/, "Vue"],
  [/^svelte$/, "Svelte"],
  [/^@angular\/core$/, "Angular"],
  [/^solid-js$/, "SolidJS"],
  [/^preact$/, "Preact"],
  // Meta-frameworks
  [/^next$/, "Next.js"],
  [/^nuxt$/, "Nuxt"],
  [/^gatsby$/, "Gatsby"],
  [/^remix$/, "Remix"],
  [/^astro$/, "Astro"],
  // Styling
  [/^tailwindcss$/, "Tailwind"],
  [/^sass|node-sass$/, "Sass"],
  [/^styled-components$/, "styled-components"],
  [/^@mui\/material$/, "MUI"],
  [/^antd$/, "Ant Design"],
  [/^framer-motion$/, "Framer Motion"],
  // Backend
  [/^express$/, "Express"],
  [/^fastify$/, "Fastify"],
  [/^koa$/, "Koa"],
  [/^hono$/, "Hono"],
  [/^@nestjs\/core$/, "NestJS"],
  // Databases / ORMs
  [/^prisma|@prisma\/client$/, "Prisma"],
  [/^mongoose$/, "MongoDB"],
  [/^mongodb$/, "MongoDB"],
  [/^pg$/, "PostgreSQL"],
  [/^mysql2?$/, "MySQL"],
  [/^sqlite3|better-sqlite3$/, "SQLite"],
  [/^@supabase\/supabase-js$/, "Supabase"],
  [/^firebase$/, "Firebase"],
  [/^drizzle-orm$/, "Drizzle"],
  // Tools
  [/^graphql$/, "GraphQL"],
  [/^socket\.io$/, "Socket.io"],
  [/^axios$/, "Axios"],
  [/^zod$/, "Zod"],
  [/^typescript$/, "TypeScript"],
  [/^vite$/, "Vite"],
  [/^webpack$/, "Webpack"],
  [/^turbopack$/, "Turbopack"],
  [/^jest|vitest$/, "Testing"],
  [/^cypress$/, "Cypress"],
  [/^playwright$/, "Playwright"],
  [/^electron$/, "Electron"],
  [/^three$/, "Three.js"],
  [/^gsap$/, "GSAP"],
  [/^d3$/, "D3.js"],
  [/^stripe$/, "Stripe"],
];

const EXT_MAP = {
  ".ts": "TypeScript", ".tsx": "TypeScript",
  ".py": "Python", ".rs": "Rust", ".go": "Go",
  ".java": "Java", ".kt": "Kotlin", ".cs": "C#",
  ".php": "PHP", ".rb": "Ruby",
};

const CONFIG_MAP = [
  ["tailwind.config.*", "Tailwind"],
  ["next.config.*", "Next.js"],
  ["nuxt.config.*", "Nuxt"],
  ["vite.config.*", "Vite"],
  ["astro.config.*", "Astro"],
  ["svelte.config.*", "Svelte"],
  ["Dockerfile", "Docker"],
  ["docker-compose.yml", "Docker"],
  ["docker-compose.yaml", "Docker"],
  ["prisma/schema.prisma", "Prisma"],
];

function detectTech(projectPath) {
  const found = new Set();

  // 1. package.json deps
  const pkgPath = path.join(projectPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
      for (const dep of Object.keys(allDeps)) {
        for (const [pattern, label] of DEP_MAP) {
          if (pattern.test(dep)) { found.add(label); break; }
        }
      }
    } catch {}
  }

  // 2. Config files
  for (const [file, label] of CONFIG_MAP) {
    if (file.includes("*")) {
      const base = file.replace(/\.\*$/, "");
      const dir = path.dirname(path.join(projectPath, file));
      try {
        if (fs.readdirSync(dir).some(f => f.startsWith(path.basename(base)))) found.add(label);
      } catch {}
    } else {
      if (fs.existsSync(path.join(projectPath, file))) found.add(label);
    }
  }

  // 3. File extensions (only on source files, limited depth)
  const files = listFiles(projectPath);
  for (const f of files) {
    const ext = path.extname(f);
    if (EXT_MAP[ext]) found.add(EXT_MAP[ext]);
  }

  // Clean up redundancies (e.g. don't show Vite if Next.js is present)
  if (found.has("Next.js")) found.delete("Vite");
  if (found.has("Nuxt"))    found.delete("Vite");

  return [...found].slice(0, 7);
}

// ── Auto-detectar título y descripción desde package.json / index.html ───
function detectMeta(projectPath) {
  const pkgPath = path.join(projectPath, "package.json");
  let title = "", desc = "";

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.name)        title = pkg.name.replace(/[-_]/g, " ").toUpperCase();
      if (pkg.description) desc  = pkg.description;
    } catch {}
  }

  if (!title || !desc) {
    const htmlPath = path.join(projectPath, "index.html");
    if (fs.existsSync(htmlPath)) {
      try {
        const html = fs.readFileSync(htmlPath, "utf8");
        if (!title) {
          const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (m) title = m[1].trim().toUpperCase();
        }
        if (!desc) {
          const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
                 || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
          if (m) desc = m[1].trim();
        }
      } catch {}
    }
  }

  return { title: title || "", desc: desc || "" };
}

// ── Gradientes ────────────────────────────────────────────────────────────
const HUES = {
  pink:       "linear-gradient(135deg, #FF2D78 0%, #6B0F3A 100%)",
  cyan:       "linear-gradient(135deg, #00E5FF 0%, #0A4D5A 100%)",
  "pink-cyan":"linear-gradient(135deg, #FF2D78 0%, #00E5FF 100%)",
  "cyan-pink":"linear-gradient(135deg, #00E5FF 0%, #FF2D78 100%)",
  purple:     "linear-gradient(135deg, #7B2FFF 0%, #2A0F6B 100%)",
  lime:       "linear-gradient(135deg, #B6FF2D 0%, #2A6B0F 100%)",
};
const HUE_KEYS = Object.keys(HUES);

// ── Main ──────────────────────────────────────────────────────────────────
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
  fs.writeFileSync(manifestPath, "[]");
  process.exit(0);
}

const folders = fs.readdirSync(projectsDir)
  .filter((f) => {
    if (f.startsWith("_") || f.startsWith(".") || f === "manifest.json") return false;
    return fs.statSync(path.join(projectsDir, f)).isDirectory();
  })
  .sort();

const manifest = [];
let n = 1;

for (const folder of folders) {
  const projectPath = path.join(projectsDir, folder);
  let meta = {};

  // meta.json es opcional
  const metaPath = path.join(projectPath, "meta.json");
  if (fs.existsSync(metaPath)) {
    try { meta = JSON.parse(fs.readFileSync(metaPath, "utf8")); }
    catch (e) { console.warn(`⚠  ${folder}/meta.json inválido: ${e.message}`); }
  }

  // Auto-detectar lo que no está en meta.json
  const autoMeta = detectMeta(projectPath);
  const autoTags = detectTech(projectPath);

  const hueKey    = meta.hue  || HUE_KEYS[(n - 1) % HUE_KEYS.length];
  const colorKey  = meta.color || "pink";

  const entry = {
    n:        String(n).padStart(2, "0"),
    folder,
    url:      `/projects/${folder}/`,
    title:    meta.title    || autoMeta.title    || folder.replace(/[-_]/g, " ").toUpperCase(),
    tag:      meta.tag      || "",
    desc:     meta.desc     || autoMeta.desc     || "",
    tags:     meta.tags?.length ? meta.tags : autoTags,
    color:    colorKey === "cyan" ? "var(--cyan)" : "var(--pink)",
    hue:      HUES[hueKey] || HUES.pink,
    repoUrl:  meta.repoUrl  || "",
  };

  manifest.push(entry);
  const source = fs.existsSync(metaPath) ? "meta.json" : "auto-detect";
  console.log(`✓  ${folder.padEnd(24)} [${source}]  tags: ${entry.tags.join(", ") || "—"}`);
  n++;
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\n✔  Manifest generado: ${manifest.length} proyecto(s)`);
