import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-text-main font-display font-bold text-lg">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            TERRA <span className="text-primary">FITNESS VAL</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-text-secondary hover:text-text-main text-sm font-medium transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/register" className="bg-primary text-bg px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-glow">
              Crear cuenta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Gimnasio premium en Adrogué
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main leading-tight mb-6">
            Transformá tu cuerpo.<br />
            <span className="text-primary">Elevá tu nivel.</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Entrenamiento personalizado, musculación de élite y clases funcionales 
            en el corazón de Adrogué. Resultados reales, sin excusas.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register" className="bg-primary text-bg px-8 py-4 rounded-full font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-glow inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar clase gratis
            </Link>
            <Link href="/login" className="border-[1.5px] border-border text-text-main px-8 py-4 rounded-full font-semibold hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Acceder a mi cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-bg-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">Servicios</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-main mt-3">
              Entrenamiento para cada <span className="text-accent">nivel</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title: 'Personalizado', desc: 'Rutinas diseñadas a medida para tus objetivos' },
              { icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', title: 'Funcional', desc: 'Entrenamiento de alta intensidad en grupo' },
              { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'Musculación', desc: 'Máquinas de última generación y pesos libres' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Alto Rendimiento', desc: 'Planificación periodizada y métricas avanzadas' },
            ].map((feature, i) => (
              <div key={i} className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-hover hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-surface flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-text-main mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">Planes</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-main mt-3">
              Elegí tu <span className="text-primary">plan</span>
            </h2>
            <p className="text-text-secondary mt-3 max-w-lg mx-auto">
              Precios transparentes, sin contratos de por vida. Cancelás cuando querés.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Básico', price: '$25.000', period: '/mes', features: ['Acceso a sala de musculación', 'Horario limitado (7-14h)', 'Vestuarios y duchas', 'App de seguimiento'], featured: false },
              { name: 'Premium', price: '$35.000', period: '/mes', features: ['Acceso ilimitado 7-22h', 'Todas las clases grupales', '1 sesión personal/mes', 'Vestuarios premium', 'App de seguimiento', 'Nutrición básica'], featured: true },
              { name: 'Elite', price: '$55.000', period: '/mes', features: ['Acceso 24/7 con llave', 'Entrenador personal (4x/mes)', 'Plan de nutrición completo', 'Clases exclusivas', 'Vestuarios VIP', 'Prioridad en reservas'], featured: false },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-bg-card border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${plan.featured ? 'border-primary scale-[1.02]' : 'border-border hover:border-border-hover'}`}>
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-bg text-xs font-bold px-3 py-1 rounded-bl-xl">
                    MÁS POPULAR
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-text-main mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-primary">{plan.price}</span>
                  <span className="text-text-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 ${plan.featured ? 'bg-primary text-bg hover:bg-primary-light hover:shadow-glow' : 'border-[1.5px] border-border text-text-main hover:border-primary hover:text-primary'}`}>
                  Elegir plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-bg-elevated">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-main mb-4">
            El único límite<br /><span className="text-primary">sos vos</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Dejá de decir "mañana empiezo". Vení hoy. Creá tu cuenta y empezá tu transformación.
          </p>
          <Link href="/register" className="bg-primary text-bg px-8 py-4 rounded-full font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-glow inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-text-main font-display font-bold">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            TERRA <span className="text-primary">FITNESS VAL</span>
          </div>
          <p className="text-text-muted text-sm">
            © 2026 Terra Fitness Val. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-text-secondary hover:text-primary text-sm transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/register" className="text-text-secondary hover:text-primary text-sm transition-colors">
              Registrarse
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
