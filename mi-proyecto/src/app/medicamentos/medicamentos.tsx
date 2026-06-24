import React, { useState } from "react";

export default function MedicamentosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [soloStock, setSoloStock] = useState(false);

  const medicamentos = [
    {
      nombre: "Amoxicilina 500mg",
      laboratorio: "Generic Lab • 21 cápsulas",
      farmacia: "Green Cross Pharmacy",
      precio: "$12.50",
      distancia: "0.8 km",
      estado: "In Stock",
      imagen: "https://via.placeholder.com/120",
    },
    {
      nombre: "Amoxicilina (Amoxil)",
      laboratorio: "Pfizer • 30 tabletas",
      farmacia: "HealthFirst Clinic",
      precio: "$28.90",
      distancia: "1.4 km",
      estado: "3 left",
      imagen: "https://via.placeholder.com/120",
    },
    {
      nombre: "Amoxicilina 500mg",
      laboratorio: "BioHealth • 15 cápsulas",
      farmacia: "Metro Medical Center",
      precio: "$14.20",
      distancia: "2.1 km",
      estado: "In Stock",
      imagen: "https://via.placeholder.com/120",
    },
  ];

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const coincideBusqueda = med.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideStock =
      !soloStock || med.estado.toLowerCase().includes("stock");

    return coincideBusqueda && coincideStock;
  });

  return (
    <div
      style={{
        backgroundColor: "#F4F6F9",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <nav
        style={{
          backgroundColor: "#2172BE",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://i.imgur.com/3bgPkrk.jpg"
            alt="Logo"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#fff",
              objectFit: "cover",
            }}
          />

          <h2
            style={{
              color: "#fff",
              margin: 0,
            }}
          >
            Local Health Service
          </h2>
        </div>

        {/* SEARCH */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            maxWidth: "500px",
            background: "#fff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar medicamento..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "12px",
            }}
          />

          <span>🔍</span>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "25px",
          padding: "25px",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            height: "fit-content",
          }}
        >
          <h2>Filtros</h2>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600" }}>Rango de Precios</p>
            <input type="range" style={{ width: "100%" }} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600" }}>Distancia</p>

            <button style={chipStyle}>Menos de 2 km</button>
            <button style={chipStyle}>7 km</button>
            <button style={chipStyle}>10 km</button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600" }}>Disponibilidad</p>

            <label>
              <input
                type="checkbox"
                checked={soloStock}
                onChange={(e) => setSoloStock(e.target.checked)}
              />{" "}
              En stock
            </label>

            <br />

            <label>
              <input type="checkbox" /> Disponible hoy
            </label>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "600" }}>Farmacia</p>

            <label>
              <input type="checkbox" /> Genérica
            </label>

            <br />

            <label>
              <input type="checkbox" /> Eliyan
            </label>

            <br />

            <label>
              <input type="checkbox" /> El Javillo
            </label>
          </div>
        </aside>

        {/* MAIN */}
        <main>
          {/* ESCANEAR */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                📷
              </div>

              <div>
                <h3 style={{ margin: 0 }}>Escanea & Busca</h3>

                <p
                  style={{
                    margin: 0,
                    color: "#666",
                  }}
                >
                  Identifica tus medicamentos usando la cámara
                </p>
              </div>
            </div>

            <button
              style={{
                background: "#2F80ED",
                color: "#fff",
                border: "none",
                padding: "14px 35px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Escanear
            </button>
          </div>

          {/* RESULTADOS */}
          {medicamentosFiltrados.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              No se encontraron medicamentos.
            </div>
          ) : (
            medicamentosFiltrados.map((med, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "20px",
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "18px",
                }}
              >
                <img
                  src={med.imagen}
                  alt={med.nombre}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 5px",
                          color: "#2172BE",
                        }}
                      >
                        {med.nombre}
                      </h3>

                      <small>{med.laboratorio}</small>
                    </div>

                    <div
                      style={{
                        color: "#2172BE",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {med.precio}
                    </div>
                  </div>

                  {/* ESTADO */}
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "12px",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      background:
                        med.estado === "In Stock"
                          ? "#DCFCE7"
                          : "#FEF3C7",
                      color:
                        med.estado === "In Stock"
                          ? "#166534"
                          : "#92400E",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  >
                    {med.estado}
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      gap: "30px",
                      color: "#555",
                      fontSize: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>🏥 {med.farmacia}</span>
                    <span>📍 {med.distancia}</span>
                  </div>

                  <div
                    style={{
                      marginTop: "18px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        flex: 1,
                        background: "#2172BE",
                        color: "#fff",
                        border: "none",
                        padding: "12px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Ordenar
                    </button>

                    <button
                      style={{
                        background: "#fff",
                        border: "1px solid #2172BE",
                        color: "#2172BE",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

const chipStyle = {
  border: "1px solid #D1D5DB",
  background: "#F8FAFC",
  borderRadius: "20px",
  padding: "6px 12px",
  marginRight: "5px",
  marginTop: "5px",
  cursor: "pointer",
};