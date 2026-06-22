export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff', // Fondo blanco limpio
      color: '#1e293b',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Tarjeta contenedora */}
      <div style={{
        maxWidth: '448px',
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Encabezado con el indicador verde */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{
            height: '12px',
            width: '12px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            marginRight: '12px',
            display: 'inline-block'
          }} />
          {/* ¡PROPIEDAD CORREGIDA AQUÍ! Se usa fontSize */}
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
            Dashboard del Proyecto
          </h1>
        </div>
        
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
          Esta pantalla se creó automáticamente gracias al sistema de carpetas de Next.js. Sin configurar librerías externas.
        </p>
        
        <button style={{
          width: '100%',
          backgroundColor: '#2172BE',
          color: '#ffffff',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '15px'
        }}>
          Explorar Métricas
        </button>
      </div>
    </div>
  );
}