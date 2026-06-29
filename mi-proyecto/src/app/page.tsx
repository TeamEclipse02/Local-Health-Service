'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "@/app/globals.css";

export default function Home(): React.JSX.Element {
  const pathname = usePathname();

  // Estilos de la barra de navegación idénticos a las demás vistas
  const linkStyle = (path: string) => {
    const isActive = pathname === path;
    return {
      color: "#ffffff",
      textDecoration: "none",
      borderBottom: isActive ? "2px solid #ffffff" : "2px solid transparent",
      paddingBottom: "4px",
      opacity: isActive ? 1 : 0.85,
      transition: "opacity 0.2s, border-color 0.2s",
      fontWeight: isActive ? "600" : "500"
    };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans transition-colors duration-200">
      
      {/* Estilos CSS Embebidos */}
      <style dangerouslySetInnerHTML={{ __html: `
        .container-hero {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        }
        /* Botones de acción idénticos */
        .btn-hero-action {
          background-color: #1F91DC;
          color: white;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 12px;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(31, 145, 220, 0.3);
        }
        .btn-hero-action:hover {
          background-color: #2172BE;
          transform: translateY(-1px);
        }
      `}} />

      {/* ─── BARRA DE NAVEGACIÓN INSTITUCIONAL ─── */}
      <nav style={{
        backgroundColor: "#2172BE",
        color: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        width: "100%",
        boxSizing: "border-box",
        zIndex: 50
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
        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px" }}>
          <Link href="/" style={linkStyle("/")}>INICIO</Link>
          <Link href="/medicamentos" style={linkStyle("/medicamentos")}>MEDICAMENTOS</Link>
          <Link href="/servicios" style={linkStyle("/servicios")}>SERVICIOS DE SALUD</Link>
        </div>
      </nav>

      {/* ─── CONTENEDOR PRINCIPAL (Hero Section) ─── */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="container-hero hero-card p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA: Textos y Acciones Completamente Centrados */}
          <div className="flex flex-col items-center text-center space-y-6 w-full justify-center">
            <div className="space-y-3">
              <h1 className="text-[#1F91DC] text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Tu Salud, Guiada
              </h1>
              <h2 className="text-[#2172BE] text-3xl md:text-4xl font-bold tracking-tight">
                Por expertos
              </h2>
            </div>
            
            <p className="text-slate-500 text-base md:text-lg font-medium max-w-lg leading-relaxed">
              Conéctese con la farmacia local para obtener disponibilidad inmediata de medicamentos y cotizaciones inteligentes transparentes.
            </p>

            {/* Botones de Acción Centrados */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <Link href="/secion" className="btn-hero-action inline-block">
                Inscribirse
              </Link>
              
              <Link href="/vip" className="btn-hero-action inline-block">
                Más información
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen Estilizada Limpia */}
          <div className="relative w-full h-full min-h-[320px] bg-[#76B3DB]/20 rounded-[32px] p-4 flex items-center justify-center overflow-hidden group border border-slate-200/60">
            <div className="relative w-full h-full bg-slate-100 rounded-[24px] overflow-hidden shadow-sm flex items-center justify-center min-h-[290px]">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                alt="Médicos expertos"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </main>

      {/* ─── PIE DE PÁGINA ─── */}
      <footer className="bg-white border-t border-slate-200/80 p-4 text-center text-xs text-slate-400 font-medium mt-auto">
        &copy; {new Date().getFullYear()} Local Health Service. Todos los derechos reservados.
      </footer>

    </div>
  );
}