import "./App.css";
import { useState } from "react";

const cards = [
  {
    id: 1,
    name: "Shadow Ninja",
    rarity: "Epic",
    hp: 120,
    attack: 30,
    defense: 15,
  },
  {
    id: 2,
    name: "Flame Warrior",
    rarity: "Rare",
    hp: 100,
    attack: 22,
    defense: 10,
  },
  {
    id: 3,
    name: "Cyber Fighter",
    rarity: "Legendary",
    hp: 150,
    attack: 40,
    defense: 20,
  },
];

function App() {
  const [screen, setScreen] = useState("menu");

  return (
    <div className="game">

      <h1>Card Battle Arena</h1>

      {/* MENU */}
      {screen === "menu" && (
        <div className="menu">

          <button onClick={() => setScreen("collection")}>
            Collection
          </button>

          <button onClick={() => setScreen("packs")}>
            Packs
          </button>

        </div>
      )}

      {/* COLLECTION */}
      {screen === "collection" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Back
          </button>

          <h2>Your Collection</h2>

          <div className="card-grid">

            {cards.map((card) => (
              <div className="card" key={card.id}>

                <h3>{card.name}</h3>

                <p>Rarity: {card.rarity}</p>
                <p>HP: {card.hp}</p>
                <p>ATK: {card.attack}</p>
                <p>DEF: {card.defense}</p>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* PACKS */}
      {screen === "packs" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Back
          </button>

          <h2>Packs</h2>

          <div className="card">

            <h3>Basic Pack</h3>

            <p>100 coins</p>

            <button>Open Pack</button>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;