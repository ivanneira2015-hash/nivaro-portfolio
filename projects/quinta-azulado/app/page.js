export default function Home() {
  return (
    <main className="bg-[#0B1B34] text-white min-h-screen">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="font-bold text-blue-400 text-xl">Quinta Azulado</h1>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
          Reservar
        </button>
      </header>

      {/* HERO */}
      <section className="text-center py-32 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Viví un evento <span className="text-yellow-400">inolvidable</span>
        </h2>
        <p className="text-gray-300 mb-8">
          Diversión, familia y momentos únicos
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl">
            Reservar ahora
          </button>
          <button className="border px-6 py-3 rounded-xl">
            Ver galería
          </button>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-24">
        {[
          "Juegos",
          "Pileta",
          "DJ",
          "Animación",
          "Eventos personalizados",
          "Ambiente familiar"
        ].map((item, i) => (
          <div key={i} className="border border-white/10 p-6 rounded-xl">
            {item}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center pb-24">
        <h3 className="text-3xl mb-6">Reservá tu fecha ahora</h3>
        <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl">
          WhatsApp
        </button>
      </section>

    </main>
  )
}
