'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// @ts-ignore
import { supabase } from "@/app/Login/supabaseClient.js"; 
import "@/app/globals.css"; 

export default function CuentasCreadasLogin(): React.JSX.Element {
  const pathname = usePathname();
  const [correo, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Estilos dinámicos para los enlaces de la Navbar interna
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

  const iniciarSesion = async (): Promise<void> => {
    const emailLimpio = correo.trim();

    if (!emailLimpio || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: emailLimpio,
      password: password,
    });

    if (error) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    alert("¡Inicio de sesión exitoso! ✔");
    // Aquí puedes poner un router.push("/dashboard") si luego quieres mandarlos a otra parte
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-white dark:bg-[#16171d] transition-colors duration-200">
      
      {/* Estilos CSS Embebidos del diseño limpio */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --text: #6b6375;
          --text-h: #08060d;
          --bg: #fff;
          --border: #e5e4e7;
          --shadow: rgba(0, 0, 0, 0.05) 0 10px 15px -3px, rgba(0, 0, 0, 0.02) 0 4px 6px -2px;
        }

        #login-card {
          width: 100%;
          max-width: 480px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: var(--shadow);
        }

        .header-panel {
          border-bottom: 1px solid var(--border);
          padding: 24px;
          text-align: center;
        }

        .form-panel {
          padding: 32px;
        }

        .input-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-h);
          margin-bottom: 6px;
          display: block;
        }

        .custom-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background-color: #fff;
          color: #000;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .custom-input:focus {
          outline: none;
          border-color: #2172BE;
          box-shadow: 0 0 0 3px rgba(33, 114, 190, 0.15);
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #2172BE;
          color: white;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 15px;
        }

        .submit-btn:hover {
          background-color: #1F91DC;
        }

        .footer-panel {
          border-top: 1px solid var(--border);
          padding: 20px;
          text-align: center;
          font-size: 14px;
        }
      `}} />

      {/* ─── BARRA DE NAVEGACIÓN INTEGRADA ─── */}
      <nav style={{
        backgroundColor: "#2172BE",
        color: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        width: "100%",
        boxSizing: "border-box"
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

      {/* ─── CONTENEDOR DEL FORMULARIO DE INICIO DE SESIÓN ─── */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        
        <div id="login-card">
          <div className="header-panel">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2172BE]">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Ingresa a tu cuenta registrada
            </p>
          </div>
          
          <div className="form-panel space-y-5">
            <div>
              <label className="input-label">Correo electrónico</label>
              <input
                className="custom-input"
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Contraseña</label>
              <input
                className="custom-input"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button className="submit-btn" onClick={iniciarSesion}>
                Iniciar sesión
              </button>
            </div>
          </div>

          <div className="footer-panel text-slate-500">
            ¿No tienes una cuenta activa?{" "}
            <Link className="text-[#2172BE] hover:underline font-semibold ml-1" href="/secion">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}