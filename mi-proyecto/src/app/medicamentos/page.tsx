export default function MedicamentosPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#1e293b" }}>
      
      {/* ─── BARRA DE NAVEGACIÓN SUPERIOR UNIFICADA ─── */}
      <nav style={{
        backgroundColor: "#2172BE",
        color: "#ffffff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        marginBottom: "32px"
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
          <a href="/medicamentos" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "2px solid #ffffff", paddingBottom: "4px" }}>MEDICAMENTOS</a>
          <a href="/servicios" style={{ color: "#ffffff", textDecoration: "none", opacity: 0.85 }}>SERVICIOS DE SALUD</a>
        </div>
      </nav>

      {/* ─── CONTENIDO DE LA PÁGINA ─── */}
      <div className="contenedor-principal" style={{ padding: '0 32px 32px 32px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 className="titulo-jomhuria">Inventario de Medicamentos</h1>
            <p className="subtexto-azul">GESTIÓN PROFESIONAL DE SUMINISTROS</p>
          </div>
          <button className="boton-azul">+ Registrar Nuevo</button>
        </div>

        <div className="grid-medicamentos">
          
          {/* Producto 1 */}
          <div style={{ textAlign: 'center' }}>
            <div className="cuadro-imagen">💊</div>
            <h3 style={{ color: '#1F91DC', fontWeight: '900' }}>ANALGÉSICOS</h3>
            <p style={{ color: '#1F91DC', fontSize: '12px' }}>Google Sans Flex / Azul</p>
          </div>

          {/* Producto 2 */}
          <div style={{ textAlign: 'center' }}>
            <div className="cuadro-imagen">🧪</div>
            <h3 style={{ color: '#1F91DC', fontWeight: '900' }}>ANTIBIÓTICOS</h3>
            <p style={{ color: '#1F91DC', fontSize: '12px' }}>Google Sans Flex / Azul</p>
          </div>

          {/* Producto 3 */}
          <div style={{ textAlign: 'center' }}>
            <div className="cuadro-imagen">🧴</div>
            <h3 style={{ color: '#1F91DC', fontWeight: '900' }}>CUIDADO DERMA</h3>
            <p style={{ color: '#1F91DC', fontSize: '12px' }}>Google Sans Flex / Azul</p>
          </div>

        </div>

        <div style={{ marginTop: '60px' }}>
          <h2 className="titulo-jomhuria" style={{ fontSize: '60px' }}>Control de Existencias</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #76B3DB', color: '#1F91DC' }}>
                <th style={{ padding: '15px' }}>Nombre</th>
                <th style={{ padding: '15px' }}>Stock</th>
                <th style={{ padding: '15px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee', color: '#1F91DC' }}>
                <td style={{ padding: '15px' }}>Paracetamol</td>
                <td style={{ padding: '15px' }}>50</td>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>Disponible</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}