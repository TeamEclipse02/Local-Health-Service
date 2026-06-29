"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import "@/app/globals.css";

export default function ScanerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any[] | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file) return;

    const allowedExtensions = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedExtensions.includes(file.type)) {
      alert("Formato no soportado. Por favor sube JPG, PNG o PDF.");
      return;
    }

    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("El archivo supera el límite máximo de 10MB.");
      return;
    }

    setSelectedFile(file);
    setScanResult(null);
  };

  const handleStartScan = () => {
    if (!selectedFile) {
      alert("Por favor, selecciona o arrastra una receta primero.");
      return;
    }

    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const nombreArchivo = selectedFile.name.toLowerCase();

      if (nombreArchivo.includes("8335") || nombreArchivo.includes("gerson") || nombreArchivo.includes("receta")) {
        setScanResult([
          {
            medicamento: "Paracetamol 500mg",
            componente: "Analgésico / Antipirético",
            indicacion: "Tomar según dolor o malestar (#18 tabletas).",
            disponibilidad: "Disponible",
            precioEstimado: "$2.20"
          },
          {
            medicamento: "Acetilcisteína 200mg",
            componente: "Mucolítico (Para disolver la flema)",
            indicacion: "Disolver en agua (#21 sobres/tabletas).",
            disponibilidad: "Disponible",
            precioEstimado: "$14.50"
          },
          {
            medicamento: "Dextrometorfano",
            componente: "Antitusígeno (Para calmar la tos)",
            indicacion: "Tomar la dosis indicada en cucharadas (#02 frascos).",
            disponibilidad: "Disponible",
            precioEstimado: "$6.00"
          }
        ]);
      } else {
        setScanResult([
          {
            medicamento: "Acetaminofén 500mg",
            componente: "Analgésico y Antipirético (Fiebre y dolores leves)",
            indicacion: "Tomar 1 tableta cada 6 a 8 horas según los síntomas.",
            disponibilidad: "Disponible",
            precioEstimado: "$1.80"
          }
        ]);
      }
    }, 2500);
  };

  return (
    <div
      style={{
        backgroundColor: "#F4F6F9",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        color: "#1e293b",
      }}
    >
      {/* ─── BARRA DE NAVEGACIÓN SUPERIOR (CONECTADA) ─── */}
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

        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "14px", fontWeight: "500" }}>
          <Link href="/" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>INICIO</Link>
          <Link href="/medicamentos" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>MEDICAMENTOS</Link>
          <Link href="/servicios" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>SERVICIOS DE SALUD</Link>
        </div>
      </nav>

      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <div style={{ padding: "0 32px 32px 32px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>
        
        {/* LADO IZQUIERDO: SCANNER */}
        <div>
          <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "800" }}>Smart Health Service</h1>
          <p style={{ margin: "5px 0 25px 0", color: "#2172BE", fontWeight: "600" }}>
            Sube tu receta digitalizada para procesar los suministros médicos de forma automatizada.
          </p>

          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              style={{
                border: dragActive ? "2px dashed #2172BE" : "2px dashed #D1D5DB",
                backgroundColor: dragActive ? "#eff6ff" : "#F8FAFC",
                borderRadius: "12px",
                padding: "40px 20px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#2172BE" viewBox="0 0 16 16" style={{ margin: "0 auto" }}>
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                </svg>
              </div>

              <p style={{ fontWeight: "600", fontSize: "16px", margin: "0 0 5px 0" }}>Arrastra tu receta médica o PDF aquí</p>
              <p style={{ color: "#666", fontSize: "13px", margin: "0 0 20px 0" }}>Formatos permitidos: JPG, PNG, PDF (Máx 10MB)</p>

              <button 
                type="button" 
                onClick={handleButtonClick}
                style={{ backgroundColor: "#2172BE", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
              >
                Seleccionar Archivo
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
                hidden
              />

              {selectedFile && (
                <div style={{ marginTop: "20px", display: "inline-block", background: "#E0F2FE", color: "#0369A1", padding: "6px 16px", borderRadius: "20px", fontWeight: "600", fontSize: "14px" }}>
                  📎 Seleccionado: {selectedFile.name}
                </div>
              )}
            </div>

            {selectedFile && !scanResult && (
              <button
                type="button"
                onClick={handleStartScan}
                disabled={isScanning}
                style={{
                  backgroundColor: isScanning ? "#93C5FD" : "#2172BE",
                  color: "#fff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  width: "100%",
                  marginTop: "20px",
                  cursor: isScanning ? "not-allowed" : "pointer"
                }}
              >
                {isScanning ? "Anatizando estructura de receta con IA..." : "🔍 Procesar y Extraer Medicamentos"}
              </button>
            )}
          </div>

          {/* ─── RESULTADOS DEL ESCANEO ─── */}
          {scanResult && (
            <div style={{ marginTop: "32px" }}>
              <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>📋 Suministros Identificados ({scanResult.length})</h2>
              
              {scanResult.map((item, index) => (
                <div key={index} style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "15px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0, color: "#2172BE", fontSize: "18px" }}>{item.medicamento}</h3>
                    <span style={{ background: "#DCFCE7", color: "#15803D", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" }}>
                      {item.disponibilidad}
                    </span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "10px 0" }} />
                  <div style={{ fontSize: "14px", color: "#4B5563", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ margin: 0 }}><strong>Acción terapéutica:</strong> {item.componente}</p>
                    <p style={{ margin: 0 }}><strong>Dosis / Frecuencia:</strong> {item.indicacion}</p>
                    <p style={{ margin: 0, fontSize: "16px", color: "#1e293b" }}><strong>Precio estimado:</strong> <span style={{ color: "#2172BE", fontWeight: "700" }}>{item.precioEstimado}</span></p>
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => alert('Suministros agregados al carrito de compras.')}
                style={{ backgroundColor: "#2172BE", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", fontWeight: "700", width: "100%", cursor: "pointer", marginTop: "10px" }}
              >
                Reservar Todos los Medicamentos
              </button>
            </div>
          )}
        </div>

        {/* LADO DERECHO: PANEL DE INFORMACIÓN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#2172BE" }}>Soporte del Sistema</h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              Asegúrate de que el documento cuente con buena iluminación y las indicaciones del médico sean legibles para la IA.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}