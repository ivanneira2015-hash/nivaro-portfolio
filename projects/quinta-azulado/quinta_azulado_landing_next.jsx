"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("aos").then((AOS) => AOS.init({ once: true }));
  }, []);

  return (
    <main className="bg-[#0B1B34] text-white font-sans scroll-smooth">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-[#0B1B34]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-xl font-bold text-blue-400">Quinta Azulado</div>
          <nav className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#servicios">Servicios</a>
            <a href="#galeria">Galería</a>
            <a href="#testimonios">Testimonios</a>
          </nav>
          <a href="https://wa.me/549XXXXXXXXXX" target="_blank" className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-xl font-semibold transition">
            Reservá Tu Fecha
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center relative bg-[url('/hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B34]/80 to-[#0B1B34]" />
        <div className="relative z-10 max-w-4xl px-6" data-aos="fade-up">
          <p className="text-sm mb-4 text-yellow-400">● El lugar más mágico de la zona</p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Viví un evento <span className="text-yellow-400">inolvidable</span><br /> en un lugar mágico
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Diversión, comodidad y momentos únicos para toda la familia.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/549XXXXXXXXXX" target="_blank" className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Reservar por WhatsApp →
            </a>
            <a href="#galeria" className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition">
              Ver Espacios
            </a>
          </div>

          <div className="flex justify-center gap-8 mt-10 text-sm text-gray-400">
            <span>★★★★★ 5.0 Reseñas</span>
            <span>+500 eventos</span>
            <span>100% recomendado</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section id="servicios" className="py-28 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Todo lo que necesitás para un <span className="text-blue-400">evento perfecto</span></h2>
        <p className="text-gray-400 mb-16">Entretenimiento, comodidad y diversión en un solo lugar</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Juegos para chicos", desc: "Plaza, inflables y diversión sin parar" },
            { title: "Pileta climatizada", desc: "Disponible todo el año" },
            { title: "DJ y pista de baile", desc: "Fiestas inolvidables" },
            { title: "Animación", desc: "Equipo profesional" },
            { title: "Eventos personalizados", desc: "A tu medida" },
            { title: "Ambiente seguro", desc: "Para toda la familia" }
          ].map((item, i) => (
            <div key={i} data-aos="zoom-in" className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:scale-105 hover:border-blue-400 transition-all">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-28 px-6 bg-[#F8FAFC] text-black">
        <h2 className="text-4xl font-bold text-center mb-4">Un lugar que enamora</h2>
        <p className="text-center text-gray-500 mb-12">Mirá cómo transformamos cada evento</p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["g1.jpg","g2.jpg","g3.jpg","g4.jpg","g5.jpg","g6.jpg"].map((img, i) => (
            <img key={i} src={`/${img}`} className="rounded-2xl shadow-lg hover:scale-105 transition" />
          ))}
        </div>
      </section>

      {/* DIFERENCIALES */}
      <section className="py-28 px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">No es solo un evento, es una <span className="text-yellow-400">experiencia</span></h2>

        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {[
            "Todo en un solo lugar",
            "Atención personalizada",
            "Ambiente seguro",
            "Diversión garantizada",
            "Experiencias que se repiten"
          ].map((text, i) => (
            <div key={i} data-aos="fade-up" className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</div>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-28 text-center bg-blue-600">
        <h2 className="text-4xl font-bold mb-6">Reservá tu fecha antes de que se agoten</h2>
        <a href="https://wa.me/549XXXXXXXXXX" target="_blank" className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition">
          Hablar por WhatsApp
        </a>
      </section>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/549XXXXXXXXXX" target="_blank" className="fixed bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
        💬
      </a>

      {/* FOOTER */}
      <footer className="py-12 text-center text-gray-400 border-t border-white/10">
        © 2026 Quinta Azulado - Todos los derechos reservados
      </footer>
    </main>
  );
}
