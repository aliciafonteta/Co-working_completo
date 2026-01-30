import { useState } from "react";
import "./Contacto.css";

function Contacto() {
    const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  // Cada vez que el usuario escribe en un campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev, // Para mantener los valores anteriores
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.");
    
    // Limpia el formulario después del envío
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="contacto-page">
      <div className="contacto-container">
        <div className="contacto-header">
          <h1>Contáctanos</h1>
          <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
        </div>

        <div className="contacto-content">
          <div className="contacto-info">
            <div className="info-item">
              <h3> Dirección</h3>
              <p>Calle Larga 34<br />12006 Castellón, España</p>
            </div>
            <div className="info-item">
              <h3> Teléfono</h3>
              <p>+34 964 345 678</p>
            </div>
            <div className="info-item">
              <h3> Email</h3>
              <p>info@tuoffice.com</p>
            </div>
            <div className="info-item">
              <h3> Horario</h3>
              <p>Lunes a Viernes: 8:00 - 20:00<br />Sábados: 9:00 - 14:00</p>
            </div>
          </div>

          <form className="contacto-form" onSubmit={handleSubmit}>
            
            {/* Campo de nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            {/* Campo de email */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            {/* Campo de teléfono */}
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+34 123 456 789"
              />
            </div>

            {/* Campo de mensaje */}
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Cuéntanos en qué podemos ayudarte..."
              ></textarea>
            </div>

            {/* Botón de envío */}
            <button type="submit" className="submit-btn">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
