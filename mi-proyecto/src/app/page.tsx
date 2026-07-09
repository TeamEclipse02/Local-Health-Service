'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "@/app/globals.css";

const carruselImagenes = [
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    alt: "Médicos expertos - Original"
  },
  {
    src: "https://apotheka.com/wp-content/uploads/2022/05/logos-de-farmacias-modernas.jpg",
    alt: "Logos de farmacias modernas"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7z7pjmWtbWvaGFwRNOHwzR8u6pXD-JP4J3CbJqxm5NaoFeLDbYDVLBi28&s=10",
    alt: "Referencia logo farmacia"
  },
  {
    src: "https://extendeal.com/hubfs/Foto-28MAY-01.png",
    alt: "Foto Extendeal"
  }
];

export default function Home(): React.JSX.Element {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const linkStyle = (path: string) => {
    const isActive = pathname === path;
    return {
      color: "#ffffff",
      textDecoration: "none",
      borderBottom: isActive ? "2px solid #ffffff" : "2px solid transparent",
      paddingBottom: "4px",
      opacity: isActive ? 1 : 0.85,
      transition: "opacity 0.2s, border-color 0.2s, transform 0.2s ease",
      fontWeight: isActive ? "600" : "500",
      display: "inline-block"
    };
  };

  useEffect(() => {
    const triggerAnimation = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === carruselImagenes.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(triggerAnimation);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans transition-colors duration-200">
      
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
        .btn-hero-action {
          background-color: #1F91DC;
          color: white;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(31, 145, 220, 0.3);
        }

        .carrusel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #CBD5E1;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 0;
        }
        .carrusel-dot.active {
          background-color: #1F91DC;
          transform: scale(1.3);
          width: 20px;
          border-radius: 4px;
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            width: "40px", height: "40px", backgroundColor: "#ffffff", borderRadius: "50%", 
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" 
          }}>
            <img src="https://imgur.com/3bgPkrk.jpg" alt="Logo Oficial" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontWeight: "600", fontSize: "18px", letterSpacing: "0.5px" }}>Local Health Service</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px" }}>
          <Link href="/" style={linkStyle("/")}>INICIO</Link>
          <Link href="/medicamentos" style={linkStyle("/medicamentos")}>MEDICAMENTOS</Link>
          <Link href="/servicios" style={linkStyle("/servicios")}>SERVICIOS DE SALUD</Link>
        </div>
      </nav>

      {/* ─── CONTENEDOR PRINCIPAL (Hero Section) ─── */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="container-hero hero-card p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
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

            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <Link href="/vip" className="btn-hero-action inline-block">
                Más información
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="w-full max-w-[500px] h-[350px] mx-auto rounded-[24px] overflow-hidden bg-slate-100 relative shadow-md">
            <img 
              src={carruselImagenes[currentSlide].src} 
              alt={carruselImagenes[currentSlide].alt}
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
                isAnimating ? 'opacity-40 scale-98 blur-xs' : 'opacity-100 scale-100 blur-none'
              }`}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10 bg-white/70 px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
              {carruselImagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsAnimating(false);
                    }, 200);
                  }}
                  className={`carrusel-dot ${currentSlide === index ? 'active' : ''}`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200/80 p-4 text-center text-xs text-slate-400 font-medium mt-auto">
        &copy; {new Date().getFullYear()} Local Health Service. Todos los derechos reservados.
      </footer>

    </div>
  );
}