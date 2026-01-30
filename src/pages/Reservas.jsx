import { useState, useEffect } from "react";
import "./Reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasGuardadas = localStorage.getItem('reservas');
    
    if (reservasGuardadas) {
      setReservas(JSON.parse(reservasGuardadas));
    } else {
      const reservasEjemplo = [
        {
          id: 1,
          espacioNombre: "Sala privada",
          horas: 3,
          precioTotal: 75,
          fecha: "2026-01-28",
          estado: "Confirmada"
        },
        {
          id: 2,
          espacioNombre: "Mesa flexible",
          horas: 5,
          precioTotal: 75,
          fecha: "2026-01-29",
          estado: "Pendiente"
        }
      ];
      setReservas(reservasEjemplo);
    }
  }, []);

  // Función para eliminar una reserva
  const eliminarReserva = (id) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      const nuevasReservas = reservas.filter(reserva => reserva.id !== id);

      setReservas(nuevasReservas);
      localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
    }
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevasReservas = reservas.map(reserva => 
      reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva
    );
    
    setReservas(nuevasReservas);
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
  };

  return (
    <div className="reservas-page">
      <div className="reservas-container">
        <div className="reservas-header">
          <h1>Mis Reservas</h1>
          <p>Gestiona todas tus reservas de espacios</p>
        </div>

        {reservas.length === 0 ? (
          <div className="no-reservas">
            <p>No tienes reservas activas</p>
            <a href="/" className="btn-ir-espacios">
              Ver espacios disponibles
            </a>
          </div>
        ) : (
          <div className="reservas-table-container">
            <table className="reservas-table">
              <thead>
                <tr>{/* tr son las filas de la table y th los encabezados */}
                  <th>Espacio</th>
                  <th>Fecha</th>
                  <th>Horas</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td className="espacio-nombre">{reserva.espacioNombre}</td>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.horas}h</td>
                    <td className="precio">{reserva.precioTotal}€</td>
                    <td>
                      <span className={`estado-badge ${reserva.estado.toLowerCase()}`}>
                        {reserva.estado}
                      </span>
                    </td>
                    <td className="acciones">
                      {/* Botones de acción */}
                      {reserva.estado === "Pendiente" && (
                        <button 
                          onClick={() => cambiarEstado(reserva.id, "Confirmada")}
                          className="btn-confirmar"
                        >
                          Confirmar
                        </button>
                      )}
                      <button 
                        onClick={() => eliminarReserva(reserva.id)}
                        className="btn-cancelar"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Resumen de reservas */}
        {reservas.length > 0 && (
          <div className="reservas-resumen">
            <div className="resumen-item">
              <span className="resumen-label">Total de reservas:</span>
              <span className="resumen-valor">{reservas.length}</span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Horas totales:</span>
              <span className="resumen-valor">
                {/* Suma de las horas */}
                {reservas.reduce((total, r) => total + r.horas, 0)}h
              </span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Gasto total:</span>
              <span className="resumen-valor precio">
                {/* Suma de los precios */}
                {reservas.reduce((total, r) => total + r.precioTotal, 0)}€
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservas;
