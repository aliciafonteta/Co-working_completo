import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index < items.length - 1 ? (
              <>
              {/* si no es el último elemento de la lista que ha creado, lo marca como link para que sea clicable y te redireccione */}
                <Link to={item.path} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
                <span className={styles.separator}>›</span>
              </>
            ) : (
              <span className={styles.breadcrumbCurrent}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
