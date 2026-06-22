import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D0C4C4]/30 text-slate-800 flex flex-col font-sans">
      
      {/* ─── BARRA DE NAVEGACIÓN IDÉNTICA A LAS OTRAS PÁGINAS ─── */}
      <nav style={{
        backgroundColor: "#2172BE",
        color: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
      }}>
        {/* Logo e Identificador */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            backgroundColor: "#ffffff", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            overflow: "hidden" 
          }}>
            <img 
              src="https://imgur.com/3bgPkrk.jpg" 
              alt="Logo Oficial" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontWeight: "600", fontSize: "18px", letterSpacing: "0.5px" }}>Local Health Service</span>
        </div>

        {/* Menú de Enlaces */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px", fontWeight: "500" }}>
          <a href="/" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "2px solid #ffffff", paddingBottom: "4px" }}>INICIO</a>
          <a href="/medicamentos" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>MEDICAMENTOS</a>
          <a href="/servicios" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>SERVICIOS DE SALUD</a>
        </div>
      </nav>

      {/* ─── CONTENEDOR PRINCIPAL (Hero Section) ─── */}
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
            <div className="relative w-full h-full bg-slate-200 rounded-[24px] overflow-hidden shadow-md flex items-center justify-center">
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