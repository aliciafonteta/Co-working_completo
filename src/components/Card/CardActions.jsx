import styles from "./CardActions.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function CardActions({ name, id, isFav = false, toggleFav }) {
  const [people, setPeople] = useState(1);

  return (
    <div className={styles['card-actions-container']}>
      {/* Botón de favorito */}
      <button
        className={`${styles['btn-fav']} ${isFav ? styles.active : ""}`}
        onClick={() => toggleFav && toggleFav(id)}
        aria-label="Añadir a favoritos"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* Contador de personas */}
      <div className={styles.counter}>
        <button
          onClick={() => setPeople((p) => Math.max(1, p - 1))}
          aria-label="Disminuir número de personas"
        >
          −
        </button>
        
        <span>{people} personas</span>
        
        <button
          onClick={() => setPeople((p) => p + 1)}
          aria-label="Aumentar número de personas"
        >
          +
        </button>
      </div>
      {/* Botón de reservar */}
      <Link to={`/producto/${id}`}>
        <button className={`${styles.btn} ${styles['btn-primary'] || ""}`}>
          Reservar
        </button>
      </Link>
    </div>
  );
}

export default CardActions;
