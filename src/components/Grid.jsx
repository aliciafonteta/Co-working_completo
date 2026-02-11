import { useState, useEffect } from "react";
import items from "../data/items";
import Card from "./Card/Card";
import styles from "./Grid.module.css";

function Grid() {
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites"); // Recupera los favoritos del localStorage
      return raw ? JSON.parse(raw) : []; // Si no hay favoritos, devuelve un array vacío
    } catch (e) {
      return [];
    }
  });
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("none"); // 'none' | 'asc' | 'desc'

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Guarda los favoritos en el localStorage cada vez que cambian
    } catch (e) {}
  }, [favorites]);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id] 
    );
  };

  const visibleItems = items.filter((space) => (showFavOnly ? favorites.includes(space.id) : true));
  const displayedItems =
    sortOrder === "none"
      ? visibleItems
      : [...visibleItems].sort((a, b) => (sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio));

  return (
    <>
      <div className={styles['view-controls']}>
        <button
          className={`${styles['view-btn']} ${viewMode === "grid" ? styles.active : ""}`} 
          onClick={() => toggleViewMode("grid")}
          aria-label="Vista de cuadrícula"
          title="Vista de cuadrícula"
        >
          ⊞ Rejilla
        </button>
        <button
          className={`${styles['view-btn']} ${viewMode === "list" ? styles.active : ""}`}
          onClick={() => toggleViewMode("list")} 
          aria-label="Vista de lista"
          title="Vista de lista"
        >
          ☰ Lista
        </button>

        <button
          className={`${styles['view-btn']} ${showFavOnly ? styles.active : ""}`}
          onClick={() => setShowFavOnly((s) => !s)}
          aria-label="Mostrar solo favoritos"
          title="Mostrar solo favoritos"
        >
          Favoritos
        </button>

        <div className={styles['sort-controls']}>
          <button
            className={`${styles['view-btn']} ${sortOrder === "asc" ? styles.active : ""}`}
            onClick={() => setSortOrder("asc")}
            aria-label="Ordenar por precio ascendente"
            title="Precio: menor a mayor"
          >
            Precio ↑
          </button>
          <button
            className={`${styles['view-btn']} ${sortOrder === "desc" ? styles.active : ""}`}
            onClick={() => setSortOrder("desc")}
            aria-label="Ordenar por precio descendente"
            title="Precio: mayor a menor"
          >
            Precio ↓
          </button>
        </div>
      </div>

      <section className={`${styles.grid} ${styles[viewMode] || ""}`}> {/* .map para las diferentes cards según item.js */}
        {displayedItems.map((space) => (
          <Card
            key={space.id}
            space={space}
            viewMode={viewMode}
            favorites={favorites}
            toggleFav={toggleFav}
          />
        ))}
      </section>
    </>
  );
}

export default Grid;