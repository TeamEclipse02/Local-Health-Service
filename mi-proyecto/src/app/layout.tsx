import '@/app/globals.css'; // <-- Cambiado a 'globals' con S y usando el alias oficial
import type { Metadata } from 'next';

export const metadata: Metadata = {
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