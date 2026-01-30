import { useEffect } from "react";
import styles from "./Modal.module.css";

// isOpen: controla si el modal está visible o no
// onClose: al cerrar el modal
// children: contenido del modal
function Modal({ isOpen, onClose, children }) {
  
  // useEffect para controlar el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Cuando el modal se abre, deshabilita todo lo de detras
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); // Si está abierto se muestra

  // Si el modal no está abierto, nada
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Si haces clic fuera se cierra
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      {/* Contenedor del modal */}
      <div className={styles.modalContent}>
        {/* Botón de cerrar */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
        
        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
