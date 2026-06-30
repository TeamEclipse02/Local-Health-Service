import React from 'react';
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
      </body>
    </html>
  );
}