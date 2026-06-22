"use client"; 

import { useEffect, useState } from "react";

// 1. BASE DE DATOS LOCAL UNIFICADA (Farmacias + Hospitales y Clínicas Reales de Santiago)
const UBICACIONES_SANTIAGO = [
  // Farmacias
  { id: 1, nombre: "Farmacias Arrocha Santiago", lat: 8.10587, lng: -80.97150, descripcion: "Cadena Comercial - Medicamentos y Variedades", telefono: "N/A" },
  { id: 2, nombre: "FarmaValue Santiago", lat: 8.09880, lng: -80.97810, descripcion: "Medicamentos de Descuento", telefono: "N/A" },
  { id: 3, nombre: "Farmacia El Javillo", lat: 8.10010, lng: -80.97740, descripcion: "Fórmulas y Medicamentos Especializados", telefono: "N/A" },
  { id: 4, nombre: "Farmacia Veraguas (Principal)", lat: 8.10120, lng: -80.97840, descripcion: "Atención Local Tradicional", telefono: "N/A" },
  { id: 5, nombre: "Farmacias Veraguas #4", lat: 8.10250, lng: -80.97480, descripcion: "Sucursal Comercial", telefono: "N/A" },
  { id: 6, nombre: "Farmacia Veraguas #5", lat: 8.11890, lng: -80.96320, descripcion: "Sucursal Sector Norte", telefono: "N/A" },
  { id: 7, nombre: "Farmacia Veraguas #3", lat: 8.10390, lng: -80.97010, descripcion: "Sucursal Comercial", telefono: "N/A" },
  { id: 8, nombre: "Farmacia Farmalam #2", lat: 8.09550, lng: -80.98310, descripcion: "Medicamentos Generales", telefono: "N/A" },
  { id: 9, nombre: "Farmacias Elysin Sucursal 6", lat: 8.09670, lng: -80.98040, descripcion: "Atención y Variedad", telefono: "N/A" },
  { id: 10, nombre: "Farmagift", lat: 8.09410, lng: -80.98590, descripcion: "Farmacia y Regalos", telefono: "N/A" },
  
  // Hospitales y Clínicas
  { id: 11, nombre: "Hospital Médica Norte Nuevo Santiago", lat: 8.1145, lng: -80.9620, telefono: "950-0047 / WhatsApp: 6633-1100", descripcion: "Ubicado en Nuevo Santiago, opera 24/7 y cuenta con tecnología, laboratorio y especialistas." },
  { id: 12, nombre: "Clínica Hospital San Juan de Dios", lat: 8.1005, lng: -80.9742, telefono: "998-5583", descripcion: "Ubicado en Calle Tercera (frente al Parque Juan Demóstenes Arosemena), ofrece atención 24 horas." },
  { id: 13, nombre: "Clínica Hospital Jesús Nazareno", lat: 8.1022, lng: -80.9675, telefono: "998-1581", descripcion: "Sobre la vía principal, opera 24 horas y cuenta con cuarto de urgencias y especialistas." },
  { id: 14, nombre: "Clínica Sur", lat: 8.0945, lng: -80.9730, telefono: "6947-7682", descripcion: "Ubicada en la Avenida Sur. Especializada en ginecología, pediatría, neonatología e infertilidad." },
  { id: 15, nombre: "Muelillo Specialized Medical Center", lat: 8.1012, lng: -80.9715, telefono: "998-1177", descripcion: "Centro especializado enfocado en dermatología y otras ramas médicas." },
  { id: 16, nombre: "MEDICALAB", lat: 8.1018, lng: -80.9750, telefono: "N/A", descripcion: "Ubicado en Calle 8a. Ofrece medicina general, laboratorio clínico y ultrasonidos." },
  { id: 17, nombre: "Policlínica Dr. Horacio Díaz Gómez (CSS)", lat: 8.0998, lng: -80.9701, telefono: "N/A", descripcion: "Centro institucional para asegurados." },
  { id: 18, nombre: "Hospital Regional Dr. Luis \"Chicho\" Fábrega", lat: 8.0833, lng: -80.9535, telefono: "N/A", descripcion: "Hospital público principal de la región." }
];

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export default function ServiciosPage() {
  const [ubicacion, setUbicacion] = useState<{lat: number, lng: number} | null>({ lat: 8.1000, lng: -80.9700 });
  const [error, setError] = useState<string | null>(null);
  const [centros] = useState(UBICACIONES_SANTIAGO); 
  const [centroSeleccionado, setCentroSeleccionado] = useState<any>(UBICACIONES_SANTIAGO[10]); 
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacion({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("GPS inactivo. Usando coordenadas base de Santiago.");
        }
      );
    }
  }, []);

  const centrosFiltrados = centros.filter((centro) =>
    centro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    centro.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mapaHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
      <style>
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
        .user-marker {
          background-color: #2172BE;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(33,114,190,0.6);
        }
        .leaflet-routing-container { display: none !important; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
      <script>
        const map = L.map('map').setView([${centroSeleccionado.lat}, ${centroSeleccionado.lng}], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const userIcon = L.divIcon({
          className: 'user-marker',
          iconSize: [16, 16]
        });

        if (${ubicacion ? "true" : "false"}) {
          L.marker([${ubicacion?.lat}, ${ubicacion?.lng}], { icon: userIcon })
            .addTo(map)
            .bindPopup("<b>Tu ubicación</b>")
            .openPopup();
        }

        const destinoMarker = L.marker([${centroSeleccionado.lat}, ${centroSeleccionado.lng}]).addTo(map);
        destinoMarker.bindPopup("<b>${centroSeleccionado.nombre}</b>").openPopup();

        if (${ubicacion ? "true" : "false"}) {
          L.Routing.control({
            waypoints: [
              L.latLng(${ubicacion?.lat}, ${ubicacion?.lng}),
              L.latLng(${centroSeleccionado.lat}, ${centroSeleccionado.lng})
            ],
            lineOptions: {
              styles: [{ color: '#2172BE', opacity: 0.8, weight: 6 }]
            },
            createMarker: function() { return null; }
          }).addTo(map);
        }
      </script>
    </body>
    </html>
  `;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#1e293b" }}>
      
      {/* ─── BARRA DE NAVEGACIÓN SUPERIOR CON NUEVO LOGO ACTUALIZADO ─── */}
      <nav style={{
        backgroundColor: "#2172BE",
        color: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
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

        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px", fontWeight: "500" }}>
          <a href="/" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>INICIO</a>
          <a href="/medicamentos" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>MEDICAMENTOS</a>
          <a href="/servicios" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "2px solid #ffffff", paddingBottom: "4px" }}>SERVICIOS DE SALUD</a>
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={{ padding: "32px" }}>
        
        <header style={{ 
          marginBottom: "32px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", margin: "0 0 8px 0" }}>
              Red de Salud Integrada de Santiago
            </h1>
            <p style={{ color: "#64748b", margin: 0 }}>
              Consulta clínicas, hospitales y centros de distribución farmacéutica en tiempo real.
            </p>
          </div>

          <div style={{ maxWidth: "360px", width: "100%" }}>
            <input 
              type="text"
              placeholder="🔍 Buscar centro médico o farmacia..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #76B3DB",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          
          {/* PANEL LATERAL */}
          <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px" }}>
              <h3 style={{ color: "#2172BE", fontWeight: "bold", fontSize: "14px", marginTop: 0, marginBottom: "8px" }}>
                Punto de Origen:
              </h3>
              {ubicacion ? (
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0, fontFamily: "monospace" }}>
                  LAT: {ubicacion.lat.toFixed(4)} | LNG: {ubicacion.lng.toFixed(4)}
                </p>
              ) : (
                <p style={{ fontSize: "12px", color: "#b45309", margin: 0 }}>{error || "Obteniendo coordenadas..."}</p>
              )}
            </div>

            {/* LISTA DINÁMICA DE UBICACIONES */}
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f1f5f9", fontWeight: "bold", fontSize: "14px" }}>
                Establecimientos disponibles ({centrosFiltrados.length})
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", maxHeight: "430px", overflowY: "auto" }}>
                {centrosFiltrados.map((centro) => {
                  const distancia = ubicacion 
                    ? calcularDistancia(ubicacion.lat, ubicacion.lng, centro.lat, centro.lng).toFixed(1)
                    : null;

                  return (
                    <div 
                      key={centro.id}
                      onClick={() => setCentroSeleccionado(centro)}
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #e2e8f0",
                        cursor: "pointer",
                        backgroundColor: centroSeleccionado?.id === centro.id ? "rgba(118, 179, 219, 0.15)" : "transparent",
                        transition: "background-color 0.2s"
                      }}
                    >
                      <p style={{ fontWeight: "bold", margin: "0 0 4px 0", color: "#0f172a" }}>{centro.nombre}</p>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px 0", lineHeight: "1.4" }}>{centro.descripcion}</p>
                      {centro.telefono !== "N/A" && (
                        <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 4px 0" }}>📞 Tel: {centro.telefono}</p>
                      )}
                      <p style={{ fontSize: "11px", color: "#2172BE", fontWeight: "600", margin: 0 }}>
                        {distancia ? `A ${distancia} km de tu ubicación` : "Calculando..."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* VISOR DE MAPA REAL INTERACTIVO */}
          <div style={{
            flex: "2 1 500px",
            height: "580px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <div style={{ flex: 1, width: "100%", height: "100%" }}>
              <iframe
                title="Ruta Cartográfica Activa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                srcDoc={mapaHtml}
              ></iframe>
            </div>

            <div style={{
              backgroundColor: "#2172BE",
              color: "white",
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ maxWidth: "70%" }}>
                <span style={{ fontSize: "11px", opacity: 0.8, display: "block", letterSpacing: "0.5px" }}>ESTABLECIMIENTO ACTIVO</span>
                <strong style={{ fontSize: "16px", display: "block", marginBottom: "2px" }}>{centroSeleccionado.nombre}</strong>
                <span style={{ fontSize: "12px", opacity: 0.9, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{centroSeleccionado.descripcion}</span>
              </div>
              <div style={{ textAlign: "right", fontFamily: "monospace", fontSize: "12px" }}>
                {centroSeleccionado.lat.toFixed(4)}, {centroSeleccionado.lng.toFixed(4)}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}