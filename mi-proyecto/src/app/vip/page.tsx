'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

export default function RegistroAnuncio(): React.JSX.Element {
  const pathname = usePathname();

  // Estados del Formulario
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [tituloOferta, setTituloOferta] = useState("");
  const [descuento, setDescuento] = useState("20% de descuento");
  const [descripcion, setDescripcion] = useState("");
  const [precioOriginal, setPrecioOriginal] = useState("");
  const [precioDescuento, setPrecioDescuento] = useState("");
  const [enlaceWeb, setEnlaceWeb] = useState("");

  // Estilos de la barra de navegación idénticos con transform incluido
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

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Anuncio enviado correctamente para revisión! ✔");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc] text-slate-800 transition-colors duration-200">
      
      {/* Estilos CSS Embebidos */}
      <style dangerouslySetInnerHTML={{ __html: `
        .container-panel {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
        }
        .preview-card {
          background: #eef2f6;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 24px;
        }
        .input-label {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 6px;
          display: block;
        }
        .input-label .required {
          color: #ef4444;
          margin-left: 2px;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background-color: #fff;
          color: #000;
          font-size: 14px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: #2172BE;
          box-shadow: 0 0 0 3px rgba(33, 114, 190, 0.15);
        }
        .btn-primary {
          background-color: #2172BE;
          color: white;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s ease;
        }
        .btn-primary:hover {
          background-color: #1F91DC;
        }
        .btn-secondary {
          background-color: transparent;
          color: #2172BE;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid #2172BE;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s ease;
        }
        .btn-secondary:hover {
          background-color: rgba(33, 114, 190, 0.05);
        }
        .banner-preview-box {
          background: linear-gradient(135deg, #1e40af 0%, #2172BE 100%);
          border-radius: 8px;
          color: white;
          position: relative;
          overflow: hidden;
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

        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px" }}>
          <Link href="/" style={linkStyle("/")}>INICIO</Link>
          <Link href="/medicamentos" style={linkStyle("/medicamentos")}>MEDICAMENTOS</Link>
          <Link href="/servicios" style={linkStyle("/servicios")}>SERVICIOS DE SALUD</Link>
        </div>
      </nav>

      {/* ─── ENCABEZADO CON GANCHO DE MARKETING ─── */}
      <div className="container-panel px-6 pt-10 pb-4">
        <h1 className="text-3xl font-extrabold text-[#1e293b] tracking-tight">
          ¿Te interesa anunciarte con nosotros?
        </h1>
        <p className="text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          Al completar la información de tu negocio, entrarás de inmediato a un ecosistema exclusivo de usuarios activos que verán tus promociones en tiempo real. ¡Impulsa tus ventas y conecta con la comunidad local hoy mismo!
        </p>
      </div>

      {/* ─── CONTENIDO DOBLE COLUMNA ─── */}
      <main className="container-panel px-6 pb-12 flex flex-col lg:flex-row gap-6">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="flex-1 form-card space-y-6">
          <div className="flex items-center gap-2 text-[#2172BE] border-b border-slate-100 pb-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h2 className="font-semibold text-base">Crea tu campaña publicitaria</h2>
          </div>

          <form onSubmit={manejarEnvio} className="space-y-4">
            <div>
              <label className="input-label">Nombre de tu negocio <span className="required">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. FarmaPlus"
                value={nombreNegocio}
                onChange={(e) => setNombreNegocio(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Título de la oferta <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej. 20% de descuento en vitaminas"
                  value={tituloOferta}
                  onChange={(e) => setTituloOferta(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="input-label">Descuento / Oferta <span className="required">*</span></label>
                <select
                  className="form-input"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                >
                  <option value="20% de descuento">20% de descuento</option>
                  <option value="30% de descuento">30% de descuento</option>
                  <option value="50% de descuento">50% de descuento</option>
                  <option value="2x1">Promoción 2x1</option>
                </select>
              </div>
            </div>

            <div>
              <label className="input-label">Descripción de la oferta <span className="required">*</span></label>
              <textarea
                rows={3}
                className="form-input resize-none"
                placeholder="Describe tu oferta, productos incluidos, condiciones, fechas, etc."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Precio original (opcional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="US$ 50.00"
                  value={precioOriginal}
                  onChange={(e) => setPrecioOriginal(e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Precio con descuento <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="US$ 40.00"
                  value={precioDescuento}
                  onChange={(e) => setPrecioDescuento(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Enlace a tu sitio web <span className="required">*</span></label>
              <div className="relative">
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://tusitio.com"
                  value={enlaceWeb}
                  onChange={(e) => setEnlaceWeb(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Imagen del banner <span className="required">*</span></label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <svg className="mx-auto h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="mt-2 text-xs text-slate-600 font-semibold text-[#2172BE]">Sube tu banner publicitario</p>
                <p className="text-[11px] text-slate-400 mt-1">Formato recomendado: 1200 x 600 px (JPG o PNG). Tamaño máximo: 2 MB</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary">Lanzar anuncio</button>
              <button type="button" className="btn-secondary">Guardar borrador</button>
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA & PLAN */}
        <div className="w-full lg:w-[420px] space-y-6">
          
          {/* SECCIÓN VISTA PREVIA */}
          <div className="preview-card space-y-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span>Vista previa en vivo</span>
            </div>

            {/* BANNER SIMULADO */}
            <div className="banner-preview-box p-4 h-[180px] flex justify-between items-center relative">
              <div className="space-y-2 z-10 max-w-[60%]">
                <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded font-bold">
                  {nombreNegocio || "FarmaPlus"}
                </span>
                <h3 className="text-xl font-extrabold leading-tight">
                  {descuento || "20% de descuento"}
                </h3>
                <p className="text-[11px] opacity-90 line-clamp-2">
                  {tituloOferta || "En productos seleccionados"}
                </p>
                <button className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 shadow-md">
                  Ver oferta &rarr;
                </button>
              </div>
              <div className="w-[35%] h-full relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80"
                  alt="Doctor"
                  className="rounded-lg object-cover h-[85%] w-full"
                />
              </div>
            </div>

            {/* CONTROL DE PAGINACIÓN SIMULADO */}
            <div className="flex justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2172BE]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            </div>
          </div>

          {/* SECCIÓN PLAN */}
          <div className="form-card space-y-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Tu plan activo: Básico</span>
            </div>

            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-[#2172BE] font-bold">✓</span> 1 banner publicitario en una sección secundaria.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2172BE] font-bold">✓</span> Rotación inteligente con otros anunciantes.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#2172BE] font-bold">✓</span> Enlace directo a tu e-commerce o sitio web.
              </li>
            </ul>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">Valor sugerido:</span>
              <span className="font-bold text-[#2172BE] text-sm">US$50–150/mes</span>
            </div>
          </div>

        </div>
      </main>

      {/* ─── PIE DE PÁGINA INFORMATIVO ─── */}
      <footer className="bg-white border-t border-slate-200 p-4 mt-auto text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <span className="inline-block bg-blue-100 text-[#2172BE] px-2 py-0.5 rounded-full font-bold">i</span>
        <span><strong>Consejo Pro:</strong> Las ofertas con más de un 20% de descuento captan hasta un 4x más de clientes potenciales.</span>
      </footer>

    </div>
  );
}