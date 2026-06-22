import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D0C4C4]/30 text-slate-800 flex flex-col font-sans">
      {/* 1. BARRA DE NAVEGACIÓN (Navbar) */}
      <nav className="bg-[#2172BE] text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* Logo e Identificador */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
            {/* Icono temporal circular médico */}
            <span className="text-[#2172BE] font-bold text-xl">🏥</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">Local Health Service</span>
        </div>

        {/* Menú de Enlaces */}
        <div className="flex items-center gap-8 font-medium text-sm">
          <a href="#" className="hover:text-[#76B3DB] transition-colors border-b-2 border-white pb-1">INICIO</a>
          <a href="#" className="hover:text-[#76B3DB] transition-colors pb-1">MEDICAMENTOS</a>
          <a href="#" className="hover:text-[#76B3DB] transition-colors pb-1">SERVICIOS DE SALUD</a>
        </div>
      </nav>

      {/* 2. CONTENEDOR PRINCIPAL (Hero Section) */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="bg-white rounded-[40px] shadow-xl max-w-5xl w-full p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[450px]">
          
          {/* COLUMNA IZQUIERDA: Textos y Acciones */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-[#1F91DC] text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Tu Salud, Guiada
              </h1>
              <h2 className="text-[#2172BE] text-3xl md:text-4xl font-bold tracking-tight">
                Por expertos
              </h2>
            </div>
            
            <p className="text-[#76B3DB] text-base md:text-lg font-medium max-w-md leading-relaxed">
              Conéctese con la farmacia local para obtener disponibilidad inmediata de medicamentos y cotizaciones inteligentes transparentes.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-[#1F91DC] hover:bg-[#2172BE] text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5">
                Inscribirse
              </button>
              <button className="border-2 border-[#1F91DC] text-[#1F91DC] hover:bg-[#1F91DC]/10 font-bold px-6 py-3 rounded-xl transition-all">
                Más información
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen y Banner Estilizado */}
          <div className="relative w-full h-full min-h-[280px] bg-[#76B3DB]/40 rounded-[32px] p-4 flex items-center justify-center overflow-hidden group">
            {/* Contenedor simulador de la foto del Figma */}
            <div className="relative w-full h-full bg-slate-200 rounded-[24px] overflow-hidden shadow-md flex items-center justify-center">
              {/* NOTA: Cuando tengas tu imagen real en /public, reemplaza esto por un tag <Image /> de Next.js */}
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                alt="Médicos expertos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Tarjeta flotante inferior estilo Figma */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg flex items-center gap-3 border border-slate-100">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-700">Fast Fulfillment</p>
                  <p className="text-[10px] text-slate-500 font-medium">Listo en 15 min</p>
                </div>
                {/* Flechas simuladas de carrusel */}
                <div className="flex gap-1 text-slate-400 text-xs font-bold">
                  <span className="cursor-pointer hover:text-slate-600 px-1">‹</span>
                  <span className="cursor-pointer hover:text-slate-600 px-1">›</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}