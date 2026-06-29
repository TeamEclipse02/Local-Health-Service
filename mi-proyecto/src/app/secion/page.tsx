'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

// @ts-ignore
import { supabase } from "@/app/Login/supabaseClient.js"; 
import "@/app/globals.css"; 

export default function Registro(): React.JSX.Element {
  const pathname = usePathname();
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmar, setConfirmar] = useState<string>("");

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

  const registrarUsuario = async (): Promise<void> => {
    if (!nombre || !correo || !password || !confirmar) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const emailLimpio = correo.trim();

    const { data, error } = await supabase.auth.signUp({
      email: emailLimpio,
      password: password,
      options: {
        data: {
          nombre: nombre.trim(),
        },
      },
    });

    if (error) {
      console.log("ERROR COMPLETO:", error);
      alert("Error en registro: " + error.message);
      return;
    }

    const partesNombre = nombre.trim().split(" ");
    const primerNombre = partesNombre[0] || "";
    const apellidoDetectado = partesNombre.slice(1).join(" ") || "No especificado";

    const { error: dbError } = await supabase
      .from('Usuario') 
      .insert([
        {
          nombre: primerNombre,
          apellido: apellidoDetectado,
          correo: emailLimpio
        }
      ]);

    if (dbError) {
      console.log("ERROR EN TABLA USUARIO:", dbError);
      alert("Se creó la cuenta, pero hubo un error al guardar en la tabla Usuario.");
      return;
    }

    alert("Usuario registrado correctamente en la Base de Datos ✔");
    
    setNombre("");
    setCorreo("");
    setPassword("");
    setConfirmar("");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-white dark:bg-[#16171d] transition-colors duration-200">
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --text: #6b6375;
          --text-h: #08060d;
          --bg: #fff;
          --border: #e5e4e7;
          --shadow: rgba(0, 0, 0, 0.05) 0 10px 15px -3px, rgba(0, 0, 0, 0.02) 0 4px 6px -2px;
        }

        #register-card {
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

      {/* ─── CONTENEDOR DEL FORMULARIO ─── */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div id="register-card">
          <div className="header-panel">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2172BE]">
              ¡Regístrate!
            </h1>
          </div>
          
          <div className="form-panel space-y-5">
            <div>
              <label className="input-label">Nombre completo</label>
              <input
                className="custom-input"
                type="text"
                placeholder="Ingresa tu nombre y apellido"
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Correo electrónico</label>
              <input
                className="custom-input"
                type="text"
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

            <div>
              <label className="input-label">Confirmar contraseña</label>
              <input
                className="custom-input"
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmar}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmar(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button className="submit-btn" onClick={registrarUsuario}>
                Registrarse
              </button>
            </div>
          </div>

          <div className="footer-panel text-slate-500">
            ¿Ya tienes una cuenta?{" "}
            {/* CONECTADO: Ahora manda directamente a cuentascreadas */}
            <Link className="text-[#2172BE] hover:underline font-semibold ml-1" href="/cuentascreadas">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}