import { useState } from "react";
import logo from "../assets/logo_black.svg";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Link to = "/" >
        <div className={styles['header-brand']}>
          <img src={logo} alt="Tu Office Logo" className={styles['logo-icon']}/>
          <h1>Tu Office</h1>
        </div>
      </Link>

      {/* Botón hamburguesa para móviles */}
      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menú de navegación */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
        <ul>
          {/* NavLink en lugar de Link para indicar la ruta activa */}
          <li onClick={() => setIsMenuOpen(false)}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? styles.activeLink : ""}
              end
            >
              Espacios
            </NavLink>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            {/* NavLink a la página de Reservas */}
            <NavLink 
              to="/reservas"
              className={({ isActive }) => isActive ? styles.activeLink : ""}
            >
              Reservas
            </NavLink>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            {/* NavLink a la página de contacto */}
            <NavLink 
              to="/contacto"
              className={({ isActive }) => isActive ? styles.activeLink : ""}
            >
              Contacto
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
