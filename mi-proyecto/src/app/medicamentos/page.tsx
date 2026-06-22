export default function MedicamentosPage() {
  return (
    <div className="contenedor-principal">
      
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
  );
}