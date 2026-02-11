import CardGallery from "./CardGallery";
import CardInfo from "./CardInfo";
import CardActions from "./CardActions";
import styles from "./Card.module.css";

function Card({ space, viewMode = "grid", favorites = [], toggleFav }) { // Determina si el espacio de trabajo es favorito
  const isFav = favorites.includes(space.id);

  return (
    <article className={`${styles.card} ${styles[viewMode] || ""}`}>
      {/* Galería de imágenes */}
      <CardGallery
        images={space.images}
        name={space.nombre}
        viewMode={viewMode}
      />

      {/* Contenido de la card */}
      <div className={styles['card-content']}>
        <CardInfo
          nombre={space.nombre}
          descripcion={space.descripcion}
          precio={space.precio}
        />

        {/* Acciones (favorito, contador, botón reservar) */}
        <CardActions name={space.nombre} id={space.id} isFav={isFav} toggleFav={toggleFav} />
      </div>
    </article>
  );
}

export default Card;
