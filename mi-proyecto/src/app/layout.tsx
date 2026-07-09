import React from 'react';
import Script from 'next/script'; 
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

        {/* El script de UserWay se queda aquí abajo intacto */}
        <Script 
          src="https://cdn.userway.org/widget.js" 
          data-account="NpY74r9teu"
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}