import { useState } from "react";
import "./index.css";

import testCard from "./assets/cards/test-card.png";

const cards = [
  {
    id: 1,
    name: "Hinata",
    rarity: "Legendary",
    image: testCard,
  },
  {
    id: 2,
    name: "Kageyama",
    rarity: "Epic",
    image: testCard,
  },
  {
    id: 3,
    name: "Bokuto",
    rarity: "Rare",
    image: testCard,
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [sortType, setSortType] = useState("all");

  const filteredCards =
    sortType === "all"
      ? cards
      : cards.filter((card) => card.rarity === sortType);

  return (
    <div className="app">
      <div className="phone-frame">
        <div className="top-bar">
          <div>
            <div className="game-title">VOLLEY CARDS</div>
            <div className="subtitle">Telegram Edition</div>
          </div>

          <div className="coins">💰 1200</div>
        </div>

        <div className="content">
          {screen === "home" && (
            <div className="home-screen">
              <div className="big-pack">
                <div className="pack-glow"></div>

                <div className="pack-text">
                  PREMIUM
                  <br />
                  PACK
                </div>
              </div>

              <button
                className="main-button"
                onClick={() => setScreen("shop")}
              >
                OPEN SHOP
              </button>
            </div>
          )}

          {screen === "shop" && (
            <div className="shop-screen">
              <h2 className="section-title">SHOP</h2>

              <div className="shop-pack legendary">
                <div>
                  <div className="shop-pack-title">
                    LEGENDARY PACK
                  </div>

                  <div className="shop-pack-sub">
                    Higher legendary chance
                  </div>
                </div>

                <button className="buy-button">
                  500 💰
                </button>
              </div>

              <div className="shop-pack epic">
                <div>
                  <div className="shop-pack-title">
                    EPIC PACK
                  </div>

                  <div className="shop-pack-sub">
                    Good epic chance
                  </div>
                </div>

                <button className="buy-button">
                  250 💰
                </button>
              </div>
            </div>
          )}

          {screen === "collection" && (
            <div className="collection-screen">
              <div className="collection-top">
                <h2 className="section-title">
                  COLLECTION
                </h2>

                <select
                  className="sort-select"
                  value={sortType}
                  onChange={(e) =>
                    setSortType(e.target.value)
                  }
                >
                  <option value="all">All</option>
                  <option value="Legendary">
                    Legendary
                  </option>
                  <option value="Epic">Epic</option>
                  <option value="Rare">Rare</option>
                </select>
              </div>

              <div className="cards-grid">
                {filteredCards.map((card) => (
                  <div
                    className="collection-card"
                    key={card.id}
                  >
                    <img
                      src={card.image}
                      alt="card"
                    />

                    <div className="card-name">
                      {card.name}
                    </div>

                    <div className="card-rarity">
                      {card.rarity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-nav">
          <button
            className={
              screen === "home"
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() => setScreen("home")}
          >
            HOME
          </button>

          <button
            className={
              screen === "shop"
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() => setScreen("shop")}
          >
            SHOP
          </button>

          <button
            className={
              screen === "collection"
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() => setScreen("collection")}
          >
            COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
}