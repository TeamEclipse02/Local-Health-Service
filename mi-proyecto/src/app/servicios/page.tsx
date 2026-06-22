"use client"; // Muy importante: los mapas y el GPS solo funcionan del lado del cliente

import { useEffect, useState } from "react";

export default function ServiciosPage() {
  const [ubicacion, setUbicacion] = useState<{lat: number, lng: number} | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Lógica para obtener la ubicación actual de la persona
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
          setError("No se pudo obtener tu ubicación. Por favor, activa el GPS.");
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
    }
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-black text-white mb-2">Servicios de Salud Cercanos</h1>
        <p className="text-slate-400">Visualiza hospitales y centros médicos basados en tu ubicación actual.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PANEL LATERAL: Lista de lugares (Datos de Supabase irían aquí) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-emerald-400 font-bold mb-2">Tu ubicación detectada:</h3>
            {ubicacion ? (
              <p className="text-xs text-slate-500 font-mono">
                LAT: {ubicacion.lat.toFixed(4)} | LNG: {ubicacion.lng.toFixed(4)}
              </p>
            ) : (
              <p className="text-xs text-amber-400 animate-pulse">{error || "Detectando GPS..."}</p>
            )}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 font-bold text-sm">Centros Médicos Disponibles</div>
            <div className="divide-y divide-slate-800">
              <div className="p-4 hover:bg-slate-900 cursor-pointer transition-colors">
                <p className="font-bold text-white">Hospital Central</p>
                <p className="text-xs text-slate-500">A 1.2 km de tu posición</p>
              </div>
              <div className="p-4 hover:bg-slate-900 cursor-pointer transition-colors">
                <p className="font-bold text-white">Clínica Santa María</p>
                <p className="text-xs text-slate-500">A 3.5 km de tu posición</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DEL MAPA (Aquí integrarías React-Leaflet o Google Maps) */}
        <div className="lg:col-span-2 h-[500px] bg-slate-950 border border-slate-800 rounded-3xl relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="text-center z-10 p-8">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <i className="fa-solid fa-map-location-dot text-3xl"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Visor de Mapa Interactivo</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Aquí se renderizará el mapa conectando los puntos de <b>Supabase</b> con tu ubicación real.
            </p>
          </div>

          {/* Mini-mapa decorativo de fondo simulado */}
          <div className="absolute bottom-4 right-4 bg-slate-900 border border-slate-700 p-2 rounded-lg text-[10px] text-slate-500 font-mono">
            MapEngine v1.0 • Leaflet-Ready
          </div>
        </div>

      </div>
    </div>
  );
}
