import React from 'react';
import Script from 'next/script'; // 👈 1. Importamos el componente de Next.js
import './globals.css';

export const metadata = {
  title: 'Sistema Inteligente de Salud',
  description: 'Proyecto Académico 2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}

        {/* 👈 2. El script de UserWay se pone aquí abajo, antes del cierre de </body> */}
        <Script 
          src="https://cdn.userway.org/widget.js" 
          data-account="NpY74r9teu"
          strategy="lazyOnload" // Carga el widget de forma eficiente sin ralentizar tu página
        />
      </body>
    </html>
  );
}