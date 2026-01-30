import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import items from "../data/items";
import Modal from "../components/Modal";
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card/Card";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = items.find((item) => item.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [horas, setHoras] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!producto) {
    return (
      <div className="product-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="back-btn">Volver al inicio</Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === producto.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? producto.images.length - 1 : prev - 1
    );
  };

  const handleReservar = () => {
    setIsModalOpen(true);
    
    // Guardamos la reserva para que aparezca en la página de Reservas
    const reservasExistentes = JSON.parse(localStorage.getItem('reservas') || '[]');
    
    const nuevaReserva = {
      id: Date.now(),
      espacioNombre: producto.nombre,
      horas: horas,
      precioTotal: producto.precio * horas,
      fecha: new Date().toISOString().split('T')[0],
      estado: "Confirmada"
    };
    
    reservasExistentes.push(nuevaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservasExistentes));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVerReservas = () => {
    setIsModalOpen(false);
    navigate('/reservas');
  };

  // Productos sugeridos
  const relatedProducts = useMemo(() => {
    const otherProducts = items.filter((item) => item.id !== producto.id);
    const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 3);
  }, [producto.id]);

  // Breadcrumbs
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Espacios", path: "/" },
    { label: producto.nombre, path: `/producto/${producto.id}` }
  ];

  return (
    <div className="product-detail">
      <Breadcrumbs items={breadcrumbItems} /> 
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detail-container">
        <div className="detail-gallery">
          <div className="main-image-container">
            <button className="gallery-arrow left" onClick={prevImage}>
              ‹
            </button>
            <img 
              src={producto.images[currentImageIndex]} 
              alt={`${producto.nombre} - imagen ${currentImageIndex + 1}`}
              className="main-image"
            />
            <button className="gallery-arrow right" onClick={nextImage}>
              ›
            </button>
          </div>

          <div className="thumbnail-container">
            {producto.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${producto.nombre} - miniatura ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h1 className="product-title">{producto.nombre}</h1>
          <p className="product-description">{producto.descripcion}</p>

          <div className="price-section">
            <span className="price-label">Precio por hora:</span>
            <span className="price-value">{producto.precio}€</span>
          </div>

          <div className="booking-section">
            <div className="hours-selector">
              <label htmlFor="horas">Horas a reservar:</label>
              <div className="hours-control">
                <button 
                  onClick={() => setHoras(Math.max(1, horas - 1))}
                  className="hours-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  id="horas"
                  value={horas}
                  onChange={(e) => setHoras(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="hours-input"
                />
                <button 
                  onClick={() => setHoras(horas + 1)}
                  className="hours-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-price">
              <span>Total:</span>
              <span className="total-amount">{producto.precio * horas}€</span>
            </div>

            <button className="reserve-btn" onClick={handleReservar}>
              Reservar ahora
            </button>
          </div>

          <div className="features-section">
            <h3>Características incluidas:</h3>
            <ul className="features-list">
              <li>✓ WiFi de alta velocidad</li>
              <li>✓ Café y té ilimitado</li>
              <li>✓ Acceso a zonas comunes</li>
              <li>✓ Soporte técnico</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de reserva */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-confirmation">
          <div className="success-icon">✓</div>
          <h2>¡Reserva Confirmada!</h2>

          <div className="reservation-details">
            <div className="detail-row">
              <span className="detail-label">Espacio:</span>
              <span className="detail-value">{producto.nombre}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Horas:</span>
              <span className="detail-value">{horas} hora(s)</span>
            </div>
            <div className="detail-row total">
              <span className="detail-label">Total:</span>
              <span className="detail-value">{producto.precio * horas}€</span>
            </div>
          </div>

          <p className="confirmation-message">
            Recibirás un email de confirmación en breve con todos los detalles de tu reserva.
          </p>

          {/* Botones de acción */}
          <div className="modal-actions">
            <button className="btn-secondary" onClick={handleCloseModal}>
              Seguir explorando
            </button>
            <button className="btn-primary" onClick={handleVerReservas}>
              Ver mis reservas
            </button>
          </div>
        </div>
      </Modal>

      {/* Sección de productos sugeridos */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2 className="related-title">Otros clientes también miraron...</h2>
          <div className="related-grid">
            {relatedProducts.map((product) => (
              <Card key={product.id} space={product} viewMode="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
