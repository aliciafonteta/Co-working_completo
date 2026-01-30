import styles from "./CardInfo.module.css";

function CardInfo({ nombre, descripcion, precio }) {
  return (
    <div className={styles['card-info']}>
      <h3>{nombre}</h3>
      <p className={styles.description}>{descripcion}</p>
      <p className={styles.price}>{precio} € / día</p>
    </div>
  );
}

export default CardInfo;
