const { useState, useEffect, useRef, createContext, useContext } = React;

gsap.registerPlugin(ScrollTrigger);

// ────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ────────────────────────────────────────────────────────────────────────────
const T = {
  es: {
    'nav.hero':'Inicio','nav.about':'Sobre_Mí','nav.projects':'Proyectos',
    'nav.certs':'Certificaciones','nav.videos':'Videos','nav.build':'Build',
    'nav.contact':'Contacto','nav.hire':'[ Contratame ]','nav.menu':'MENÚ',
    'hero.tag':'FULL_STACK',
    'hero.sub1':'Desarrollador Full Stack · React · Node.js · TypeScript',
    'hero.sub2':'Construyo aplicaciones web cliente–servidor end-to-end.',
    'hero.sub3':'Basado en Argentina — disponible remoto.',
    'hero.cta.projects':'Ver_Proyectos','hero.cta.cv':'Descargar_CV','hero.cta.cv.es':'CV · ES','hero.cta.cv.en':'CV · EN','hero.cta.contact':'Enviar_Mensaje →',
    'about.tag':'01 // Sobre_El_Operador',
    'about.h2a':'Construyo','about.h2b':'software','about.h2c':'que','about.h2d':'funciona.',
    'about.p3':'"Código limpio, features end-to-end, sin vueltas."',
    'about.arsenal':'Arsenal_Técnico',
    'about.stat1':'Años Activo','about.stat2':'Front + Back','about.stat3':'Commits',
    'about.profile':'PERFIL.OPERADOR','about.available':'DISPONIBLE',
    'about.fn':'NOMBRE','about.fr':'ROL','about.fb':'BASE','about.fs':'STACK','about.fl':'IDIOMAS','about.fc':'EMPRESA',
    'about.download':'Descargar CV','about.matrix':'MATRIZ.HABILIDADES',
    'about.sk1':'Frontend / React','about.sk2':'Backend / Node','about.sk3':'Bases de Datos','about.sk4':'Testing / Cypress',
    'about.career':'REGISTRO.TRAYECTORIA',
    'about.j1':'Full Stack Developer · ForIT','about.j1d':'2026 — Actualidad',
    'about.j2':'Frontend Developer · Evirtual S.A.','about.j2d':'2024 — 2025',
    'about.j3':'Dev & Técnico IT · Freelance','about.j3d':'2023 — Actualidad',
    'proj.tag':'02 // Experiencia','proj.h2a':'Stack','proj.h2b':'Trabajos Recientes.',
    'proj.note':'Selección de roles y trabajos clave. Detalles completos disponibles a pedido.',
    'proj.see':'Ver Proyecto','proj.soon':'Próximamente','proj.github':'Ver GitHub_Completo →',
    'proj.details':'VER DETALLES →','proj.demo':'VER DEMO ↗','proj.nodemo':'DEMO NO DISPONIBLE',
    'proj.repo':'REPOSITORIO','proj.stack':'/ STACK_TECNOLÓGICO',
    'build.tag':'03 // Bajo_El_Capó','build.h2a':'Cómo','build.h2b':' está',
    'build.h2c':'construido este sitio.','build.disc':'// FULL_DISCLOSURE',
    'build.note':'Transparencia total: el mismo stack que uso para mis clientes. Sin frameworks ocultos.',
    'build.brand.tag':'/EMPRESA.MARCA','build.brand.tagline':'Soluciones Tecnológicas',
    'build.brand.desc':'es la empresa detrás del trabajo. Software a medida, sistemas completos, presencia digital profesional. Cada producto que firmo sale bajo esta marca.',
    'build.brand.desc2':'Del diseño al deploy — end-to-end. Sin intermediarios.',
    'build.brand.f1':'TIPO','build.brand.v1':'Software Studio',
    'build.brand.f2':'DESDE','build.brand.v2':'2024',
    'build.brand.f3':'SEDE','build.brand.v3':'Argentina',
    'build.brand.f4':'ESTADO','build.brand.v4':'Activo',
    'build.brand.cta':'Ver Empresa',
    'build.stack':'/STACK.DEL.SITIO',
    'build.tr':'UI / Componentes','build.tg':'Animaciones','build.tt':'Estilos utility-first',
    'build.tj':'Lógica & estado','build.ts':'Iconos & paleta',
    'build.note2t':'/ NOTA_TÉCNICA',
    'build.note2':'Una sola página, React 18 con hooks, animaciones orquestadas con GSAP Timeline + ScrollTrigger. Sin librerías de UI prefabricadas — cada componente está hecho a mano.',
    'certs.tag':'// Formación_Certificada','certs.h2a':'Certificaciones','certs.h2b':'& Estudios.',
    'certs.note':'Formación técnica y certificaciones obtenidas.','certs.see':'VER CREDENCIAL ↗',
    'vids.tag':'// Demos_En_Vivo','vids.h2a':'Videos','vids.h2b':'& Demos.',
    'vids.note':'Proyectos en acción. Demos reales, sin edición.',
    'contact.tag':'04 // Canal_Abierto',
    'contact.h2a':'Hablemos del','contact.h2b':'próximo','contact.h2c':'proyecto.',
    'contact.desc':'¿Tenés un proyecto, una idea, o necesitás un dev full stack que entregue? Mandame un mensaje. Respondo todos los emails en menos de',
    'contact.fn':'/ NOMBRE *','contact.fe':'/ EMAIL *','contact.fp':'/ TIPO_DE_PROYECTO','contact.fm':'/ MENSAJE *',
    'contact.pn':'Tu nombre','contact.pe':'vos@empresa.com','contact.pm':'Contame qué tenés en mente...',
    'contact.sel':'— Seleccionar tipo —',
    'contact.o1':'Web / Landing','contact.o2':'App / Plataforma','contact.o3':'API / Backend',
    'contact.o4':'Full Stack End-to-End','contact.o5':'Consultoría / IT',
    'contact.btn':'ENVIAR ⌁','contact.sending':'ENVIANDO...','contact.sent':'✓ MENSAJE_ENVIADO',
    'contact.spam':'◢ RESPUESTA EN < 24H · SIN SPAM',
    'contact.err1':'◢ El dominio del email no existe. Verificá que sea un email real.',
    'contact.err2':'◢ Error al enviar. Intentá de nuevo o escribime directo a ivanneira2015@gmail.com',
    'contact.verify':'VERIFICANDO',
    'footer.made':'HECHO CON CÓDIGO · ARGENTINA_2026',
  },
  en: {
    'nav.hero':'Home','nav.about':'About_Me','nav.projects':'Projects',
    'nav.certs':'Certifications','nav.videos':'Videos','nav.build':'Build',
    'nav.contact':'Contact','nav.hire':'[ Hire Me ]','nav.menu':'MENU',
    'hero.tag':'FULL_STACK',
    'hero.sub1':'Full Stack Developer · React · Node.js · TypeScript',
    'hero.sub2':'I build end-to-end client–server web applications.',
    'hero.sub3':'Based in Argentina — available remotely.',
    'hero.cta.projects':'See_Projects','hero.cta.cv':'Download_CV','hero.cta.cv.es':'CV · ES','hero.cta.cv.en':'CV · EN','hero.cta.contact':'Send_Message →',
    'about.tag':'01 // About_The_Operator',
    'about.h2a':'I build','about.h2b':'software','about.h2c':'that','about.h2d':'works.',
    'about.p3':'"Clean code, end-to-end features, no fluff."',
    'about.arsenal':'Tech_Arsenal',
    'about.stat1':'Years Active','about.stat2':'Front + Back','about.stat3':'Commits',
    'about.profile':'OPERATOR.PROFILE','about.available':'AVAILABLE',
    'about.fn':'NAME','about.fr':'ROLE','about.fb':'LOCATION','about.fs':'STACK','about.fl':'LANGUAGES','about.fc':'COMPANY',
    'about.download':'Download CV','about.matrix':'SKILLS.MATRIX',
    'about.sk1':'Frontend / React','about.sk2':'Backend / Node','about.sk3':'Databases','about.sk4':'Testing / Cypress',
    'about.career':'CAREER.RECORD',
    'about.j1':'Full Stack Developer · ForIT','about.j1d':'2026 — Present',
    'about.j2':'Frontend Developer · Evirtual S.A.','about.j2d':'2024 — 2025',
    'about.j3':'Dev & IT Technician · Freelance','about.j3d':'2023 — Present',
    'proj.tag':'02 // Experience','proj.h2a':'Stack','proj.h2b':'Recent Work.',
    'proj.note':'Selection of key roles and work. Full details available on request.',
    'proj.see':'See Project','proj.soon':'Coming Soon','proj.github':'See Full_GitHub →',
    'proj.details':'SEE DETAILS →','proj.demo':'SEE DEMO ↗','proj.nodemo':'DEMO UNAVAILABLE',
    'proj.repo':'REPOSITORY','proj.stack':'/ TECH_STACK',
    'build.tag':'03 // Under_The_Hood','build.h2a':'How','build.h2b':'',
    'build.h2c':'this site is built.','build.disc':'// FULL_DISCLOSURE',
    'build.note':'Full transparency: the same stack I use for clients. No hidden frameworks.',
    'build.brand.tag':'/COMPANY.BRAND','build.brand.tagline':'Tech Solutions',
    'build.brand.desc':'is the company behind the work. Custom software, complete systems, professional digital presence. Every product I ship goes out under this brand.',
    'build.brand.desc2':'From design to deploy — end-to-end. No middlemen.',
    'build.brand.f1':'TYPE','build.brand.v1':'Software Studio',
    'build.brand.f2':'SINCE','build.brand.v2':'2024',
    'build.brand.f3':'BASE','build.brand.v3':'Argentina',
    'build.brand.f4':'STATUS','build.brand.v4':'Active',
    'build.brand.cta':'See Company',
    'build.stack':'/SITE.STACK',
    'build.tr':'UI / Components','build.tg':'Animations','build.tt':'Utility-first styles',
    'build.tj':'Logic & state','build.ts':'Icons & palette',
    'build.note2t':'/ TECH_NOTE',
    'build.note2':'Single page, React 18 with hooks, animations orchestrated with GSAP Timeline + ScrollTrigger. No pre-built UI libraries — every component is handcrafted.',
    'certs.tag':'// Certified_Training','certs.h2a':'Certifications','certs.h2b':'& Studies.',
    'certs.note':'Technical training and earned certifications.','certs.see':'SEE CREDENTIAL ↗',
    'vids.tag':'// Live_Demos','vids.h2a':'Videos','vids.h2b':'& Demos.',
    'vids.note':'Projects in action. Real demos, unedited.',
    'contact.tag':'04 // Open_Channel',
    'contact.h2a':"Let's talk about",'contact.h2b':'the next','contact.h2c':'project.',
    'contact.desc':'Got a project, an idea, or need a full stack dev who delivers? Send me a message. I reply to every email in less than',
    'contact.fn':'/ NAME *','contact.fe':'/ EMAIL *','contact.fp':'/ PROJECT_TYPE','contact.fm':'/ MESSAGE *',
    'contact.pn':'Your name','contact.pe':'you@company.com','contact.pm':'Tell me what you have in mind...',
    'contact.sel':'— Select type —',
    'contact.o1':'Web / Landing','contact.o2':'App / Platform','contact.o3':'API / Backend',
    'contact.o4':'Full Stack End-to-End','contact.o5':'Consulting / IT',
    'contact.btn':'SEND ⌁','contact.sending':'SENDING...','contact.sent':'✓ MESSAGE_SENT',
    'contact.spam':'◢ RESPONSE IN < 24H · NO SPAM',
    'contact.err1':'◢ The email domain does not exist. Please use a real email.',
    'contact.err2':'◢ Error sending. Try again or email me at ivanneira2015@gmail.com',
    'contact.verify':'VERIFYING',
    'footer.made':'MADE WITH CODE · ARGENTINA_2026',
  }
};

const LangContext = createContext({ lang: 'es', setLang: () => {}, t: k => k });
const useLang = () => useContext(LangContext);

// ────────────────────────────────────────────────────────────────────────────
// ICONS (inline SVG)
// ────────────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, className = "" }) => {
  const paths = {
    github: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    ),
    linkedin: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    ),
    mail: (
      <>
        <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="m2.5 6.5 9.5 7 9.5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    phone: (
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.4 11.4 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
    react: (
      <>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="10" ry="4"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/>
        </g>
      </>
    ),
    gsap: (
      <>
        <path d="M3 12 L12 4 L21 12 L12 20 Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </>
    ),
    tailwind: (
      <path d="M12 4c-3 0-4.8 1.5-5.5 4.5C7.5 7 8.7 6.5 10 7c.7.3 1.3.9 1.9 1.6.9 1 2 2.1 4.1 2.1 3 0 4.8-1.5 5.5-4.5C20.5 7.7 19.3 8.2 18 7.7c-.7-.3-1.3-.9-1.9-1.6C15.2 5.1 14.1 4 12 4zM6.5 11.5c-3 0-4.8 1.5-5.5 4.5C2 14.5 3.2 15 4.5 14.5c.7-.3 1.3-.9 1.9-1.6.9-1 2-2.1 4.1-2.1 3 0 4.8 1.5 5.5 4.5C15 13.7 13.8 13.2 12.5 13.7c-.7.3-1.3.9-1.9 1.6-.9 1-2 2.1-4.1 2.1z" fill="currentColor"/>
    ),
    code: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    sparkle: (
      <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z M19 16 L19.7 18.3 L22 19 L19.7 19.7 L19 22 L18.3 19.7 L16 19 L18.3 18.3 Z" fill="currentColor"/>
    ),
    google: (
      <path d="M9 4 H15 V8 L18 5 V19 L15 16 V20 H9 V16 L6 19 V5 L9 8 Z" fill="currentColor"/>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </>
    ),
    plus: (
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    ),
    edit: (
      <>
        <path d="M4 20h4l10-10-4-4L4 16v4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="m13 6 4 4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    close: (
      <path d="M6 6l12 12M6 18 18 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    ),
    save: (
      <>
        <path d="M5 3h11l3 3v15H5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 3v6h8V3M8 14h8v7H8z" fill="none" stroke="currentColor" strokeWidth="2"/>
      </>
    ),
    logout: (
      <>
        <path d="M10 4H5v16h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 8l4 4-4 4M19 12H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 3v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// CURSOR PERSONALIZADO
// ────────────────────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const grow = () => gsap.to(ring, { scale: 1.6, borderColor: "#00E5FF", duration: 0.25 });
    const shrink = () => gsap.to(ring, { scale: 1, borderColor: "#FF2D78", duration: 0.25 });

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, input, textarea, .hover-target").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────────────────────────────────────
function Nav({ hasCerts = false, hasVideos = false }) {
  const navRef = useRef(null);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  const baseSections = ["hero", "about", "projects"];
  const extraSections = [...(hasCerts ? ["certs"] : []), ...(hasVideos ? ["videos"] : [])];
  const allSections = [...baseSections, ...extraSections, "build", "contact"];

  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });

    const onScroll = () => {
      let current = "hero";
      allSections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY + 200 >= el.offsetTop) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasCerts, hasVideos]);

  const linkDefs = [
    { id: "hero", label: t('nav.hero') },
    { id: "about", label: t('nav.about') },
    { id: "projects", label: t('nav.projects') },
    ...(hasCerts ? [{ id: "certs", label: t('nav.certs') }] : []),
    ...(hasVideos ? [{ id: "videos", label: t('nav.videos') }] : []),
    { id: "build", label: "Build" },
    { id: "contact", label: t('nav.contact') },
  ];
  const links = linkDefs.map((l, i) => ({ ...l, label: `${String(i).padStart(2, "0")} / ${l.label}` }));

  return (
    <>
      <nav ref={navRef} className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#hero" className="flex items-center group">
            <img src="/assets/logo.svg" alt="NIVARO" style={{ height: "44px", width: "auto" }} />
          </a>
          <a
            href="https://nivaroenterprise.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 pl-4 border-l border-[var(--text)]/15 opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg width="22" height="22" viewBox="0 0 34 34" style={{ flexShrink: 0 }}>
              <rect width="34" height="34" rx="7" fill="#3525CD"/>
              <line x1="9" y1="25" x2="9" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
              <line x1="9" y1="9" x2="25" y2="25" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
              <line x1="25" y1="25" x2="25" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
              <circle cx="17" cy="17" r="2" fill="#C9A84C"/>
            </svg>
            <div className="leading-none">
              <div className="font-display text-[10px] tracking-[0.2em] text-[var(--text)]">NIVARO</div>
              <div className="font-display text-[10px] tracking-[0.2em]" style={{ color: "#6B5FE8" }}>ENTERPRISE</div>
            </div>
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.25em] uppercase">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`transition-colors ${active === l.id ? "text-[var(--pink)]" : "text-[var(--text)]/70 hover:text-[var(--cyan)]"}`}
                style={active === l.id ? { textShadow: "0 0 12px rgba(255,45,120,0.8)" } : {}}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-[10px] tracking-[0.3em] uppercase border border-[var(--text)]/20 px-3 py-2 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors text-[var(--text)]/60"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contact" className="text-[10px] tracking-[0.3em] uppercase border border-[var(--cyan)]/60 px-4 py-2 hover:bg-[var(--cyan)]/10 transition-colors text-[var(--cyan)]">
            {t('nav.hire')}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-[var(--text)]/60 text-[10px] tracking-widest border border-[var(--text)]/20 px-2 py-1.5 hover:text-[var(--cyan)] transition-colors"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hover-target flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            aria-label="Abrir menú"
          >
            <span className={`block w-5 h-[1.5px] bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
            <span className={`block h-[1.5px] bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-5'}`}></span>
            <span className={`block w-5 h-[1.5px] bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex flex-col" style={{ background: "rgba(10,10,15,0.97)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--text)]/10">
            <img src="/assets/logo.svg" alt="NIVARO" style={{ height: "36px" }} />
            <button onClick={() => setMobileOpen(false)} className="hover-target text-[var(--text)]/60 hover:text-[var(--pink)] transition-colors p-2">
              <Icon name="close" size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-10 px-6">
            <ul className="space-y-6">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-display text-4xl tracking-wider transition-colors ${active === l.id ? 'neon-pink' : 'text-[var(--text)]/70 hover:text-[var(--cyan)]'}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-[var(--text)]/10">
              <a
                href="https://nivaroenterprise.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 mb-6 opacity-80"
              >
                <svg width="28" height="28" viewBox="0 0 34 34">
                  <rect width="34" height="34" rx="7" fill="#3525CD"/>
                  <line x1="9" y1="25" x2="9" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <line x1="9" y1="9" x2="25" y2="25" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <line x1="25" y1="25" x2="25" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <circle cx="17" cy="17" r="2" fill="#C9A84C"/>
                </svg>
                <div>
                  <div className="font-display text-sm tracking-[0.2em] text-[var(--text)]">NIVAROENTERPRISE ↗</div>
                  <div className="text-[10px] tracking-[0.2em] text-[var(--text)]/40">Software Studio</div>
                </div>
              </a>
            </div>
          </div>

          <div className="px-6 pb-10 pt-6 border-t border-[var(--text)]/10 space-y-3">
            <button
              onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setMobileOpen(false); }}
              className="hover-target w-full py-3 border border-[var(--text)]/20 text-[10px] tracking-[0.3em] text-[var(--text)]/60 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
            >
              {lang === 'es' ? 'SWITCH TO ENGLISH ↗' : 'CAMBIAR A ESPAÑOL ↗'}
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="hover-target block w-full py-3 border border-[var(--cyan)]/60 text-[10px] tracking-[0.3em] text-[var(--cyan)] text-center hover:bg-[var(--cyan)]/10 transition-colors"
            >
              {t('nav.hire')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────────────────────
function HeroSection({ cvUrl, cvUrlEn }) {
  const { t } = useLang();
  const cvHref = cvUrl || "uploads/Full_Stack_Developer_walter_neira.pdf";
  const cvHrefEn = cvUrlEn || cvHref;
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.from(".hero-title", {
      duration: 1.2,
      opacity: 0,
      y: 60,
      skewX: 10,
      ease: "power4.out",
    })
      .from(subtitleRef.current.querySelectorAll(".sub-line"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.6")
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .from(metaRef.current.children, { opacity: 0, x: -10, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.5");

    gsap.to(bgRef.current, {
      scrollTrigger: { trigger: "#hero", scrub: 1, start: "top top", end: "bottom top" },
      y: "30%",
      ease: "none",
    });

    gsap.to(".scan-drift", {
      backgroundPositionY: "100px",
      duration: 4,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <section id="hero" className="hero relative min-h-screen w-full overflow-hidden flex items-center">
      <div
        ref={bgRef}
        className="hero-bg absolute inset-0 z-0"
        style={{
          backgroundImage: "url('assets/jinx-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: "scale(1.1)",
        }}
      ></div>

      <div className="absolute inset-0 z-[2]" style={{
        background: "linear-gradient(90deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.6) 40%, rgba(10,10,15,0.1) 70%, rgba(10,10,15,0) 100%)"
      }}></div>

      <div className="scanlines scan-drift"></div>
      <div className="hero-vignette"></div>

      <div className="absolute top-24 left-6 md:left-12 z-10 text-[var(--cyan)] text-[10px] tracking-[0.3em] flex flex-col gap-1">
        <div>┌ SYS.ONLINE</div>
        <div className="opacity-60">▍ AR · BUENOS_AIRES</div>
      </div>
      <div className="absolute top-24 right-6 md:right-12 z-10 text-[var(--pink)] text-[10px] tracking-[0.3em] text-right flex flex-col gap-1">
        <div>REC ●</div>
        <div className="opacity-60">{new Date().toISOString().slice(0,10)}</div>
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full pt-32 pb-20">
        <div className="max-w-2xl">
          <div ref={metaRef} className="flex items-center gap-4 mb-6 text-[10px] tracking-[0.4em] text-[var(--cyan)]">
            <span>◢◤</span>
            <span>PORTFOLIO_v2026</span>
            <span className="opacity-40">//</span>
            <span className="opacity-70">{t('hero.tag')}</span>
          </div>

          <h1 className="hero-title font-display text-[64px] md:text-[110px] lg:text-[150px] leading-[0.85] mb-4">
            <span className="block neon-pink">WALTER</span>
            <span className="block neon-cyan glitch" data-text="NEIRA.">NEIRA.</span>
          </h1>

          <div ref={subtitleRef} className="mt-8 space-y-2 max-w-xl">
            <p className="sub-line text-[var(--text)]/85 text-sm md:text-base leading-relaxed">
              <span className="text-[var(--cyan)]">&gt;</span> {t('hero.sub1')}
            </p>
            <p className="sub-line text-[var(--text)]/60 text-xs md:text-sm leading-relaxed">
              <span className="text-[var(--pink)]">▍</span> {t('hero.sub2')}
            </p>
            <p className="sub-line text-[var(--text)]/60 text-xs md:text-sm leading-relaxed">
              <span className="text-[var(--pink)]">▍</span> {t('hero.sub3')}
            </p>
          </div>

          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-start gap-6">
            <a
              href="#projects"
              className="group flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase border border-[var(--pink)] px-6 py-4 hover:bg-[var(--pink)] hover:text-[var(--dark)] transition-all"
              style={{ boxShadow: "0 0 24px rgba(255,45,120,0.3)" }}
            >
              <span>{t('hero.cta.projects')}</span>
              <span className="bounce-arrow">↓</span>
            </a>
            <div className="flex gap-2">
              <a
                href={cvHref}
                download="Walter_Neira_CV.pdf"
                className="group flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase border border-[var(--cyan)] px-5 py-4 hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all"
                style={{ boxShadow: "0 0 20px rgba(0,229,255,0.2)" }}
              >
                <Icon name="download" size={13} />
                <span>{t('hero.cta.cv.es')}</span>
              </a>
              <a
                href={cvHrefEn}
                download="Walter_Neira_CV_EN.pdf"
                className="group flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase border border-[var(--cyan)]/50 px-5 py-4 hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all"
                style={{ boxShadow: "0 0 20px rgba(0,229,255,0.1)" }}
              >
                <Icon name="download" size={13} />
                <span>{t('hero.cta.cv.en')}</span>
              </a>
            </div>
            <a href="#contact" className="text-[11px] tracking-[0.4em] uppercase text-[var(--text)]/70 hover:text-[var(--cyan)] py-4 border-b border-transparent hover:border-[var(--cyan)] transition-all">
              {t('hero.cta.contact')}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between text-[10px] tracking-[0.3em] text-[var(--text)]/50">
        <div className="flex flex-col gap-1">
          <div className="text-[var(--cyan)]">SCROLL</div>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--cyan)] to-transparent bounce-arrow"></div>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 text-right">
          <div>LAT −34.6037°S</div>
          <div>LON −58.3816°W</div>
          <div className="text-[var(--pink)]">SEÑAL ▮▮▮▮▮</div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SOBRE MÍ
// ────────────────────────────────────────────────────────────────────────────
function AboutSection({ cvUrlEn }) {
  const { t, lang } = useLang();
  const cvHrefEn = cvUrlEn || "uploads/Full_Stack_Developer_walter_neira.pdf";
  const skills = [
    { name: "React",       pct: 92 },
    { name: "JavaScript",  pct: 90 },
    { name: "Tailwind",    pct: 88 },
    { name: "TypeScript",  pct: 85 },
    { name: "Git",         pct: 85 },
    { name: "Node.js",     pct: 83 },
    { name: "REST APIs",   pct: 82 },
    { name: "Express",     pct: 80 },
    { name: "Scrum",       pct: 80 },
    { name: "PostgreSQL",  pct: 78 },
    { name: "Kanban",      pct: 76 },
    { name: "Next.js",     pct: 75 },
    { name: "Prisma ORM",  pct: 72 },
    { name: "Cypress",     pct: 70 },
    { name: "Docker",      pct: 65 },
    { name: "MongoDB",     pct: 65 },
    { name: "SQL Server",  pct: 62 },
    { name: "C#",          pct: 58 },
    { name: ".NET",        pct: 55 },
    { name: "Java",        pct: 50 },
  ];

  useEffect(() => {
    gsap.from(".about-content", {
      scrollTrigger: { trigger: ".about", start: "top 75%" },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".about-portrait", {
      scrollTrigger: { trigger: ".about", start: "top 75%" },
      x: 100,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    });

    gsap.from(".skill-badge", {
      scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
      opacity: 0,
      y: 20,
      scale: 0.9,
      stagger: 0.06,
      duration: 0.6,
      ease: "back.out(1.5)",
    });

    gsap.from(".stat-block", {
      scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  return (
    <section id="about" className="about relative py-32 px-6 md:px-12 grid-bg overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,45,120,0.15) 0%, transparent 70%)" }}></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)" }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="section-tag mb-8">{t('about.tag')}</div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="about-content md:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8">
              {t('about.h2a')} <span className="neon-pink">{t('about.h2b')}</span><br/>
              {t('about.h2c')} <span className="neon-cyan">{t('about.h2d')}</span>
            </h2>
            <div className="space-y-5 text-[var(--text)]/75 text-sm md:text-base leading-relaxed max-w-xl">
              {lang === 'es' ? (
                <p>Soy <span className="text-[var(--cyan)]">Desarrollador Full Stack</span> con experiencia en aplicaciones web cliente–servidor, integración de APIs REST, manejo de bases de datos y testing automatizado.</p>
              ) : (
                <p>I'm a <span className="text-[var(--cyan)]">Full Stack Developer</span> with experience in client–server web apps, REST API integration, database management, and automated testing.</p>
              )}
              {lang === 'es' ? (
                <p>Trabajo con <span className="text-[var(--text)]">React, TypeScript, Node.js, Express y PostgreSQL</span>, bajo metodologías ágiles (Scrum / Kanban). Uso herramientas de IA para optimizar el flujo de desarrollo y entregar más rápido sin sacrificar calidad.</p>
              ) : (
                <p>I work with <span className="text-[var(--text)]">React, TypeScript, Node.js, Express, and PostgreSQL</span>, under agile methodologies (Scrum / Kanban). I leverage AI tools to optimize the dev workflow and ship faster without sacrificing quality.</p>
              )}
              <p className="text-[var(--text)]/55 text-xs tracking-wider border-l border-[var(--pink)]/40 pl-4">
                {t('about.p3')}
              </p>
            </div>

            <div className="mt-10">
              <div className="section-tag mb-5">{t('about.arsenal')}</div>
              <div className="skills-grid flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div key={s.name} className="skill-badge hover-target relative overflow-hidden" style={{ paddingBottom: "10px" }}>
                    <span className="relative z-10 select-none">{s.name} <span style={{ color: s.pct >= 80 ? "var(--pink)" : "var(--cyan)", opacity: 0.85 }}>· {s.pct}%</span></span>
                    <div className="absolute bottom-0 left-0 h-[2px]" style={{
                      width: `${s.pct}%`,
                      background: s.pct >= 80 ? "var(--pink)" : "var(--cyan)",
                      boxShadow: s.pct >= 80 ? "0 0 6px var(--pink)" : "0 0 6px var(--cyan)",
                    }}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-row mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-pink">03+</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">{t('about.stat1')}</div>
              </div>
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-cyan">E2E</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">{t('about.stat2')}</div>
              </div>
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-pink">∞</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">{t('about.stat3')}</div>
              </div>
            </div>
          </div>

          <div className="about-portrait md:col-span-5">
            {/* Foto del operador */}
            <div className="relative mb-6 group mx-auto" style={{ maxWidth: "280px" }}>
              {/* Corner brackets */}
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--pink)] z-10 pointer-events-none"></span>
              <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--pink)] z-10 pointer-events-none"></span>
              <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--pink)] z-10 pointer-events-none"></span>
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--pink)] z-10 pointer-events-none"></span>

              <div
                className="relative overflow-hidden border border-[var(--pink)]/30"
                style={{ boxShadow: "0 0 30px rgba(255,45,120,0.2), inset 0 0 60px rgba(0,229,255,0.05)", width: "100%", aspectRatio: "4/5" }}
              >
                <img
                  src="assets/walter-portrait.jpeg"
                  alt="Walter Neira"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.05) saturate(0.85) brightness(0.92)" }}
                />
                {/* Color grade overlay — cyberpunk tint */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(180deg, rgba(0,229,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,45,120,0.15) 100%)",
                  mixBlendMode: "screen",
                }}></div>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.5) 100%)",
                }}></div>
              </div>

              {/* Scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none z-[2]" style={{
                background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
                mixBlendMode: "overlay",
              }}></div>

              {/* HUD overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-[3] pointer-events-none">
                <div className="text-[9px] tracking-[0.3em] text-[var(--cyan)]" style={{ textShadow: "0 0 8px rgba(0,229,255,0.6)" }}>
                  ◢ TARGET.LOCKED
                </div>
                <div className="text-[9px] tracking-[0.3em] text-[var(--pink)] flex items-center gap-1.5" style={{ textShadow: "0 0 8px rgba(255,45,120,0.6)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  REC
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-[3] pointer-events-none">
                <div>
                  <div className="text-[9px] tracking-[0.3em] text-[var(--cyan)] opacity-80">ID_0042</div>
                  <div className="font-display text-base tracking-widest text-white" style={{ textShadow: "0 0 12px rgba(0,0,0,0.8)" }}>WALTER NEIRA</div>
                </div>
                <div className="text-[9px] tracking-[0.3em] text-white/60 text-right">
                  <div>34.6°S</div>
                  <div>58.4°W</div>
                </div>
              </div>
            </div>

            <div className="relative border border-[var(--pink)]/30 bg-[var(--surface)]/60 p-6 backdrop-blur-sm">
              <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[var(--cyan)]"></span>
              <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[var(--cyan)]"></span>
              <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[var(--cyan)]"></span>
              <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[var(--cyan)]"></span>

              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">{t('about.profile')}</div>
                <div className="text-[10px] tracking-[0.3em] text-[var(--pink)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  {t('about.available')}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  [t('about.fn'), "Walter I. Neira A."],
                  [t('about.fr'), "Full Stack Developer"],
                  [t('about.fb'), "Argentina ⇄ Remoto"],
                  [t('about.fs'), "React · Node · TS"],
                  [t('about.fl'), "ES nativo · EN A2"],
                  [t('about.fc'), "ForIT Software Factory"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-dashed border-[var(--text)]/10 pb-2">
                    <span className="text-[var(--text)]/40 tracking-widest">{k}</span>
                    <span className="text-[var(--text)]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--text)]/10 flex gap-2">
                <a
                  href="uploads/Full_Stack_Developer_walter_neira.pdf"
                  download="Walter_Neira_CV.pdf"
                  className="hover-target flex items-center justify-center gap-2 flex-1 py-3 border border-[var(--cyan)]/60 text-[var(--cyan)] text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all"
                  style={{ boxShadow: "0 0 14px rgba(0,229,255,0.15)" }}
                >
                  <Icon name="download" size={12} />
                  CV · ES
                </a>
                <a
                  href={cvHrefEn}
                  download="Walter_Neira_CV_EN.pdf"
                  className="hover-target flex items-center justify-center gap-2 flex-1 py-3 border border-[var(--cyan)]/40 text-[var(--cyan)] text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all"
                  style={{ boxShadow: "0 0 8px rgba(0,229,255,0.1)" }}
                >
                  <Icon name="download" size={12} />
                  CV · EN
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--text)]/10">
                <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-3">{t('about.matrix')}</div>
                {[
                  [t('about.sk1'), 92],
                  [t('about.sk2'), 85],
                  [t('about.sk3'), 82],
                  [t('about.sk4'), 78],
                ].map(([label, val]) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-[10px] tracking-wider mb-1">
                      <span className="text-[var(--text)]/60">{label}</span>
                      <span className="text-[var(--cyan)]">{val}%</span>
                    </div>
                    <div className="h-1 bg-[var(--text)]/10 relative overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--pink)] to-[var(--cyan)]" style={{ width: `${val}%`, boxShadow: "0 0 8px var(--cyan)" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloque educación / experiencia */}
            <div className="mt-6 relative border border-[var(--cyan)]/25 bg-[var(--surface)]/40 p-6 backdrop-blur-sm">
              <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-4">{t('about.career')}</div>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--pink)] flex-shrink-0 mt-1" style={{ boxShadow: "0 0 8px var(--pink)" }}></div>
                  <div>
                    <div className="text-[var(--text)]">{t('about.j1')}</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">{t('about.j1d')}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--cyan)] flex-shrink-0 mt-1" style={{ boxShadow: "0 0 8px var(--cyan)" }}></div>
                  <div>
                    <div className="text-[var(--text)]">{t('about.j2')}</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">{t('about.j2d')}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--text)]/30 flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="text-[var(--text)]/80">{t('about.j3')}</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">{t('about.j3d')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PROYECTOS
// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────
// PROYECTOS — defaults
// ────────────────────────────────────────────────────────────────────────────
const DEFAULT_PROJECTS = [
  {
    n: "01",
    title: "FORIT // CORE",
    tag: "Full Stack · Producto",
    desc: "Desarrollo y mantenimiento de aplicaciones cliente–servidor end-to-end. Frontend en React + backend Node/Express, persistencia con Prisma ORM y PostgreSQL, testing con Cypress.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #6B0F3A 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "02",
    title: "EVIRTUAL // UI",
    tag: "Frontend · Performance",
    desc: "Diseño e implementación de interfaces con React, TypeScript y Tailwind. Componentes UI reutilizables, responsive cross-browser y optimización de tiempos de carga.",
    tags: ["React", "TypeScript", "Tailwind"],
    color: "var(--cyan)",
    hue: "linear-gradient(135deg, #00E5FF 0%, #0A4D5A 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "03",
    title: "FREELANCE // OPS",
    tag: "Custom · IT",
    desc: "Soluciones web a medida para clientes independientes. Setup de entornos con Docker y Git, integración con SQL Server / MongoDB, debugging y soporte técnico end-to-end.",
    tags: ["JavaScript", "Docker", "MongoDB"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #00E5FF 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "04",
    title: "VORTEX // STUDIO",
    tag: "SaaS · IA · Full Stack",
    desc: "Plataforma que genera apps Flutter, Kotlin y React Native completas a partir de una descripción en lenguaje natural. IA en tiempo real con SSE streaming, exportación ZIP, build en la nube con GitHub Actions y deploy en Railway + Vercel.",
    tags: ["React", "TypeScript", "Vite", "Express", "Groq IA", "PostgreSQL", "SSE"],
    color: "var(--cyan)",
    hue: "linear-gradient(135deg, #00E5FF 0%, #6B00FF 100%)",
    url: "https://vortex-studio-flame.vercel.app",
    repoUrl: "",
  },
  {
    n: "05",
    title: "ARCFORGE // BUILD",
    tag: "SaaS · Monorepo · Full Stack",
    desc: "Plataforma web de alto rendimiento con arquitectura monorepo: frontend Next.js, API REST con Express, PostgreSQL, design system con Radix UI y Zod, testing E2E con Playwright y unitario con Vitest.",
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Radix UI", "Playwright", "Vitest"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #FF6B00 100%)",
    url: "https://web-nivaro.vercel.app",
    repoUrl: "https://github.com/ivanneira2015-hash/arcforge",
  },
  {
    n: "06",
    title: "NEXDESK // DESKTOP",
    tag: "Electron · App de escritorio",
    desc: "Aplicación de escritorio multiplataforma para gestión profesional de servicios técnicos. Electron + React con Vite, distribución via Electron Builder, UI con TailwindCSS y Lucide icons.",
    tags: ["Electron", "React", "TypeScript", "Vite", "TailwindCSS", "Electron Builder"],
    color: "var(--cyan)",
    hue: "linear-gradient(135deg, #00E5FF 0%, #005F73 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "07",
    title: "KPI // COMMAND",
    tag: "Analytics · SaaS · Dashboard",
    desc: "Dashboard de analítica empresarial con visualizaciones interactivas, autenticación con NextAuth, base de datos Neon PostgreSQL, ORM Prisma y componentes shadcn/ui. Gráficos con Recharts.",
    tags: ["Next.js", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "shadcn/ui"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #1A003A 100%)",
    url: "https://kpi-command-lime.vercel.app",
    repoUrl: "",
  },
  {
    n: "08",
    title: "NOVA // AI",
    tag: "IA · SaaS · Pagos",
    desc: "Plataforma SaaS con múltiples providers de IA (Anthropic, FAL AI), pagos con Stripe, autenticación con Supabase, gestión de formularios con React Hook Form, animaciones con Framer Motion.",
    tags: ["Next.js", "TypeScript", "Anthropic", "FAL AI", "Stripe", "Framer Motion", "Zod"],
    color: "var(--cyan)",
    hue: "linear-gradient(135deg, #00E5FF 0%, #FF2D78 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "09",
    title: "RECOGNITIONS // APP",
    tag: "Plataforma interna · RR.HH.",
    desc: "Sistema de reconocimientos para empleados con integración Discord. Monorepo con Next.js, Express, PostgreSQL + Prisma, CI/CD con GitHub Actions. Desarrollado para ForIT.",
    tags: ["Next.js", "Express", "PostgreSQL", "Prisma", "Discord API", "GitHub Actions", "pnpm"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #5865F2 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "10",
    title: "MAYO // EXPRESS",
    tag: "SaaS · POS · Gestión",
    desc: "Sistema POS completo para distribuidoras mayoristas y minoristas. Control de stock, ventas, caja, clientes y reportes en tiempo real. Multi-usuario con roles y permisos.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    color: "var(--cyan)",
    hue: "linear-gradient(135deg, #00E5FF 0%, #0A6E5A 100%)",
    url: "",
    repoUrl: "",
  },
  {
    n: "11",
    title: "AMIA // EMPLEO",
    tag: "Plataforma · Colaboración",
    desc: "Plataforma de empleo inclusivo para personas con discapacidad. Sistema de candidatos, postulaciones y empresas con testing con Jest. Colaboración con ForIT para AMIA Argentina.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Jest"],
    color: "var(--pink)",
    hue: "linear-gradient(135deg, #FF2D78 0%, #003580 100%)",
    url: "",
    repoUrl: "",
  },
];

// ─── DETAIL PANEL ──────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const { t } = useLang();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(panelRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>

      <div ref={panelRef} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--surface)", border: "1px solid rgba(255,45,120,0.3)", boxShadow: "0 0 60px rgba(255,45,120,0.15), 0 0 120px rgba(0,0,0,0.8)" }}>

        {/* Corner brackets */}
        <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--pink)] z-10"></span>
        <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--pink)] z-10"></span>
        <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--cyan)] z-10"></span>
        <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--cyan)] z-10"></span>

        {/* Image / gradient header */}
        <div className="relative h-52 overflow-hidden" style={{ background: project.hue || project.color }}>
          {project.image && <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.1) 0%, rgba(10,10,15,0.7) 100%)" }}></div>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
          }}></div>
          <div className="absolute top-3 left-4 text-[10px] tracking-[0.3em] text-white/70">{project.tag}</div>
          <div className="absolute top-3 right-4">
            <button onClick={handleClose} className="hover-target w-8 h-8 flex items-center justify-center border border-white/20 text-white/70 hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors" style={{ background: "rgba(10,10,15,0.6)" }}>
              <Icon name="close" size={15} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="font-display text-3xl md:text-4xl tracking-wider" style={{ color: project.color, textShadow: `0 0 20px ${project.color}` }}>{project.title}</div>
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] text-white/40">/{project.n}</div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-[var(--text)]/80 leading-relaxed">{project.desc}</p>

          {project.tags && project.tags.length > 0 && (
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-3">{t('proj.stack')}</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="text-[10px] tracking-widest border px-3 py-1.5" style={{ borderColor: "rgba(0,229,255,0.3)", color: "var(--text)", background: "rgba(0,229,255,0.05)" }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="hover-target flex-1 flex items-center justify-center gap-3 py-3 text-[11px] tracking-[0.3em] uppercase font-display"
                style={{ background: "var(--pink)", color: "var(--dark)", boxShadow: "0 0 20px rgba(255,45,120,0.4)" }}>
                {t('proj.demo')}
              </a>
            ) : (
              <div className="flex-1 flex items-center justify-center py-3 text-[10px] tracking-[0.3em] uppercase border border-[var(--text)]/15 text-[var(--text)]/30">
                {t('proj.nodemo')}
              </div>
            )}
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                className="hover-target flex-1 flex items-center justify-center gap-3 py-3 text-[11px] tracking-[0.3em] uppercase border font-display transition-colors"
                style={{ borderColor: "rgba(0,229,255,0.4)", color: "var(--cyan)" }}>
                <Icon name="github" size={15} />
                {t('proj.repo')}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ projects }) {
  const { t } = useLang();
  const cardsRef = useRef([]);
  cardsRef.current = [];
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    gsap.from(".project-card", {
      scrollTrigger: { trigger: ".projects", start: "top 70%" },
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "back.out(1.2)",
    });

    gsap.from(".projects-header", {
      scrollTrigger: { trigger: ".projects", start: "top 80%" },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleEnter = (i) => {
    gsap.to(cardsRef.current[i], { scale: 1.02, duration: 0.4, ease: "power3.out" });
  };
  const handleLeave = (i) => {
    gsap.to(cardsRef.current[i], { scale: 1, duration: 0.4, ease: "power3.out" });
  };

  return (
    <>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}

      <section id="projects" className="projects relative py-32 px-6 md:px-12 bg-[var(--dark)] overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="projects-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <div className="section-tag mb-4">{t('proj.tag')}</div>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
                <span className="neon-pink">{t('proj.h2a')}</span> /<br/>
                <span className="text-[var(--text)]">{t('proj.h2b')}</span>
              </h2>
            </div>
            <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
              <div className="text-[var(--cyan)] mb-2">// {projects.length} PROYECTOS</div>
              {t('proj.note')}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <article
                key={p.n}
                ref={(el) => (cardsRef.current[i] = el)}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                onClick={() => setOpenProject(p)}
                className="project-card hover-target p-6 md:p-7 flex flex-col group"
                style={{ minHeight: "440px", cursor: "pointer" }}
              >
                <div className="relative h-44 mb-6 overflow-hidden" style={{ background: p.image ? "#0A0A0F" : p.hue }}>
                  {p.image && (
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)"
                  }}></div>
                  {!p.image && (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-white/20 group-hover:text-white/40 transition-colors">
                      {p.n}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] text-white/80">{p.tag}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.45)" }}>
                    <span className="text-[11px] tracking-[0.4em] text-white border border-white/60 px-4 py-2">{t('proj.details')}</span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl tracking-wider" style={{ color: p.color }}>{p.title}</h3>
                  <span className="text-[10px] tracking-[0.3em] text-[var(--text)]/40">/{p.n}</span>
                </div>

                <p className="text-xs md:text-sm text-[var(--text)]/65 leading-relaxed mb-6 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] tracking-widest text-[var(--text)]/50 border border-[var(--text)]/15 px-2 py-1">{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--text)]/10">
                  {p.url ? (
                    <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[var(--text)]/70 group-hover:text-[var(--cyan)] transition-colors">
                      {t('proj.see')}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  ) : (
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text)]/25">{t('proj.soon')}</span>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[var(--text)]/40 hover:text-[var(--cyan)] transition-colors"
                      title="Ver repositorio"
                    >
                      <Icon name="github" size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://github.com/ivanneira2015-hash" target="_blank" rel="noopener" className="inline-block text-[11px] tracking-[0.4em] uppercase border-b border-[var(--pink)] pb-1 text-[var(--text)]/80 hover:text-[var(--pink)] transition-colors">
              {t('proj.github')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BUILD / SOBRE NIVARO — Stack del sitio + explicación de marca
// ────────────────────────────────────────────────────────────────────────────
function BuildSection() {
  const { t } = useLang();
  useEffect(() => {
    gsap.from(".build-header", {
      scrollTrigger: { trigger: "#build", start: "top 80%" },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(".build-brand", {
      scrollTrigger: { trigger: "#build", start: "top 75%" },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".tech-chip", {
      scrollTrigger: { trigger: ".tech-grid", start: "top 85%" },
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.08,
      duration: 0.7,
      ease: "back.out(1.4)",
    });
  }, []);

  const tech = [
    { name: "React 18", role: t('build.tr'), icon: "react", color: "var(--cyan)" },
    { name: "GSAP + ScrollTrigger", role: t('build.tg'), icon: "gsap", color: "var(--pink)" },
    { name: "Tailwind CSS", role: t('build.tt'), icon: "tailwind", color: "var(--cyan)" },
    { name: "JavaScript ES2024", role: t('build.tj'), icon: "code", color: "var(--pink)" },
    { name: "Google Fonts", role: "Bebas Neue · JetBrains Mono", icon: "google", color: "var(--cyan)" },
    { name: "SVG + CSS Vars", role: t('build.ts'), icon: "sparkle", color: "var(--pink)" },
  ];

  return (
    <section id="build" className="relative py-32 px-6 md:px-12 bg-[var(--dark)] overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        background: "radial-gradient(circle at 70% 50%, rgba(255,45,120,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,229,255,0.1) 0%, transparent 50%)"
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="build-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">{t('build.tag')}</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              <span className="neon-cyan">{t('build.h2a')}</span>{t('build.h2b')}<br/>
              <span className="text-[var(--text)]">{t('build.h2c')}</span>
            </h2>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
            <div className="text-[var(--pink)] mb-2">{t('build.disc')}</div>
            {t('build.note')}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* NivaroEnterprise — Company Brand */}
          <div className="build-brand md:col-span-5 relative border border-[var(--cyan)]/30 bg-[var(--surface)]/60 p-7 backdrop-blur-sm">
            <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[var(--pink)]"></span>

            <div className="text-[10px] tracking-[0.3em] text-[var(--pink)] mb-5">{t('build.brand.tag')}</div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex-shrink-0" style={{ borderRadius: "10px", boxShadow: "0 0 24px rgba(53,37,205,0.45)" }}>
                <svg width="58" height="58" viewBox="0 0 34 34">
                  <rect width="34" height="34" rx="8" fill="#3525CD"/>
                  <line x1="9" y1="25" x2="9" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <line x1="9" y1="9" x2="25" y2="25" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <line x1="25" y1="25" x2="25" y2="9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                  <circle cx="17" cy="17" r="2" fill="#C9A84C"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-2xl tracking-widest leading-none text-[var(--text)]">NIVARO</div>
                <div className="font-display text-2xl tracking-widest leading-none" style={{ color: "#3525CD", textShadow: "0 0 18px rgba(53,37,205,0.55)" }}>ENTERPRISE</div>
                <div className="text-[9px] tracking-[0.35em] text-[var(--text)]/40 mt-1.5">{t('build.brand.tagline')}</div>
              </div>
            </div>

            <p className="text-sm text-[var(--text)]/75 leading-relaxed mb-2">
              <span className="text-[var(--cyan)]">NivaroEnterprise</span> {t('build.brand.desc')}
            </p>
            <p className="text-xs text-[var(--text)]/50 leading-relaxed mb-6">
              {t('build.brand.desc2')}
            </p>

            <div className="grid grid-cols-2 gap-3 text-[10px] tracking-[0.25em] mb-6">
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">{t('build.brand.f1')}</div>
                <div className="text-[var(--text)]">{t('build.brand.v1')}</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">{t('build.brand.f2')}</div>
                <div className="text-[var(--text)]">{t('build.brand.v2')}</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">{t('build.brand.f3')}</div>
                <div className="text-[var(--text)]">{t('build.brand.v3')}</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">{t('build.brand.f4')}</div>
                <div className="text-[var(--pink)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  {t('build.brand.v4')}
                </div>
              </div>
            </div>

            <a
              href="https://nivaroenterprise.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-2 w-full py-3 border text-[11px] tracking-[0.3em] uppercase transition-all hover:bg-[var(--pink)] hover:text-[var(--dark)] hover:border-[var(--pink)]"
              style={{ borderColor: "#3525CD", color: "#3525CD", boxShadow: "0 0 14px rgba(53,37,205,0.2)" }}
            >
              {t('build.brand.cta')} ↗
            </a>
          </div>

          {/* Tech stack */}
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-5">{t('build.stack')}</div>

            <div className="tech-grid grid sm:grid-cols-2 gap-3">
              {tech.map((t) => (
                <div key={t.name} className="tech-chip relative border border-[var(--text)]/15 bg-[var(--surface)]/40 p-4 flex items-start gap-4 hover:border-[var(--pink)]/50 transition-colors group">
                  <div className="w-11 h-11 flex items-center justify-center border border-[var(--text)]/15 flex-shrink-0" style={{ color: t.color }}>
                    <Icon name={t.icon} size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg tracking-wider text-[var(--text)] group-hover:text-[var(--pink)] transition-colors">{t.name}</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text)]/50 mt-0.5">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--text)]/10 pt-5 text-[10px] tracking-[0.25em] text-[var(--text)]/45 leading-relaxed">
              <div className="text-[var(--cyan)] mb-2">{t('build.note2t')}</div>
              <p>
                {t('build.note2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// CERTIFICACIONES
// ────────────────────────────────────────────────────────────────────────────
function CertificationsSection({ certs }) {
  if (!certs || certs.length === 0) return null;

  useEffect(() => {
    gsap.from(".cert-card", {
      scrollTrigger: { trigger: "#certs", start: "top 75%" },
      y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)",
    });
    gsap.from(".certs-header", {
      scrollTrigger: { trigger: "#certs", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
    });
  }, [certs.length]);

  return (
    <section id="certs" className="relative py-32 px-6 md:px-12 bg-[var(--surface)] overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        background: "radial-gradient(circle at 80% 20%, rgba(0,229,255,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,45,120,0.1) 0%, transparent 50%)"
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="certs-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">// Formación_Certificada</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              <span className="neon-cyan">Certificaciones</span><br/>
              <span className="text-[var(--text)]">& Estudios.</span>
            </h2>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
            <div className="text-[var(--pink)] mb-2">// CREDENCIALES.VERIFICADAS</div>
            Formación técnica y certificaciones obtenidas.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={cert.id || i} className="cert-card relative border border-[var(--cyan)]/30 bg-[var(--dark)]/60 p-6 group hover:border-[var(--pink)]/60 transition-colors"
              style={{ boxShadow: "0 0 20px rgba(0,229,255,0.05)" }}>
              <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[var(--pink)]"></span>
              <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[var(--pink)]"></span>
              <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[var(--pink)]"></span>
              <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[var(--pink)]"></span>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border border-[var(--cyan)]/40 flex items-center justify-center flex-shrink-0 overflow-hidden bg-[var(--surface)]">
                  {cert.image_url
                    ? <img src={cert.image_url} alt={cert.issuer} className="w-full h-full object-contain p-1" />
                    : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></svg>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-xl tracking-wider text-[var(--text)] leading-tight group-hover:text-[var(--pink)] transition-colors">{cert.name}</div>
                  {cert.issuer && <div className="text-[10px] tracking-[0.25em] text-[var(--cyan)] mt-1">{cert.issuer}</div>}
                </div>
              </div>

              {cert.issue_date && (
                <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/40 mb-4">
                  <span className="text-[var(--pink)]">▍</span> {cert.issue_date}
                </div>
              )}

              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                  className="hover-target inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase border border-[var(--cyan)]/40 px-3 py-2 text-[var(--cyan)] hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all">
                  VER CREDENCIAL ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// VIDEOS
// ────────────────────────────────────────────────────────────────────────────
function VideosSection({ videos }) {
  if (!videos || videos.length === 0) return null;

  useEffect(() => {
    gsap.from(".video-card", {
      scrollTrigger: { trigger: "#videos", start: "top 75%" },
      y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
    });
    gsap.from(".videos-header", {
      scrollTrigger: { trigger: "#videos", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
    });
  }, [videos.length]);

  return (
    <section id="videos" className="relative py-32 px-6 md:px-12 bg-[var(--dark)] overflow-hidden grid-bg">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: "radial-gradient(circle at 30% 60%, rgba(255,45,120,0.15) 0%, transparent 50%)"
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="videos-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">// Demos_En_Vivo</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              <span className="neon-pink">Videos</span><br/>
              <span className="text-[var(--text)]">& Demos.</span>
            </h2>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
            <div className="text-[var(--cyan)] mb-2">// SIGNAL.TRANSMITIDO</div>
            Proyectos en acción. Demos reales, sin edición.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {videos.map((video, i) => (
            <div key={video.id || i} className="video-card relative border border-[var(--pink)]/30 bg-[var(--surface)]/40">
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--cyan)] z-10"></span>
              <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--cyan)] z-10"></span>
              <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--cyan)] z-10"></span>
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--cyan)] z-10"></span>

              <div className="p-4 border-b border-[var(--text)]/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl tracking-wider text-[var(--text)]">{video.title}</div>
                  {video.description && <div className="text-[10px] tracking-[0.2em] text-[var(--text)]/50 mt-1">{video.description}</div>}
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[var(--pink)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  REC
                </div>
              </div>

              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={video.embed_url}
                  title={video.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute inset-0 pointer-events-none z-[2]" style={{
                  background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
                  mixBlendMode: "overlay"
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// CONTACTO
// ────────────────────────────────────────────────────────────────────────────
// Reemplazá este ID con el tuyo de formspree.io/f/XXXXXXXX
const FORMSPREE_ID = "xqejddgn";
// Obtené tu key en formspree.io/account → API Keys (requiere plan Silver o superior)
const FORMSPREE_API_KEY = "";

async function validateEmailDomain(email) {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: "application/dns-json" } }
    );
    if (!res.ok) return true; // si el check falla, dejamos pasar
    const data = await res.json();
    if (data.Status === 3) return false; // NXDOMAIN: dominio inexistente
    // Si hay registros MX → válido. Si no hay pero el dominio existe → también válido (usa A record)
    return true;
  } catch {
    return true; // error de red: dejamos pasar para no bloquear al usuario
  }
}

function ContactSection() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", project: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailValidating, setEmailValidating] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(".contact-left", {
      scrollTrigger: { trigger: "#contact", start: "top 75%" },
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".contact-right", {
      scrollTrigger: { trigger: "#contact", start: "top 75%" },
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    document.querySelectorAll(".cyber-input").forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, { boxShadow: "0 0 18px rgba(0,229,255,0.55), inset 0 0 12px rgba(0,229,255,0.12)", borderColor: "#00E5FF", duration: 0.4 });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { boxShadow: "0 0 0px rgba(0,229,255,0)", borderColor: "rgba(232,232,240,0.15)", duration: 0.4 });
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    setSending(true);
    setEmailValidating(true);
    setFormError("");
    const emailOk = await validateEmailDomain(form.email);
    setEmailValidating(false);
    if (!emailOk) {
      setFormError(t('contact.err1'));
      setSending(false);
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, project: form.project, message: form.msg }),
      });
      if (!res.ok) throw new Error("error");
      setSent(true);
      setForm({ name: "", email: "", project: "", msg: "" });
      gsap.fromTo(".success-glow", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setFormError(t('contact.err2'));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-[var(--surface)] overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(circle at 20% 50%, rgba(255,45,120,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(0,229,255,0.12) 0%, transparent 50%)"
      }}></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div className="contact-left">
          <div className="section-tag mb-6">{t('contact.tag')}</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8">
            {t('contact.h2a')} <span className="neon-pink">{t('contact.h2b')}</span><br/>
            <span className="neon-cyan glitch" data-text={t('contact.h2c')}>{t('contact.h2c')}</span>
          </h2>
          <p className="text-[var(--text)]/70 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            {t('contact.desc')} <span className="text-[var(--cyan)]">24h</span>.
          </p>

          <div className="space-y-4 text-xs">
            <a href="mailto:ivanneira2015@gmail.com" className="flex items-center gap-4 group hover-target">
              <span className="w-9 h-9 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--pink)] group-hover:text-[var(--pink)] transition-colors flex-shrink-0">
                <Icon name="mail" size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] text-[var(--text)]/40">EMAIL</span>
                <span className="text-[var(--text)] group-hover:text-[var(--pink)] transition-colors">ivanneira2015@gmail.com</span>
              </div>
            </a>
            <a href="tel:+541154867460" className="flex items-center gap-4 group hover-target">
              <span className="w-9 h-9 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--pink)] group-hover:text-[var(--pink)] transition-colors flex-shrink-0">
                <Icon name="phone" size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] text-[var(--text)]/40">TELÉFONO</span>
                <span className="text-[var(--text)] group-hover:text-[var(--pink)] transition-colors">+54 11 5486-7460</span>
              </div>
            </a>
            <a href="https://github.com/ivanneira2015-hash" target="_blank" rel="noopener" className="flex items-center gap-4 group hover-target">
              <span className="w-9 h-9 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--pink)] group-hover:text-[var(--pink)] transition-colors flex-shrink-0">
                <Icon name="github" size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] text-[var(--text)]/40">GITHUB</span>
                <span className="text-[var(--text)] group-hover:text-[var(--pink)] transition-colors">@ivanneira2015-hash</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/walter-ivan-neira-astuena" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover-target">
              <span className="w-9 h-9 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] group-hover:border-[var(--pink)] group-hover:text-[var(--pink)] transition-colors flex-shrink-0">
                <Icon name="linkedin" size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] text-[var(--text)]/40">LINKEDIN</span>
                <span className="text-[var(--text)] group-hover:text-[var(--pink)] transition-colors">Walter Iván Neira Astuena</span>
              </div>
            </a>
          </div>
        </div>

        <div className="contact-right">
          <form ref={formRef} onSubmit={handleSubmit} className="relative border border-[var(--pink)]/30 bg-[var(--dark)]/60 p-6 md:p-8 backdrop-blur-sm">
            <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--pink)]"></span>

            <div className="flex items-center justify-between mb-6">
              <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">FORM.TRANSMISIÓN</div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--pink)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                ENCRIPTADO
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">{t('contact.fn')}</label>
                <input
                  className="cyber-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t('contact.pn')}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50">{t('contact.fe')}</label>
                  {emailValidating && (
                    <span className="text-[9px] tracking-[0.3em] text-[var(--cyan)] flex items-center gap-1.5">
                      <span className="w-2 h-2 border border-[var(--cyan)] border-t-transparent rounded-full animate-spin inline-block"></span>
                      {t('contact.verify')}
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  className="cyber-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t('contact.pe')}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">{t('contact.fp')}</label>
                <select
                  className="cyber-input"
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  style={{ appearance: "none", backgroundImage: "linear-gradient(45deg, transparent 50%, #00E5FF 50%), linear-gradient(135deg, #00E5FF 50%, transparent 50%)", backgroundPosition: "calc(100% - 18px) 50%, calc(100% - 12px) 50%", backgroundSize: "6px 6px, 6px 6px", backgroundRepeat: "no-repeat" }}
                >
                  <option value="">{t('contact.sel')}</option>
                  <option>{t('contact.o1')}</option>
                  <option>{t('contact.o2')}</option>
                  <option>{t('contact.o3')}</option>
                  <option>{t('contact.o4')}</option>
                  <option>{t('contact.o5')}</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">{t('contact.fm')}</label>
                <textarea
                  className="cyber-input"
                  rows="4"
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder={t('contact.pm')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sent || sending}
                className="pulse-btn hover-target relative w-full mt-2 py-4 bg-[var(--pink)] text-[var(--dark)] font-display text-xl tracking-[0.3em] hover:bg-[var(--cyan)] transition-colors disabled:opacity-80 disabled:cursor-default"
                style={{ background: sent ? "var(--cyan)" : sending ? "rgba(255,45,120,0.6)" : undefined }}
              >
                {sent ? (
                  <span className="success-glow inline-flex items-center gap-3">{t('contact.sent')}</span>
                ) : sending ? (
                  <span className="inline-flex items-center gap-3">{t('contact.sending')}</span>
                ) : (
                  <span>{t('contact.btn')}</span>
                )}
              </button>

              {formError && (
                <div className="text-[10px] text-[var(--pink)] tracking-wider pt-2 text-center">{formError}</div>
              )}

              <div className="text-[9px] tracking-[0.3em] text-[var(--text)]/30 text-center pt-2">
                {t('contact.spam')}
              </div>
            </div>
          </form>
        </div>
      </div>

      <footer className="relative mt-32 pt-8 border-t border-[var(--text)]/10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] text-[var(--text)]/40">
        <div>© 2026 NIVARO · WALTER_NEIRA</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse"></span>
          SYS.UPTIME 99.97%
        </div>
        <div>{t('footer.made')}</div>
      </footer>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ADMIN PANEL — Gestión de proyectos (localStorage)
// ────────────────────────────────────────────────────────────────────────────
// SHA-256 hashes — never store plaintext credentials in a public repo
const ADMIN_USER_HASH = "4748d4c802a775e8db9a23ec58f0986cacdc5d2d3356d22c490a7d22331ff133";
const ADMIN_PASS_HASH = "054073fb0492595ae30da7544f8b4244fab743e27f2f92d2a194a1fc242adc7d";
const STORAGE_KEY = "nivaro_projects";
const AUTH_KEY = "nivaro_admin_session";
const CERTS_KEY = "nivaro_certifications";
const VIDEOS_KEY = "nivaro_videos";
const CV_KEY = "nivaro_cv_url";
const CV_EN_KEY = "nivaro_cv_url_en";

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const HUES = [
  { label: "Pink · Magenta", value: "linear-gradient(135deg, #FF2D78 0%, #6B0F3A 100%)", color: "var(--pink)" },
  { label: "Cyan · Deep", value: "linear-gradient(135deg, #00E5FF 0%, #0A4D5A 100%)", color: "var(--cyan)" },
  { label: "Pink → Cyan", value: "linear-gradient(135deg, #FF2D78 0%, #00E5FF 100%)", color: "var(--pink)" },
  { label: "Cyan → Pink", value: "linear-gradient(135deg, #00E5FF 0%, #FF2D78 100%)", color: "var(--cyan)" },
  { label: "Purple Storm", value: "linear-gradient(135deg, #7B2FFF 0%, #2A0F6B 100%)", color: "var(--pink)" },
  { label: "Acid Lime", value: "linear-gradient(135deg, #B6FF2D 0%, #2A6B0F 100%)", color: "var(--cyan)" },
];

// ────────────────────────────────────────────────────────────────────────────
// INBOX — mensajes de Formspree dentro del panel admin
// ────────────────────────────────────────────────────────────────────────────
function InboxView() {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () => {
    if (!FORMSPREE_API_KEY) { setLoading(false); return; }
    setLoading(true);
    setFetchError("");
    fetch(`https://api.formspree.io/api/0/forms/${FORMSPREE_ID}/submissions`, {
      headers: { Authorization: `Bearer ${FORMSPREE_API_KEY}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions !== undefined) setMessages(data.submissions);
        else setFetchError(data.error || "Error al cargar mensajes");
      })
      .catch(() => setFetchError("Error de conexión con Formspree"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const fmt = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })
      + " · " + d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  };

  if (!FORMSPREE_API_KEY) return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="border border-[var(--cyan)]/30 bg-[var(--surface)]/50 p-5">
        <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-3">/ CONFIGURAR.INBOX</div>
        <p className="text-xs text-[var(--text)]/70 leading-relaxed mb-5">
          Para ver los mensajes acá adentro necesitás tu <span className="text-[var(--cyan)]">API Key de Formspree</span> (plan Silver o superior).
        </p>
        <div className="space-y-3 text-xs text-[var(--text)]/60 leading-relaxed">
          {[
            ["01", "Ir a formspree.io/account → API Keys"],
            ["02", "Crear una nueva key"],
            ["03", "Pegarla en Portfolio.jsx en la constante FORMSPREE_API_KEY"],
          ].map(([n, t]) => (
            <div key={n} className="flex gap-3">
              <span className="text-[var(--pink)] flex-shrink-0">{n}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[var(--text)]/10 text-[9px] tracking-[0.25em] text-[var(--text)]/35">
          FORMSPREE_ID: {FORMSPREE_ID} · PLAN REQUERIDO: SILVER
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <div className="w-6 h-6 border-2 border-[var(--cyan)] border-t-transparent rounded-full animate-spin"></div>
      <div className="text-[10px] tracking-[0.4em] text-[var(--text)]/50">CARGANDO.INBOX</div>
    </div>
  );

  if (fetchError) return (
    <div className="flex-1 p-5 space-y-3">
      <div className="text-xs text-[var(--pink)] tracking-wider">{fetchError}</div>
      <button onClick={load} className="hover-target text-[10px] tracking-widest text-[var(--cyan)] underline">↺ Reintentar</button>
    </div>
  );

  if (selected) return (
    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
      <button onClick={() => setSelected(null)} className="hover-target flex items-center gap-2 text-[10px] tracking-[0.3em] text-[var(--text)]/50 hover:text-[var(--cyan)] transition-colors self-start">
        ← VOLVER
      </button>
      <div className="border border-[var(--pink)]/30 bg-[var(--surface)]/50 p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="font-display text-lg tracking-wider text-[var(--text)]">{selected.name || "(sin nombre)"}</div>
          <div className="text-[9px] tracking-widest text-[var(--text)]/40 flex-shrink-0">{fmt(selected._date)}</div>
        </div>
        <a href={`mailto:${selected.email}`} className="hover-target block text-xs text-[var(--cyan)] hover:text-[var(--pink)] transition-colors">{selected.email}</a>
        {selected.project && (
          <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50">TIPO: {selected.project}</div>
        )}
        <div className="border-t border-[var(--text)]/10 pt-3 text-sm text-[var(--text)]/80 leading-relaxed whitespace-pre-wrap">
          {selected.message || selected.msg || "(sin mensaje)"}
        </div>
      </div>
      <a
        href={`mailto:${selected.email}?subject=Re: Consulta desde Nivaro&body=Hola ${encodeURIComponent(selected.name || "")},%0D%0A%0D%0A`}
        className="hover-target flex items-center justify-center gap-2 py-3 border border-[var(--cyan)]/60 text-[var(--cyan)] text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--cyan)] hover:text-[var(--dark)] transition-all"
        style={{ boxShadow: "0 0 12px rgba(0,229,255,0.15)" }}
      >
        <Icon name="mail" size={13} />
        RESPONDER POR EMAIL
      </a>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--text)]/10 flex-shrink-0">
        <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50">
          {messages.length} MENSAJE{messages.length !== 1 ? "S" : ""}
        </div>
        <button onClick={load} className="hover-target text-[10px] tracking-widest text-[var(--cyan)] hover:text-[var(--pink)] transition-colors">
          ↺ ACTUALIZAR
        </button>
      </div>
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[var(--text)]/40 text-xs tracking-widest">◢ SIN MENSAJES AÚN</div>
      ) : (
        <div className="divide-y divide-[var(--text)]/10">
          {messages.map((m) => (
            <button
              key={m._id}
              onClick={() => setSelected(m)}
              className="hover-target w-full text-left px-5 py-4 hover:bg-[var(--surface)]/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-display text-sm tracking-wider text-[var(--text)] truncate">{m.name || m.email || "(anónimo)"}</div>
                <div className="text-[9px] tracking-widest text-[var(--text)]/40 flex-shrink-0">{fmt(m._date)}</div>
              </div>
              <div className="text-[10px] text-[var(--cyan)] truncate mb-1">{m.email}</div>
              <div className="text-xs text-[var(--text)]/50 truncate">{m.message || m.msg || "—"}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      aria-label="Panel de administración"
      className="hover-target fixed bottom-6 right-6 z-[60] w-12 h-12 flex items-center justify-center border bg-[var(--dark)]/80 backdrop-blur-md transition-all"
      style={{
        borderColor: isOpen ? "var(--pink)" : "rgba(0,229,255,0.4)",
        color: isOpen ? "var(--pink)" : "var(--cyan)",
        boxShadow: isOpen ? "0 0 20px rgba(255,45,120,0.5)" : "0 0 12px rgba(0,229,255,0.25)",
      }}
    >
      <Icon name={isOpen ? "close" : "user"} size={20} />
    </button>
  );
}

function AdminPanel({ projects, setProjects, certs, setCerts, videos, setVideos, cvUrl, setCvUrl, cvUrlEn, setCvUrlEn, onClose }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "true");
  const [loginUser, setLoginUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [draftCert, setDraftCert] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [draftVideo, setDraftVideo] = useState(null);
  const [cvDraft, setCvDraft] = useState(cvUrl || "");
  const [cvEnDraft, setCvEnDraft] = useState(cvUrlEn || "");
  const [toast, setToast] = useState("");
  const [adminTab, setAdminTab] = useState("projects");
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { x: "100%" }, { x: 0, duration: 0.5, ease: "power3.out" });
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const [uh, ph] = await Promise.all([sha256(loginUser.trim()), sha256(pwd)]);
    if (uh === ADMIN_USER_HASH && ph === ADMIN_PASS_HASH) {
      setAuthed(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      setPwdError(false);
      setLoginUser("");
      setPwd("");
    } else {
      setPwdError(true);
      gsap.fromTo(".login-box", { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      setTimeout(() => setPwdError(false), 1500);
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem(AUTH_KEY);
    setEditing(null);
    setDraft(null);
  };

  const startEdit = (idx) => {
    setEditing(idx);
    setDraft({ ...projects[idx] });
  };

  const startNew = () => {
    const nextNum = String(projects.length + 1).padStart(2, "0");
    setEditing("new");
    setDraft({
      n: nextNum,
      title: "",
      tag: "",
      desc: "",
      tags: [],
      color: "var(--pink)",
      hue: HUES[0].value,
      url: "",
      repoUrl: "",
      image: "",
    });
  };

  const saveDraft = () => {
    if (!draft.title.trim() || !draft.desc.trim()) {
      showToast("◢ Título y descripción son obligatorios");
      return;
    }
    const next = [...projects];
    if (editing === "new") {
      next.push(draft);
    } else {
      next[editing] = draft;
    }
    setProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setEditing(null);
    setDraft(null);
    showToast("✓ Guardado");
  };

  const deleteProject = (idx) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    const next = projects.filter((_, i) => i !== idx).map((p, i) => ({
      ...p,
      n: String(i + 1).padStart(2, "0"),
    }));
    setProjects(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    showToast("✓ Eliminado");
  };

  const resetDefaults = () => {
    if (!confirm("¿Restaurar proyectos a los valores por defecto? Se perderán los cambios.")) return;
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast("✓ Restaurado");
  };

  const exportJSON = () => {
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nivaro-projects.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("✓ Exportado");
  };

  // ─── LOGIN VIEW ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div ref={panelRef} className="fixed top-0 right-0 bottom-0 z-[55] w-full md:w-[460px] bg-[var(--dark)] border-l border-[var(--pink)]/30 flex items-center justify-center p-6">
        <div className="login-box w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-[var(--cyan)]/50 mb-4 text-[var(--cyan)]" style={{ boxShadow: "0 0 24px rgba(0,229,255,0.25)" }}>
              <Icon name="lock" size={28} />
            </div>
            <div className="text-[10px] tracking-[0.4em] text-[var(--cyan)] mb-2">NIVARO.CONSOLE</div>
            <div className="font-display text-3xl tracking-wider neon-pink">ACCESO RESTRINGIDO</div>
            <p className="text-xs text-[var(--text)]/50 mt-3 leading-relaxed">
              Solo el operador. Ingresá la clave para gestionar proyectos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ USUARIO</label>
              <input
                type="text"
                autoFocus
                autoComplete="username"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="cyber-input"
                placeholder="operador"
                style={{ borderColor: pwdError ? "var(--pink)" : undefined }}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ CLAVE</label>
              <input
                type="password"
                autoComplete="current-password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="cyber-input"
                placeholder="••••••••••"
                style={{ borderColor: pwdError ? "var(--pink)" : undefined }}
              />
              {pwdError && (
                <div className="text-[10px] text-[var(--pink)] mt-2 tracking-wider">◢ CREDENCIALES_INCORRECTAS</div>
              )}
            </div>
            <button
              type="submit"
              className="hover-target w-full py-3 bg-[var(--cyan)] text-[var(--dark)] font-display text-base tracking-[0.3em] hover:bg-[var(--pink)] transition-colors"
            >
              ENTRAR ⌁
            </button>
            <button
              type="button"
              onClick={onClose}
              className="hover-target w-full py-2 text-[10px] tracking-[0.3em] text-[var(--text)]/50 hover:text-[var(--cyan)]"
            >
              CANCELAR
            </button>
          </form>

          <div className="mt-8 text-[9px] tracking-[0.25em] text-[var(--text)]/30 text-center leading-relaxed">
            ◢ AUTH LOCAL · SESIÓN EN BROWSER · NO_BACKEND
          </div>
        </div>
      </div>
    );
  }

  // ─── EDITOR VIEW ───────────────────────────────────────────────────────
  if (editing !== null && draft) {
    return (
      <div ref={panelRef} className="fixed top-0 right-0 bottom-0 z-[55] w-full md:w-[520px] bg-[var(--dark)] border-l border-[var(--pink)]/30 flex flex-col">
        <header className="flex items-center justify-between p-5 border-b border-[var(--text)]/10">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">{editing === "new" ? "/NUEVO" : "/EDITAR"}</div>
            <div className="font-display text-xl tracking-wider mt-1">{editing === "new" ? "Nuevo proyecto" : `Editar #${draft.n}`}</div>
          </div>
          <button onClick={() => { setEditing(null); setDraft(null); }} className="hover-target text-[var(--text)]/50 hover:text-[var(--pink)]">
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ NÚMERO</label>
              <input className="cyber-input" value={draft.n} onChange={(e) => setDraft({ ...draft, n: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ COLOR ACENTO</label>
              <select className="cyber-input" value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })}>
                <option value="var(--pink)">Pink</option>
                <option value="var(--cyan)">Cyan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ TÍTULO *</label>
            <input className="cyber-input" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="EJ: NIVARO // CORE" />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ ETIQUETA / CATEGORÍA</label>
            <input className="cyber-input" value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} placeholder="Full Stack · Producto" />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ DESCRIPCIÓN *</label>
            <textarea className="cyber-input" rows="4" value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} placeholder="Descripción breve del proyecto..."></textarea>
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ TECNOLOGÍAS (separadas por coma)</label>
            <input
              className="cyber-input"
              value={draft.tags.join(", ")}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ URL DEMO (opcional)</label>
            <input
              className="cyber-input"
              type="url"
              value={draft.url || ""}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
              placeholder="https://mi-proyecto.vercel.app"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ URL REPOSITORIO GitHub (opcional)</label>
            <input
              className="cyber-input"
              type="url"
              value={draft.repoUrl || ""}
              onChange={(e) => setDraft({ ...draft, repoUrl: e.target.value })}
              placeholder="https://github.com/usuario/repo"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ GRADIENTE DE PORTADA</label>
            <div className="grid grid-cols-2 gap-2">
              {HUES.map((h) => (
                <button
                  key={h.value}
                  type="button"
                  onClick={() => setDraft({ ...draft, hue: h.value, color: h.color })}
                  className="hover-target h-14 relative border transition-all"
                  style={{
                    background: h.value,
                    borderColor: draft.hue === h.value ? "var(--cyan)" : "rgba(232,232,240,0.1)",
                    boxShadow: draft.hue === h.value ? "0 0 12px rgba(0,229,255,0.5)" : "none",
                  }}
                >
                  <span className="absolute bottom-1 left-2 text-[9px] tracking-widest text-white/90">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ IMAGEN DEL PROYECTO</label>
            <input
              className="cyber-input mb-2"
              type="url"
              value={draft.image || ""}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              placeholder="https://... (URL de imagen)"
            />
            <label className="hover-target flex items-center justify-center gap-2 border border-dashed border-[var(--cyan)]/40 h-10 text-[10px] tracking-[0.3em] text-[var(--text)]/50 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors" style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setDraft({ ...draft, image: ev.target.result });
                  reader.readAsDataURL(file);
                }}
              />
              <Icon name="download" size={14} /> SUBIR DESDE DISCO
            </label>
            {draft.image && (
              <div className="relative mt-2 h-28 overflow-hidden border border-[var(--text)]/15">
                <img src={draft.image} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, image: "" })}
                  className="hover-target absolute top-1 right-1 w-6 h-6 bg-[var(--dark)]/80 flex items-center justify-center text-[var(--pink)] hover:bg-[var(--pink)] hover:text-[var(--dark)] transition-colors"
                >
                  <Icon name="close" size={10} />
                </button>
              </div>
            )}
          </div>

          {/* Live preview */}
          <div>
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ PREVIEW</label>
            <div className="border border-[var(--pink)]/30 bg-[var(--surface)] p-4">
              <div className="h-24 mb-3 relative overflow-hidden" style={{ background: draft.hue }}>
                <div className="absolute inset-0 flex items-center justify-center font-display text-4xl text-white/30">{draft.n}</div>
                <div className="absolute top-2 left-2 text-[9px] tracking-widest text-white/80">{draft.tag || "—"}</div>
              </div>
              <div className="font-display text-lg tracking-wider" style={{ color: draft.color }}>{draft.title || "TITULO_PROYECTO"}</div>
              <div className="text-xs text-[var(--text)]/60 mt-1 line-clamp-2">{draft.desc || "Descripción..."}</div>
            </div>
          </div>
        </div>

        <footer className="flex gap-2 p-5 border-t border-[var(--text)]/10">
          <button onClick={() => { setEditing(null); setDraft(null); }} className="hover-target flex-1 py-3 border border-[var(--text)]/20 text-[11px] tracking-[0.3em] hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors">
            CANCELAR
          </button>
          <button onClick={saveDraft} className="hover-target flex-1 py-3 bg-[var(--cyan)] text-[var(--dark)] font-display tracking-[0.3em] hover:bg-[var(--pink)] transition-colors flex items-center justify-center gap-2">
            <Icon name="save" size={16} />
            GUARDAR
          </button>
        </footer>

        {toast && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[var(--cyan)] px-4 py-2 text-[10px] tracking-widest text-[var(--cyan)]" style={{ boxShadow: "0 0 16px rgba(0,229,255,0.4)" }}>
            {toast}
          </div>
        )}
      </div>
    );
  }

  // ─── LIST VIEW ─────────────────────────────────────────────────────────
  return (
    <div ref={panelRef} className="fixed top-0 right-0 bottom-0 z-[55] w-full md:w-[480px] bg-[var(--dark)] border-l border-[var(--pink)]/30 flex flex-col">
      <header className="p-5 border-b border-[var(--text)]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[var(--cyan)] flex items-center justify-center text-[var(--cyan)]" style={{ boxShadow: "0 0 12px rgba(0,229,255,0.3)" }}>
              <Icon name="user" size={18} />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">NIVARO.CONSOLE</div>
              <div className="font-display text-xl tracking-wider">Panel de Operador</div>
            </div>
          </div>
          <button onClick={onClose} className="hover-target text-[var(--text)]/50 hover:text-[var(--pink)]">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4 text-[9px] tracking-[0.3em] text-[var(--text)]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse"></span>
          SESIÓN ACTIVA · {projects.length} PROYECTO{projects.length === 1 ? "" : "S"}
        </div>
      </header>

      <div className="border-b border-[var(--text)]/10">
        <div className="flex overflow-x-auto">
          {[["projects", "PROY"], ["certs", "CERTS"], ["videos", "VIDS"], ["cv", "CV"], ["inbox", "INBOX"]].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setAdminTab(tab)}
              className={`hover-target flex-1 py-3 text-[10px] tracking-[0.3em] uppercase transition-colors border-b-2 ${
                adminTab === tab
                  ? "text-[var(--pink)] border-[var(--pink)]"
                  : "text-[var(--text)]/50 border-transparent hover:text-[var(--cyan)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {adminTab === "projects" && (
          <div className="px-5 py-3 flex items-center gap-2">
            <button onClick={startNew} className="hover-target flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--pink)] text-[var(--dark)] font-display tracking-widest text-sm hover:bg-[var(--cyan)] transition-colors">
              <Icon name="plus" size={16} />NUEVO
            </button>
            <button onClick={exportJSON} title="Exportar JSON" className="hover-target w-10 h-10 border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/70 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors">
              <Icon name="download" size={16} />
            </button>
            <button onClick={resetDefaults} title="Restaurar defaults" className="hover-target w-10 h-10 border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/70 hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors">
              <Icon name="reset" size={16} />
            </button>
          </div>
        )}
        {adminTab === "certs" && (
          <div className="px-5 py-3">
            <button onClick={() => { setEditingCert("new"); setDraftCert({ id: Date.now().toString(), name: "", issuer: "", issue_date: "", credential_url: "", image_url: "" }); }}
              className="hover-target w-full flex items-center justify-center gap-2 py-2.5 bg-[var(--pink)] text-[var(--dark)] font-display tracking-widest text-sm hover:bg-[var(--cyan)] transition-colors">
              <Icon name="plus" size={16} />NUEVA CERT
            </button>
          </div>
        )}
        {adminTab === "videos" && (
          <div className="px-5 py-3">
            <button onClick={() => { setEditingVideo("new"); setDraftVideo({ id: Date.now().toString(), title: "", description: "", embed_url: "" }); }}
              className="hover-target w-full flex items-center justify-center gap-2 py-2.5 bg-[var(--pink)] text-[var(--dark)] font-display tracking-widest text-sm hover:bg-[var(--cyan)] transition-colors">
              <Icon name="plus" size={16} />NUEVO VIDEO
            </button>
          </div>
        )}
      </div>

      {adminTab === "inbox" && <InboxView />}

      {adminTab === "projects" && (
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {projects.length === 0 && (
            <div className="text-center py-12 text-[var(--text)]/40 text-xs tracking-widest">
              ◢ NO HAY PROYECTOS<br/><br/>
              <button onClick={startNew} className="hover-target text-[var(--cyan)] underline">Crear el primero →</button>
            </div>
          )}
          {projects.map((p, i) => (
            <div key={i} className="border border-[var(--text)]/15 bg-[var(--surface)]/50 p-3 flex items-center gap-3 group hover:border-[var(--pink)]/40 transition-colors">
              <div className="w-14 h-14 flex-shrink-0 relative overflow-hidden" style={{ background: p.hue }}>
                <div className="absolute inset-0 flex items-center justify-center font-display text-xl text-white/40">{p.n}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm tracking-wider truncate" style={{ color: p.color }}>{p.title}</div>
                <div className="text-[10px] tracking-widest text-[var(--text)]/50 truncate">{p.tag}</div>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] tracking-wider text-[var(--text)]/40 border border-[var(--text)]/15 px-1.5 py-0.5">{t}</span>
                  ))}
                  {p.tags.length > 3 && <span className="text-[9px] text-[var(--text)]/40">+{p.tags.length - 3}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => startEdit(i)} title="Editar" className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors">
                  <Icon name="edit" size={14} />
                </button>
                <button onClick={() => deleteProject(i)} title="Eliminar" className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--pink)] hover:border-[var(--pink)] transition-colors">
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adminTab === "certs" && !editingCert && (
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {certs.length === 0 && (
            <div className="text-center py-12 text-[var(--text)]/40 text-xs tracking-widest">
              ◢ NO HAY CERTIFICACIONES<br/><br/>
              <button onClick={() => { setEditingCert("new"); setDraftCert({ id: Date.now().toString(), name: "", issuer: "", issue_date: "", credential_url: "", image_url: "" }); }}
                className="hover-target text-[var(--cyan)] underline">Agregar la primera →</button>
            </div>
          )}
          {certs.map((c, i) => (
            <div key={c.id || i} className="border border-[var(--text)]/15 bg-[var(--surface)]/50 p-3 flex items-center gap-3 hover:border-[var(--pink)]/40 transition-colors">
              <div className="w-10 h-10 border border-[var(--cyan)]/30 flex items-center justify-center flex-shrink-0 bg-[var(--surface)] overflow-hidden">
                {c.image_url ? <img src={c.image_url} alt="" className="w-full h-full object-contain p-1" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></svg>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm tracking-wider truncate text-[var(--text)]">{c.name}</div>
                <div className="text-[10px] tracking-widest text-[var(--cyan)] truncate">{c.issuer} {c.issue_date ? `· ${c.issue_date}` : ""}</div>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => { setEditingCert(i); setDraftCert({ ...c }); }} className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors">
                  <Icon name="edit" size={14} />
                </button>
                <button onClick={() => { const next = certs.filter((_, j) => j !== i); setCerts(next); localStorage.setItem(CERTS_KEY, JSON.stringify(next)); showToast("✓ Eliminada"); }}
                  className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--pink)] hover:border-[var(--pink)] transition-colors">
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adminTab === "certs" && editingCert !== null && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">{editingCert === "new" ? "/NUEVA CERT" : "/EDITAR CERT"}</div>
            <button onClick={() => { setEditingCert(null); setDraftCert(null); }} className="hover-target text-[var(--text)]/50 hover:text-[var(--pink)]"><Icon name="close" size={18} /></button>
          </div>
          {[["name","Nombre *",""],["issuer","Institución","Ej: Fundación Formar"],["issue_date","Fecha","Ej: Mayo 2026"],["credential_url","URL Credencial","https://..."],["image_url","URL Logo/Imagen","https://..."]].map(([field, label, ph]) => (
            <div key={field}>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ {label.toUpperCase()}</label>
              <input className="cyber-input" value={draftCert[field] || ""} onChange={e => setDraftCert({ ...draftCert, [field]: e.target.value })} placeholder={ph} />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => { setEditingCert(null); setDraftCert(null); }} className="hover-target flex-1 py-3 border border-[var(--text)]/20 text-[11px] tracking-[0.3em] hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors">CANCELAR</button>
            <button onClick={() => {
              if (!draftCert.name.trim()) return showToast("◢ Nombre requerido");
              let next;
              if (editingCert === "new") next = [...certs, draftCert];
              else { next = [...certs]; next[editingCert] = draftCert; }
              setCerts(next); localStorage.setItem(CERTS_KEY, JSON.stringify(next));
              setEditingCert(null); setDraftCert(null); showToast("✓ Guardada");
            }} className="hover-target flex-1 py-3 bg-[var(--cyan)] text-[var(--dark)] font-display tracking-[0.3em] hover:bg-[var(--pink)] transition-colors flex items-center justify-center gap-2">
              <Icon name="save" size={16} />GUARDAR
            </button>
          </div>
        </div>
      )}

      {adminTab === "videos" && !editingVideo && (
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {videos.length === 0 && (
            <div className="text-center py-12 text-[var(--text)]/40 text-xs tracking-widest">
              ◢ NO HAY VIDEOS<br/><br/>
              <button onClick={() => { setEditingVideo("new"); setDraftVideo({ id: Date.now().toString(), title: "", description: "", embed_url: "" }); }}
                className="hover-target text-[var(--cyan)] underline">Agregar el primero →</button>
            </div>
          )}
          {videos.map((v, i) => (
            <div key={v.id || i} className="border border-[var(--text)]/15 bg-[var(--surface)]/50 p-3 flex items-center gap-3 hover:border-[var(--pink)]/40 transition-colors">
              <div className="w-10 h-10 border border-[var(--pink)]/30 flex items-center justify-center flex-shrink-0 bg-[var(--surface)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm tracking-wider truncate text-[var(--text)]">{v.title}</div>
                <div className="text-[10px] tracking-widest text-[var(--text)]/40 truncate">{v.embed_url}</div>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => { setEditingVideo(i); setDraftVideo({ ...v }); }} className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors">
                  <Icon name="edit" size={14} />
                </button>
                <button onClick={() => { const next = videos.filter((_, j) => j !== i); setVideos(next); localStorage.setItem(VIDEOS_KEY, JSON.stringify(next)); showToast("✓ Eliminado"); }}
                  className="hover-target w-8 h-8 border border-[var(--text)]/20 flex items-center justify-center text-[var(--pink)] hover:border-[var(--pink)] transition-colors">
                  <Icon name="trash" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adminTab === "videos" && editingVideo !== null && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">{editingVideo === "new" ? "/NUEVO VIDEO" : "/EDITAR VIDEO"}</div>
            <button onClick={() => { setEditingVideo(null); setDraftVideo(null); }} className="hover-target text-[var(--text)]/50 hover:text-[var(--pink)]"><Icon name="close" size={18} /></button>
          </div>
          {[["title","Título *",""],["description","Descripción","Demo del proyecto..."],["embed_url","URL Embed *","https://www.youtube.com/embed/VIDEO_ID"]].map(([field, label, ph]) => (
            <div key={field}>
              <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ {label.toUpperCase()}</label>
              {field === "description"
                ? <textarea className="cyber-input" rows="3" value={draftVideo[field] || ""} onChange={e => setDraftVideo({ ...draftVideo, [field]: e.target.value })} placeholder={ph} />
                : <input className="cyber-input" value={draftVideo[field] || ""} onChange={e => setDraftVideo({ ...draftVideo, [field]: e.target.value })} placeholder={ph} />
              }
            </div>
          ))}
          <p className="text-[9px] tracking-[0.25em] text-[var(--text)]/35 leading-relaxed">◢ YouTube: Share → Embed → copiá la URL del src (ej: https://www.youtube.com/embed/ID)</p>
          <div className="flex gap-2 pt-2">
            <button onClick={() => { setEditingVideo(null); setDraftVideo(null); }} className="hover-target flex-1 py-3 border border-[var(--text)]/20 text-[11px] tracking-[0.3em] hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors">CANCELAR</button>
            <button onClick={() => {
              if (!draftVideo.title.trim() || !draftVideo.embed_url.trim()) return showToast("◢ Título y URL requeridos");
              let next;
              if (editingVideo === "new") next = [...videos, draftVideo];
              else { next = [...videos]; next[editingVideo] = draftVideo; }
              setVideos(next); localStorage.setItem(VIDEOS_KEY, JSON.stringify(next));
              setEditingVideo(null); setDraftVideo(null); showToast("✓ Guardado");
            }} className="hover-target flex-1 py-3 bg-[var(--cyan)] text-[var(--dark)] font-display tracking-[0.3em] hover:bg-[var(--pink)] transition-colors flex items-center justify-center gap-2">
              <Icon name="save" size={16} />GUARDAR
            </button>
          </div>
        </div>
      )}

      {adminTab === "cv" && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-2">/ CV.ACTUALIZAR</div>
          <p className="text-xs text-[var(--text)]/60 leading-relaxed">Pegá las URLs de los PDFs. Los botones CV·ES y CV·EN en el hero usarán estas URLs.</p>
          <div className="space-y-1">
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ CV ESPAÑOL (URL PDF)</label>
            <input className="cyber-input" value={cvDraft} onChange={e => setCvDraft(e.target.value)} placeholder="https://drive.google.com/file/..." />
            {cvUrl && <p className="text-[10px] tracking-[0.3em] text-[var(--text)]/40">ACTUAL: <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="hover-target text-[var(--cyan)] underline">ver ES</a></p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ CV INGLÉS (URL PDF)</label>
            <input className="cyber-input" value={cvEnDraft} onChange={e => setCvEnDraft(e.target.value)} placeholder="https://drive.google.com/file/..." />
            {cvUrlEn && <p className="text-[10px] tracking-[0.3em] text-[var(--text)]/40">ACTUAL: <a href={cvUrlEn} target="_blank" rel="noopener noreferrer" className="hover-target text-[var(--cyan)] underline">ver EN</a></p>}
            <p className="text-[9px] tracking-[0.2em] text-[var(--text)]/35">◢ Si dejás vacío, el botón EN usa el mismo PDF que ES.</p>
          </div>
          <button onClick={() => { setCvUrl(cvDraft); localStorage.setItem(CV_KEY, cvDraft); setCvUrlEn(cvEnDraft); localStorage.setItem(CV_EN_KEY, cvEnDraft); showToast("✓ CVs actualizados"); }}
            className="hover-target w-full py-3 bg-[var(--cyan)] text-[var(--dark)] font-display tracking-[0.3em] hover:bg-[var(--pink)] transition-colors flex items-center justify-center gap-2">
            <Icon name="save" size={16} />GUARDAR AMBAS URLs
          </button>
          <div className="border-t border-[var(--text)]/10 pt-4">
            <p className="text-[9px] tracking-[0.25em] text-[var(--text)]/35 leading-relaxed">◢ Si dejás vacío, se usa el PDF que está en uploads/ del proyecto.<br/>Para Google Drive: Archivo → Compartir → "Cualquiera con el enlace" → copiar link directo.</p>
          </div>
        </div>
      )}

      <footer className="p-4 border-t border-[var(--text)]/10 flex items-center justify-between text-[10px] tracking-widest">
        <span className="text-[var(--text)]/40">LOCAL_STORAGE_ONLY</span>
        <button onClick={handleLogout} className="hover-target flex items-center gap-2 text-[var(--text)]/60 hover:text-[var(--pink)] transition-colors">
          <Icon name="logout" size={14} />
          SALIR
        </button>
      </footer>

      {toast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[var(--cyan)] px-4 py-2 text-[10px] tracking-widest text-[var(--cyan)]" style={{ boxShadow: "0 0 16px rgba(0,229,255,0.4)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// APP
// ────────────────────────────────────────────────────────────────────────────
function App() {
  const [lang, setLangState] = useState(() => localStorage.getItem('nivaro_lang') || 'es');
  const setLang = (l) => { setLangState(l); localStorage.setItem('nivaro_lang', l); };
  const t = (key) => (T[lang]?.[key]) ?? (T.es[key] ?? key);
  const langCtx = { lang, setLang, t };

  const [adminOpen, setAdminOpen] = useState(false);

  const [certs, setCertsState] = useState(() => {
    try { const s = localStorage.getItem(CERTS_KEY); const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch { return []; }
  });
  const [videos, setVideosState] = useState(() => {
    try { const s = localStorage.getItem(VIDEOS_KEY); const p = JSON.parse(s); return Array.isArray(p) ? p : []; } catch { return []; }
  });
  const [cvUrl, setCvUrlState] = useState(() => localStorage.getItem(CV_KEY) || "");
  const [cvUrlEn, setCvUrlEnState] = useState(() => localStorage.getItem(CV_EN_KEY) || "");

  const updateCerts = (next) => { setCertsState(next); localStorage.setItem(CERTS_KEY, JSON.stringify(next)); };
  const updateVideos = (next) => { setVideosState(next); localStorage.setItem(VIDEOS_KEY, JSON.stringify(next)); };
  const updateCvUrl = (val) => { setCvUrlState(val); localStorage.setItem(CV_KEY, val); };
  const updateCvUrlEn = (val) => { setCvUrlEnState(val); localStorage.setItem(CV_EN_KEY, val); };

  // Unified projects state — starts from localStorage, merges manifest on load
  const [projects, setProjectsState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
    return null; // null = not loaded yet, wait for manifest
  });

  useEffect(() => {
    fetch("/projects/manifest.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((manifest) => {
        setProjectsState((current) => {
          if (!current) {
            // First time — use manifest (or defaults if manifest empty)
            return manifest.length > 0 ? manifest : DEFAULT_PROJECTS;
          }
          // Add any new manifest projects not already tracked in stored list
          const storedFolders = new Set(current.filter((p) => p.folder).map((p) => p.folder));
          const fresh = manifest.filter((p) => !storedFolders.has(p.folder));
          return fresh.length > 0 ? [...fresh, ...current] : current;
        });
      })
      .catch(() => setProjectsState((c) => c || DEFAULT_PROJECTS));
  }, []);

  const updateProjects = (next) => {
    setProjectsState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const displayProjects = projects || DEFAULT_PROJECTS;

  return (
    <LangContext.Provider value={langCtx}>
      <div className="relative bg-[var(--dark)] text-[var(--text)]">
        <Cursor />
        <Nav hasCerts={certs.length > 0} hasVideos={videos.length > 0} />
        <HeroSection cvUrl={cvUrl} cvUrlEn={cvUrlEn} />
        <AboutSection cvUrlEn={cvUrlEn} />
        <ProjectsSection projects={displayProjects} />
        <CertificationsSection certs={certs} />
        <VideosSection videos={videos} />
        <BuildSection />
        <ContactSection />
        {!adminOpen && <AdminButton onClick={() => setAdminOpen(true)} isOpen={false} />}
        {adminOpen && (
          <AdminPanel
            projects={displayProjects}
            setProjects={updateProjects}
            certs={certs}
            setCerts={updateCerts}
            videos={videos}
            setVideos={updateVideos}
            cvUrl={cvUrl}
            setCvUrl={updateCvUrl}
            cvUrlEn={cvUrlEn}
            setCvUrlEn={updateCvUrlEn}
            onClose={() => setAdminOpen(false)}
          />
        )}
      </div>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
