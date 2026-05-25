const { useState, useEffect, useRef } = React;

gsap.registerPlugin(ScrollTrigger);

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
function Nav() {
  const navRef = useRef(null);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });

    const sections = ["hero", "about", "projects", "build", "contact"];
    const onScroll = () => {
      let current = "hero";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY + 200 >= el.offsetTop) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "hero", label: "00 / Inicio" },
    { id: "about", label: "01 / Sobre_Mí" },
    { id: "projects", label: "02 / Proyectos" },
    { id: "build", label: "03 / Build" },
    { id: "contact", label: "04 / Contacto" },
  ];

  return (
    <nav ref={navRef} className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between">
      <a href="#hero" className="flex items-center gap-2 group">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--pink)]" style={{ boxShadow: "0 0 12px var(--pink)" }}></div>
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.25em]">NIVARO</span>
          <span className="text-[8px] tracking-[0.4em] text-[var(--cyan)] opacity-70 mt-0.5">// W.NEIRA</span>
        </div>
      </a>
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
      <a href="#contact" className="hidden md:inline-block text-[10px] tracking-[0.3em] uppercase border border-[var(--cyan)]/60 px-4 py-2 hover:bg-[var(--cyan)]/10 transition-colors text-[var(--cyan)]">
        [ Contratame ]
      </a>
      <a href="#contact" className="md:hidden text-[var(--cyan)] text-xs tracking-widest border border-[var(--cyan)]/60 px-3 py-1.5">MENÚ</a>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────────────────────
function HeroSection() {
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
            <span className="opacity-70">FULL_STACK</span>
          </div>

          <h1 className="hero-title font-display text-[64px] md:text-[110px] lg:text-[150px] leading-[0.85] mb-4">
            <span className="block neon-pink">WALTER</span>
            <span className="block neon-cyan glitch" data-text="NEIRA.">NEIRA.</span>
          </h1>

          <div ref={subtitleRef} className="mt-8 space-y-2 max-w-xl">
            <p className="sub-line text-[var(--text)]/85 text-sm md:text-base leading-relaxed">
              <span className="text-[var(--cyan)]">&gt;</span> Desarrollador Full Stack · React · Node.js · TypeScript
            </p>
            <p className="sub-line text-[var(--text)]/60 text-xs md:text-sm leading-relaxed">
              <span className="text-[var(--pink)]">▍</span> Construyo aplicaciones web cliente–servidor end-to-end.
            </p>
            <p className="sub-line text-[var(--text)]/60 text-xs md:text-sm leading-relaxed">
              <span className="text-[var(--pink)]">▍</span> Basado en <span className="text-[var(--text)]">Argentina</span> — disponible remoto.
            </p>
          </div>

          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-start gap-6">
            <a
              href="#projects"
              className="group flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase border border-[var(--pink)] px-6 py-4 hover:bg-[var(--pink)] hover:text-[var(--dark)] transition-all"
              style={{ boxShadow: "0 0 24px rgba(255,45,120,0.3)" }}
            >
              <span>Ver_Proyectos</span>
              <span className="bounce-arrow">↓</span>
            </a>
            <a href="#contact" className="text-[11px] tracking-[0.4em] uppercase text-[var(--text)]/70 hover:text-[var(--cyan)] py-4 border-b border-transparent hover:border-[var(--cyan)] transition-all">
              Enviar_Mensaje →
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
function AboutSection() {
  const skills = [
    "React", "TypeScript", "Next.js", "JavaScript", "Tailwind",
    "Node.js", "Express", "REST APIs", ".NET", "C#", "Java",
    "PostgreSQL", "Prisma ORM", "MongoDB", "SQL Server",
    "Docker", "Git", "Cypress", "Scrum", "Kanban"
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
        <div className="section-tag mb-8">01 // Sobre_El_Operador</div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="about-content md:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8">
              Construyo <span className="neon-pink">software</span><br/>
              que <span className="neon-cyan">funciona.</span>
            </h2>
            <div className="space-y-5 text-[var(--text)]/75 text-sm md:text-base leading-relaxed max-w-xl">
              <p>
                Soy <span className="text-[var(--cyan)]">Desarrollador Full Stack</span> con experiencia en aplicaciones web cliente–servidor, integración de APIs REST, manejo de bases de datos y testing automatizado.
              </p>
              <p>
                Trabajo con <span className="text-[var(--text)]">React, TypeScript, Node.js, Express y PostgreSQL</span>, bajo metodologías ágiles (Scrum / Kanban). Uso herramientas de IA para optimizar el flujo de desarrollo y entregar más rápido sin sacrificar calidad.
              </p>
              <p className="text-[var(--text)]/55 text-xs tracking-wider border-l border-[var(--pink)]/40 pl-4">
                "Código limpio, features end-to-end, sin vueltas."
              </p>
            </div>

            <div className="stats-row mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-pink">03+</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">Años Activo</div>
              </div>
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-cyan">E2E</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">Front + Back</div>
              </div>
              <div className="stat-block">
                <div className="font-display text-4xl md:text-5xl neon-pink">∞</div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--text)]/50 mt-1 uppercase">Commits</div>
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
                <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)]">PERFIL.OPERADOR</div>
                <div className="text-[10px] tracking-[0.3em] text-[var(--pink)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  DISPONIBLE
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  ["NOMBRE", "Walter I. Neira A."],
                  ["ROL", "Full Stack Developer"],
                  ["BASE", "Argentina ⇄ Remoto"],
                  ["STACK", "React · Node · TS"],
                  ["IDIOMAS", "ES nativo · EN A2"],
                  ["EMPRESA", "ForIT Software Factory"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-dashed border-[var(--text)]/10 pb-2">
                    <span className="text-[var(--text)]/40 tracking-widest">{k}</span>
                    <span className="text-[var(--text)]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--text)]/10">
                <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-3">MATRIZ.HABILIDADES</div>
                {[
                  ["Frontend / React", 92],
                  ["Backend / Node", 85],
                  ["Bases de Datos", 82],
                  ["Testing / Cypress", 78],
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
              <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-4">REGISTRO.TRAYECTORIA</div>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--pink)] flex-shrink-0 mt-1" style={{ boxShadow: "0 0 8px var(--pink)" }}></div>
                  <div>
                    <div className="text-[var(--text)]">Full Stack Developer · ForIT</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">2026 — Actualidad</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--cyan)] flex-shrink-0 mt-1" style={{ boxShadow: "0 0 8px var(--cyan)" }}></div>
                  <div>
                    <div className="text-[var(--text)]">Frontend Developer · Evirtual S.A.</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">2024 — 2025</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 bg-[var(--text)]/30 flex-shrink-0 mt-1"></div>
                  <div>
                    <div className="text-[var(--text)]/80">Dev & Técnico IT · Freelance</div>
                    <div className="text-[var(--text)]/40 text-[10px] tracking-wider mt-0.5">2023 — Actualidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className="mt-20">
          <div className="section-tag mb-6">Arsenal_Técnico</div>
          <div className="skills-grid flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="skill-badge hover-target">{s}</span>
            ))}
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
];

function ProjectsSection({ projects }) {
  const cardsRef = useRef([]);
  cardsRef.current = [];

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
    <section id="projects" className="projects relative py-32 px-6 md:px-12 bg-[var(--dark)] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="projects-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">02 // Experiencia</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              <span className="neon-pink">Stack</span> /<br/>
              <span className="text-[var(--text)]">Trabajos Recientes.</span>
            </h2>
          </div>          <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
            <div className="text-[var(--cyan)] mb-2">// 03 PROYECTOS DESTACADOS</div>
            Selección de roles y trabajos clave. Detalles completos disponibles a pedido.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <article
              key={p.n}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              className="project-card hover-target p-6 md:p-7 flex flex-col group"
              style={{ minHeight: "440px" }}
            >
              <div className="relative h-44 mb-6 overflow-hidden" style={{ background: p.hue }}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)"
                }}></div>
                <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-white/20 group-hover:text-white/40 transition-colors">
                  {p.n}
                </div>
                <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] text-white/80">{p.tag}</div>
                <div className="absolute bottom-3 right-3 text-[10px] tracking-[0.3em] text-white/80">▮▮▮▯▯</div>
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
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[var(--text)]/70 group-hover:text-[var(--cyan)] transition-colors">
                    <span>Ver Demo</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </a>
                ) : (
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text)]/25">Próximamente</span>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text)]/40 hover:text-[var(--cyan)] transition-colors" title="Ver repositorio">
                    <Icon name="github" size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://github.com/ivanneira2015-hash" target="_blank" rel="noopener" className="inline-block text-[11px] tracking-[0.4em] uppercase border-b border-[var(--pink)] pb-1 text-[var(--text)]/80 hover:text-[var(--pink)] transition-colors">
            Ver GitHub_Completo →
          </a>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BUILD / SOBRE NIVARO — Stack del sitio + explicación de marca
// ────────────────────────────────────────────────────────────────────────────
function BuildSection() {
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
    { name: "React 18", role: "UI / Componentes", icon: "react", color: "var(--cyan)" },
    { name: "GSAP + ScrollTrigger", role: "Animaciones", icon: "gsap", color: "var(--pink)" },
    { name: "Tailwind CSS", role: "Estilos utility-first", icon: "tailwind", color: "var(--cyan)" },
    { name: "JavaScript ES2024", role: "Lógica & estado", icon: "code", color: "var(--pink)" },
    { name: "Google Fonts", role: "Bebas Neue · JetBrains Mono", icon: "google", color: "var(--cyan)" },
    { name: "SVG + CSS Vars", role: "Iconos & paleta", icon: "sparkle", color: "var(--pink)" },
  ];

  return (
    <section id="build" className="relative py-32 px-6 md:px-12 bg-[var(--dark)] overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        background: "radial-gradient(circle at 70% 50%, rgba(255,45,120,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,229,255,0.1) 0%, transparent 50%)"
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="build-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">03 // Bajo_El_Capó</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              <span className="neon-cyan">Cómo</span> está<br/>
              <span className="text-[var(--text)]">construido este sitio.</span>
            </h2>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 max-w-xs">
            <div className="text-[var(--pink)] mb-2">// FULL_DISCLOSURE</div>
            Transparencia total: el mismo stack que uso para mis clientes. Sin frameworks ocultos.
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Marca / NIVARO */}
          <div className="build-brand md:col-span-5 relative border border-[var(--cyan)]/30 bg-[var(--surface)]/60 p-7 backdrop-blur-sm">
            <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[var(--pink)]"></span>
            <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[var(--pink)]"></span>

            <div className="text-[10px] tracking-[0.3em] text-[var(--pink)] mb-4">/MARCA.PERSONAL</div>

            <div className="font-display text-6xl md:text-7xl leading-none mb-2 neon-pink tracking-wider">
              NIVARO
            </div>
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-6 pl-1">
              ◢ WALTER · NEIRA
            </div>

            <p className="text-sm text-[var(--text)]/75 leading-relaxed mb-4">
              <span className="text-[var(--cyan)]">Nivaro</span> es mi marca personal como desarrollador.
              Es donde firmo cada proyecto, cada commit, cada interfaz que sale al mundo.
            </p>
            <p className="text-xs text-[var(--text)]/55 leading-relaxed mb-6">
              Una identidad propia para distinguir mi trabajo independiente: software bien hecho, código limpio, y entrega end-to-end.
            </p>

            <div className="grid grid-cols-2 gap-3 text-[10px] tracking-[0.25em]">
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">SIGNIFICA</div>
                <div className="text-[var(--text)]">Identidad de Dev</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">DESDE</div>
                <div className="text-[var(--text)]">2024</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">SECTOR</div>
                <div className="text-[var(--text)]">Software / IT</div>
              </div>
              <div className="border border-[var(--text)]/10 p-3">
                <div className="text-[var(--text)]/40 mb-1">ESTADO</div>
                <div className="text-[var(--pink)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse"></span>
                  Activo
                </div>
              </div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-[0.3em] text-[var(--cyan)] mb-5">/STACK.DEL.SITIO</div>

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
              <div className="text-[var(--cyan)] mb-2">/ NOTA_TÉCNICA</div>
              <p>
                Una sola página, React 18 con hooks, animaciones orquestadas con GSAP Timeline + ScrollTrigger.
                Sin librerías de UI prefabricadas — cada componente está hecho a mano.
              </p>
            </div>
          </div>
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

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", project: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
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
    setFormError("");
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
      setFormError("◢ Error al enviar. Intentá de nuevo o escribime directo a ivanneira2015@gmail.com");
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
          <div className="section-tag mb-6">04 // Canal_Abierto</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8">
            Hablemos del <span className="neon-pink">próximo</span><br/>
            <span className="neon-cyan glitch" data-text="proyecto.">proyecto.</span>
          </h2>
          <p className="text-[var(--text)]/70 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            ¿Tenés un proyecto, una idea, o necesitás un dev full stack que entregue?
            Mandame un mensaje. Respondo todos los emails en menos de <span className="text-[var(--cyan)]">24h</span>.
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
            <a href="#" className="flex items-center gap-4 group hover-target">
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
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ NOMBRE *</label>
                <input
                  className="cyber-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ EMAIL *</label>
                <input
                  type="email"
                  className="cyber-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="vos@empresa.com"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ TIPO_DE_PROYECTO</label>
                <select
                  className="cyber-input"
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  style={{ appearance: "none", backgroundImage: "linear-gradient(45deg, transparent 50%, #00E5FF 50%), linear-gradient(135deg, #00E5FF 50%, transparent 50%)", backgroundPosition: "calc(100% - 18px) 50%, calc(100% - 12px) 50%", backgroundSize: "6px 6px, 6px 6px", backgroundRepeat: "no-repeat" }}
                >
                  <option value="">— Seleccionar tipo —</option>
                  <option>Web / Landing</option>
                  <option>App / Plataforma</option>
                  <option>API / Backend</option>
                  <option>Full Stack End-to-End</option>
                  <option>Consultoría / IT</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] text-[var(--text)]/50 mb-2 block">/ MENSAJE *</label>
                <textarea
                  className="cyber-input"
                  rows="4"
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder="Contame qué tenés en mente..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sent || sending}
                className="pulse-btn hover-target relative w-full mt-2 py-4 bg-[var(--pink)] text-[var(--dark)] font-display text-xl tracking-[0.3em] hover:bg-[var(--cyan)] transition-colors disabled:opacity-80 disabled:cursor-default"
                style={{ background: sent ? "var(--cyan)" : sending ? "rgba(255,45,120,0.6)" : undefined }}
              >
                {sent ? (
                  <span className="success-glow inline-flex items-center gap-3">✓ MENSAJE_ENVIADO</span>
                ) : sending ? (
                  <span className="inline-flex items-center gap-3">ENVIANDO...</span>
                ) : (
                  <span>ENVIAR ⌁</span>
                )}
              </button>

              {formError && (
                <div className="text-[10px] text-[var(--pink)] tracking-wider pt-2 text-center">{formError}</div>
              )}

              <div className="text-[9px] tracking-[0.3em] text-[var(--text)]/30 text-center pt-2">
                ◢ RESPUESTA EN &lt; 24H · SIN SPAM
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
        <div>HECHO CON CÓDIGO · ARGENTINA_2026</div>
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

function AdminPanel({ projects, setProjects, onClose }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "true");
  const [loginUser, setLoginUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [editing, setEditing] = useState(null); // index | "new" | null
  const [draft, setDraft] = useState(null);
  const [toast, setToast] = useState("");
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

      <div className="px-5 py-4 flex items-center gap-2 border-b border-[var(--text)]/10">
        <button onClick={startNew} className="hover-target flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--pink)] text-[var(--dark)] font-display tracking-widest text-sm hover:bg-[var(--cyan)] transition-colors">
          <Icon name="plus" size={16} />
          NUEVO
        </button>
        <button onClick={exportJSON} title="Exportar JSON" className="hover-target w-10 h-10 border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/70 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors">
          <Icon name="download" size={16} />
        </button>
        <button onClick={resetDefaults} title="Restaurar defaults" className="hover-target w-10 h-10 border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/70 hover:border-[var(--pink)] hover:text-[var(--pink)] transition-colors">
          <Icon name="reset" size={16} />
        </button>
      </div>

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
  const [adminOpen, setAdminOpen] = useState(false);
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }
    return DEFAULT_PROJECTS;
  });

  return (
    <div className="relative bg-[var(--dark)] text-[var(--text)]">
      <Cursor />
      <Nav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <BuildSection />
      <ContactSection />
      {!adminOpen && <AdminButton onClick={() => setAdminOpen(true)} isOpen={false} />}
      {adminOpen && (
        <AdminPanel
          projects={projects}
          setProjects={setProjects}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
