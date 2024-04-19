import styles from "./Cards.module.css";
function Cards({ content }) {
  return (
    <div className={styles.dashboard}>
      <div
        className={styles.card}
        onClick={() => selectOption("pair-programming")}
      >
        <h2>Pair Programming</h2>
        <p>Collaborate with a partner on coding tasks.</p>
      </div>
    </div>
  );
}

export default Cards;
