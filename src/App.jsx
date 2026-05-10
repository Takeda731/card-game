import { useState } from "react";
import testCard from "./assets/cards/test-card.png";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div style={styles.app}>
      {!opened ? (
        <button style={styles.button} onClick={() => setOpened(true)}>
          Открыть пак
        </button>
      ) : (
        <div style={styles.cardWrapper}>
          <img
            src={testCard}
            alt="Card"
            style={styles.card}
            draggable={false}
          />

          <div style={styles.glow}></div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    width: "100%",
    minHeight: "100vh",
    background: `
      radial-gradient(circle at top, #1a1a2e 0%, #0f0f1a 60%, #050505 100%)
    `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: "Arial",
  },

  button: {
    padding: "18px 40px",
    fontSize: "22px",
    border: "none",
    borderRadius: "16px",
    background: "#ffd54a",
    color: "#111",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 30px rgba(255,213,74,0.5)",
  },

  cardWrapper: {
    position: "relative",
    width: "320px",
    animation: "appear 0.5s ease",
  },

  card: {
    width: "100%",
    display: "block",
    userSelect: "none",
    pointerEvents: "none",

    filter: `
      drop-shadow(0 0 15px rgba(255,255,255,0.15))
      drop-shadow(0 0 35px rgba(255,215,0,0.25))
    `,
  },

  glow: {
    position: "absolute",
    inset: 0,
    background: `
      linear-gradient(
        120deg,
        transparent 20%,
        rgba(255,255,255,0.35) 50%,
        transparent 80%
      )
    `,
    mixBlendMode: "screen",
    animation: "shine 3s linear infinite",
    pointerEvents: "none",
  },
};