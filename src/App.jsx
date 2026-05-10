import "./App.css";
import { useState } from "react";
import ninja from "./assets/Artur.png";

const allCards = [
  {
    id: 1,
    name: "Теневой Ниндзя",
    rarity: "bronze",
    hp: 90,
    attack: 15,
    image: ninja,
  },

  {
    id: 2,
    name: "Кибер Самурай",
    rarity: "silver",
    hp: 130,
    attack: 28,
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800",
  },

  {
    id: 3,
    name: "Император Тьмы",
    rarity: "gold",
    hp: 200,
    attack: 45,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800",
  },

  {
    id: 4,
    name: "Ледяной Воин",
    rarity: "bronze",
    hp: 100,
    attack: 17,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800",
  },

  {
    id: 5,
    name: "Призрачный Боец",
    rarity: "silver",
    hp: 140,
    attack: 30,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
  },

  {
    id: 6,
    name: "Король Арены",
    rarity: "gold",
    hp: 220,
    attack: 55,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800",
  },
];

function App() {
  const [screen, setScreen] = useState("menu");

  const [coins, setCoins] = useState(1000);

  const [message, setMessage] = useState("");

  const [openedCard, setOpenedCard] = useState(null);

  const [collection, setCollection] = useState([
    allCards[0],
    allCards[1],
  ]);

  const [filter, setFilter] = useState("all");

  function earnCoins() {
    setCoins(coins + 50);
  }

  function openPack(type) {
    const prices = {
      bronze: 200,
      silver: 500,
      gold: 1000,
    };

    if (coins < prices[type]) {
      setMessage("Недостаточно монет");
      return;
    }

    let pool = [];

    if (type === "bronze") {
      pool = allCards.filter(
        (card) =>
          card.rarity === "bronze" ||
          card.rarity === "silver"
      );
    }

    if (type === "silver") {
      pool = allCards.filter(
        (card) =>
          card.rarity === "silver" ||
          card.rarity === "gold"
      );
    }

    if (type === "gold") {
      pool = allCards.filter(
        (card) => card.rarity === "gold"
      );
    }

    const randomCard =
      pool[Math.floor(Math.random() * pool.length)];

    setCoins(coins - prices[type]);

    setCollection([...collection, randomCard]);

    setOpenedCard(randomCard);
  }

  const filteredCards = collection.filter((card) => {
    if (filter === "all") return true;

    return card.rarity === filter;
  });

  return (
    <div className="game">

      <h1>Card Battle Arena</h1>

      <div className="top-bar">
        Монеты: {coins}
      </div>

      {screen === "menu" && (
        <div className="menu">

          <button onClick={() => setScreen("collection")}>
            Коллекция
          </button>

          <button onClick={() => setScreen("shop")}>
            Магазин паков
          </button>

          <button onClick={() => setScreen("earn")}>
            Заработок монет
          </button>

        </div>
      )}

      {screen === "collection" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Моя коллекция</h2>

          <div className="sort-box">

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >

              <option value="all">
                Все карточки
              </option>

              <option value="bronze">
                Bronze
              </option>

              <option value="silver">
                Silver
              </option>

              <option value="gold">
                Gold
              </option>

            </select>

          </div>

          <div className="card-grid">

            {filteredCards.map((card, index) => (
              <div
                className={`card ${card.rarity}`}
                key={index}
              >

                <img src={card.image} alt={card.name} />

                <h3>{card.name}</h3>

                <p>
                  {card.rarity.toUpperCase()}
                </p>

                <p>HP: {card.hp}</p>
                <p>ATK: {card.attack}</p>

              </div>
            ))}

          </div>

        </div>
      )}

      {screen === "shop" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Магазин паков</h2>

          <div className="pack bronze-pack">

            <h3>Bronze Pack</h3>

            <p>200 монет</p>

            <button
              onClick={() => openPack("bronze")}
            >
              Купить
            </button>

          </div>

          <div className="pack silver-pack">

            <h3>Silver Pack</h3>

            <p>500 монет</p>

            <button
              onClick={() => openPack("silver")}
            >
              Купить
            </button>

          </div>

          <div className="pack gold-pack">

            <h3>Gold Pack</h3>

            <p>1000 монет</p>

            <button
              onClick={() => openPack("gold")}
            >
              Купить
            </button>

          </div>

        </div>
      )}

      {screen === "earn" && (
        <div>

          <button onClick={() => setScreen("menu")}>
            Назад
          </button>

          <h2>Заработок монет</h2>

          <button onClick={earnCoins}>
            +50 монет
          </button>

        </div>
      )}

      {message && (

        <div className="message-screen">

          <div className="message-box">

            <h2>{message}</h2>

            <button
              onClick={() => setMessage("")}
            >
              Окей
            </button>

          </div>

        </div>

      )}

      {openedCard && (

        <div className="drop-screen">

          <div
            className={`drop-card ${openedCard.rarity}`}
          >

            <img
              src={openedCard.image}
              alt={openedCard.name}
            />

            <h2>{openedCard.name}</h2>

            <p>
              {openedCard.rarity.toUpperCase()}
            </p>

            <p>HP: {openedCard.hp}</p>
            <p>ATK: {openedCard.attack}</p>

            <button
              onClick={() => setOpenedCard(null)}
            >
              Забрать
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;