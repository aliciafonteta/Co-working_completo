import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Página no encontrada</h2>

        <p className="error-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <Link to="/" className="btn-home">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
