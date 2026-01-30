import { useState } from "react";
import items from "../data/items";
import Card from "./Card/Card";
import styles from "./Grid.module.css";

function Grid() {
  const [viewMode, setViewMode] = useState("grid");

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

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
      </div>

      <section className={`${styles.grid} ${styles[viewMode] || ""}`}> {/* .map para las diferentes cards según item.js */}
        {items.map((space) => (                                 
          <Card key={space.id} space={space} viewMode={viewMode} />
        ))}
      </section>
    </>
  );
}

export default Grid;