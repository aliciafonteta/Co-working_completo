import { useState } from "react";
import styles from "./CardGallery.module.css";

function CardGallery({ images, name, viewMode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  {/* guarda la posición de la imagen por defecto la 0 */}

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={`${styles['card-gallery']} ${styles[viewMode] || ""}`}>
      <img
        src={images[currentImageIndex]}
        alt={`${name} - Foto ${currentImageIndex + 1}`}
        className={styles['gallery-image']}
      />

      {images.length > 1 && (
        <>
          <button
            className={`${styles['gallery-nav']} ${styles.prev}`}
            onClick={goToPrevious}
            aria-label="Foto anterior"
          >
            ❮
          </button>
          <button
            className={`${styles['gallery-nav']} ${styles.next}`}
            onClick={goToNext}
            aria-label="Siguiente foto"
          >
            ❯
          </button>

          <div className={styles['gallery-indicators']}> {/* puntos de selección */}
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ""}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Ir a la foto ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CardGallery;
