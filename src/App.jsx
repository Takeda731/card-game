import "./App.css";
import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("menu");
  const [coins, setCoins] = useState(500);

  return (
    <div className="game">

      <h1>Card Battle Arena</h1>

      <div className="top-bar">
        Баланс: {coins}
      </div>

      {screen === "menu" && (
        <div className="menu">

          <button onClick={() => setScreen("collection")}>
            Коллекция
          </button>

          <button onClick={() => setScreen("shop")}>
            Магазин
          </button>

          <button onClick={() => setScreen("earn")}>
            Кликер
          </button>

        </div>
      )}

      {screen === "collection" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Коллекция</h2>

        </div>
      )}

      {screen === "shop" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Магазин</h2>

        </div>
      )}

      {screen === "earn" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Кликер</h2>

          <button onClick={() => setCoins(coins + 10)}>
            +10 Монет
          </button>

        </div>
      )}

    </div>
  );
}

export default App;