"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; 
import { createClient } from '@supabase/supabase-js';
 
// Credenciales oficiales de tu proyecto de Supabase
const supabaseUrl = "https://ajokwbvxdesbpoxlzguv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqb2t3YnZ4ZGVzYnBveGx6Z3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDMzMzUsImV4cCI6MjA5NzExOTMzNX0.rG_TnKYDuypyQP8FITmzKXLw35Iw9EtU1JjvTOSDvdk";
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
export default function MedicamentosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [soloStock, setSoloStock] = useState(false);
  
  // Estado para el filtro de precio máximo
  const [precioMaximo, setPrecioMaximo] = useState<number>(20);
  // Estado para saber cuál es el medicamento más caro en la base de datos
  const [limitePrecioSugerido, setLimitePrecioSugerido] = useState<number>(20);
 
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorBD, setErrorBD] = useState<string | null>(null);
 
  // ─── TRAER LOS DATOS DESDE SUPABASE ───
  useEffect(() => {
    async function obtenerMedicamentos() {
      try {
        setCargando(true);
        setErrorBD(null);
       
        const { data, error } = await supabase
          .from('medicamentos')
          .select('nombre, existencia, informacion, precio, Imagen'); 
 
        if (error) throw error;
 
        const listaMedicamentos = data || [];
        setMedicamentos(listaMedicamentos);

        // Calcular dinámicamente cuál es el precio más alto de la lista
        if (listaMedicamentos.length > 0) {
          const precios = listaMedicamentos.map(m => Number(m.precio || 0));
          const maximoEncontrado = Math.max(...precios);
          const limiteSugerido = Math.ceil(maximoEncontrado);
          setLimitePrecioSugerido(limiteSugerido);
          setPrecioMaximo(limiteSugerido); 
        }

      } catch (err: any) {
        console.error("Error capturado:", err);
        setErrorBD(err.message || "No se pudo conectar a la base de datos");
      } finally {
        setCargando(false);
      }
    }
 
    obtenerMedicamentos();
  }, []);
 
  // ─── LÓGICA FILTRADO DE BÚSQUEDA, STOCK Y PRECIO ───
  const medicamentosFiltrados = medicamentos.filter((med) => {
    const coincideBusqueda = med.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase());
 
    const coincideStock = !soloStock || (med.existencia && med.existencia > 0);

    const precioMed = Number(med.precio || 0);
    const coincidePrecio = precioMed <= precioMaximo;
 
    return coincideBusqueda && coincideStock && coincidePrecio;
  });
 
  return (
    <div
      style={{
        backgroundColor: "#F4F6F9",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        color: "#1e293b",
      }}
    >
      {/* ─── BARRA DE NAVEGACIÓN SUPERIOR ─── */}
      <nav
        style={{
          backgroundColor: "#2172BE",
          color: "#ffffff",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="https://imgur.com/3bgPkrk.jpg"
              alt="Logo Oficial"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontWeight: "600", fontSize: "18px", letterSpacing: "0.5px" }}>
            Local Health Service
          </span>
        </div>
 
        {/* BUSCADOR */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            maxWidth: "400px",
            background: "#ffffff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            border: "1px solid #E2E8F0"
          }}
        >
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar medicamento..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "10px",
              borderRadius: "8px",
              color: "#1e293b",
              backgroundColor: "#ffffff"
            }}
          />
          <span style={{ color: "#2172BE" }}>🔍</span>
        </div>
 
        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px", fontWeight: "500" }}>
          <Link href="/" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>INICIO</Link>
          <Link href="/medicamentos" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "2px solid #ffffff", paddingBottom: "4px" }}>MEDICAMENTOS</Link>
          <Link href="/servicios" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>SERVICIOS DE SALUD</Link>
        </div>
      </nav>
 
      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <div style={{ padding: "0 32px 32px 32px" }}>
       
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "800" }}>Inventario de Medicamentos</h1>
          <p style={{ margin: "5px 0 0 0", color: "#2172BE", fontWeight: "600", letterSpacing: "1px" }}>
            GESTIÓN PROFESIONAL DE SUMINISTROS
          </p>
        </div>
 
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) 3fr", gap: "25px" }}>
         
          {/* BARRA LATERAL (FILTROS) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Link 
              href="/scaner"
              style={{ 
                backgroundColor: "#2172BE", 
                color: "#fff", 
                border: "none", 
                padding: "14px 20px", 
                borderRadius: "12px", 
                fontWeight: "700", 
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 6px -1px rgba(33, 114, 190, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                textDecoration: "none"
              }}
            >
              📷 Escanear Receta
            </Link>
 
            <aside style={{ background: "#fff", padding: "20px", borderRadius: "12px", height: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>Filtros</h3>
              
              {/* FILTRO DE PRECIO (SLIDER) */}
              <div style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontWeight: "600", fontSize: "14px", color: "#475569" }}>Precio Máximo</span>
                  <span style={{ backgroundColor: "#E0F2FE", color: "#0369A1", fontWeight: "700", fontSize: "13px", padding: "2px 8px", borderRadius: "6px" }}>
                    ${precioMaximo.toFixed(2)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={limitePrecioSugerido} 
                  step="0.10"
                  value={precioMaximo}
                  onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                  style={{ 
                    width: "100%", 
                    accentColor: "#2172BE", 
                    cursor: "pointer" 
                  }} 
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  <span>$0.00</span>
                  <span>MÁX: ${limitePrecioSugerido.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <p style={{ fontWeight: "600", margin: "0 0 8px 0", fontSize: "14px", color: "#475569" }}>Disponibilidad</p>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                  <input type="checkbox" checked={soloStock} onChange={(e) => setSoloStock(e.target.checked)} style={{ accentColor: "#2172BE" }} /> 
                  Mostrar solo disponibles
                </label>
              </div>
            </aside>
          </div>
 
          {/* LISTADO DINÁMICO */}
          <main>
            {cargando ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#2172BE", fontWeight: "bold" }}>
                Cargando medicamentos desde la base de datos...
              </div>
            ) : errorBD ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#ef4444", background: "#fef2f2", borderRadius: "12px" }}>
                ⚠️ Error al conectar con Supabase: {errorBD}
              </div>
            ) : medicamentosFiltrados.length === 0 ? (
              <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", textAlign: "center", color: "#666" }}>
                Ningún medicamento coincide con los filtros aplicados.
              </div>
            ) : (
              medicamentosFiltrados.map((med, index) => {
                const tieneStock = med.existencia && med.existencia > 0;

                return (
                  <div key={index} style={{ background: "#fff", borderRadius: "14px", padding: "20px", marginBottom: "20px", display: "grid", gridTemplateColumns: med.Imagen ? "120px 1fr" : "1fr", gap: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    {med.Imagen && (
                      <img src={med.Imagen} alt={med.nombre} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
                    )}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                        <div>
                          <h3 style={{ margin: "0 0 5px 0", color: "#2172BE" }}>{med.nombre}</h3>
                          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{med.informacion}</p>
                        </div>
                        <div style={{ color: "#2172BE", fontWeight: "700", fontSize: "18px" }}>
                          {med.precio ? `$${Number(med.precio).toFixed(2)}` : "$0.00"}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "10px", marginTop: "12px", alignItems: "center" }}>
                        <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", background: tieneStock ? "#DCFCE7" : "#FEE2E2", color: tieneStock ? "#166534" : "#991B1B", fontWeight: "600", fontSize: "12px" }}>
                          {tieneStock ? "En Stock" : "Agotado"}
                        </div>
                        <span style={{ fontSize: "13px", color: "#64748B" }}>
                          ({med.existencia || 0} unidades disponibles)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>
    </div>
  );
}