import "./App.css";
import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("menu");
  const [coins, setCoins] = useState(500);

  return (
    <div className="game">

      <h1>Card Battle Arena</h1>

      <div className="top-bar">
        Coins: {coins}
      </div>

      {screen === "menu" && (
        <div className="menu">

          <button onClick={() => setScreen("collection")}>
            Collection
          </button>

          <button onClick={() => setScreen("shop")}>
            Pack Shop
          </button>

          <button onClick={() => setScreen("earn")}>
            Earn Coins
          </button>

        </div>
      )}

      {screen === "collection" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Back
          </button>

          <h2>Collection</h2>

        </div>
      )}

      {screen === "shop" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Back
          </button>

          <h2>Pack Shop</h2>

        </div>
      )}

      {screen === "earn" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Back
          </button>

          <h2>Earn Coins</h2>

          <button onClick={() => setCoins(coins + 10)}>
            +10 Coins
          </button>

        </div>
      )}

    </div>
  );
}

export default App;