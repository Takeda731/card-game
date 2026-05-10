import { useEffect, useRef, useState } from "react";
import "./index.css";

import testCard from "./assets/cards/test-card.png";

import clickSoundFile from "./assets/sounds/click.mp3";
import coinSoundFile from "./assets/sounds/coin.mp3";

const baseCard = {
  id: 1,
  name: "Хината",
  rarity: "Легендарная",
  image: testCard,
};

export default function App() {
  const [screen, setScreen] =
    useState("home");

  const [coins, setCoins] = useState(
    () => {
      return Number(
        localStorage.getItem("coins")
      ) || 1000;
    }
  );

  const [collection, setCollection] =
    useState(() => {
      const saved = localStorage.getItem(
        "collection"
      );

      return saved ? JSON.parse(saved) : [];
    });

  const [openedCard, setOpenedCard] =
    useState(null);

  const [sortType, setSortType] =
    useState("Все");

  const [notification, setNotification] =
    useState("");

  const clickSound = useRef(null);
  const coinSound = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "coins",
      coins
    );
  }, [coins]);

  useEffect(() => {
    localStorage.setItem(
      "collection",
      JSON.stringify(collection)
    );
  }, [collection]);

  useEffect(() => {
    clickSound.current = new Audio(
      clickSoundFile
    );

    clickSound.current.volume = 0.3;

    coinSound.current = new Audio(
      coinSoundFile
    );

    coinSound.current.volume = 0.4;
  }, []);

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  const playCoin = () => {
    if (coinSound.current) {
      coinSound.current.currentTime = 0;
      coinSound.current.play();
    }
  };

  const showNotification = (text) => {
    setNotification(text);

    setTimeout(() => {
      setNotification("");
    }, 2200);
  };

  const goTo = (page) => {
    playClick();
    setScreen(page);
  };

  const earnCoins = () => {
    playCoin();

    setCoins((prev) => prev + 25);
  };

  const openPack = (price) => {
    playClick();

    if (coins < price) {
      showNotification(
        "❌ Недостаточно монет"
      );

      return;
    }

    setCoins((prev) => prev - price);

    setOpenedCard({
      ...baseCard,
      uniqueId:
        Date.now() + Math.random(),
    });

    setScreen("opened");
  };

  const saveCard = () => {
    playClick();

    setCollection((prev) => [
      ...prev,
      openedCard,
    ]);

    showNotification(
      "✅ Карточка добавлена"
    );

    setScreen("shop");
  };

  const [playerId] = useState(() => {
  let savedId =
    localStorage.getItem("playerId");

  if (!savedId) {
    let globalCounter =
      Number(
        localStorage.getItem(
          "globalPlayerCounter"
        )
      ) || 1;

    savedId = globalCounter;

    localStorage.setItem(
      "playerId",
      savedId
    );

    localStorage.setItem(
      "globalPlayerCounter",
      globalCounter + 1
    );
  }

  return savedId;
});

  const sellCard = () => {
    playClick();

    setCoins((prev) => prev + 100);

    showNotification(
      "💰 Карточка продана"
    );

    setScreen("shop");
  };

  const cardCount = (name) => {
    return collection.filter(
      (card) => card.name === name
    ).length;
  };

  const filteredCollection =
    sortType === "Все"
      ? [
          ...new Map(
            collection.map((card) => [
              card.name,
              card,
            ])
          ).values(),
        ]
      : [
          ...new Map(
            collection
              .filter(
                (card) =>
                  card.rarity === sortType
              )
              .map((card) => [
                card.name,
                card,
              ])
          ).values(),
        ];

  return (
    <div className="app">
      <div className="phone-frame">
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}

        <div className="top-bar">
          <div>
            <div className="game-title">
              VOLLEY CARDS
            </div>

            <div className="subtitle">
              ID: {playerId}
            </div>
          </div>

          <div className="coins">
            💰 {coins}
          </div>
        </div>

        <div className="content">
          {screen === "home" && (
            <div className="home-screen">
              <div className="clicker-title">
                НАЖИМАЙ И
                ЗАРАБАТЫВАЙ
              </div>

              <button
                className="coin-clicker"
                onClick={earnCoins}
              >
                💰
              </button>

              <div className="earn-text">
                +25 МОНЕТ
              </div>
            </div>
          )}

          {screen === "shop" && (
            <div className="shop-screen">
              <div className="shop-banner">
                <div className="banner-title">
                  TOTY EVENT
                </div>

                <div className="banner-sub">
                  Лучшие карточки сезона
                </div>
              </div>

              <div
                className="fifa-pack legendary"
                onClick={() =>
                  openPack(500)
                }
              >
                <div>
                  <div className="pack-name">
                    ЛЕГЕНДАРНЫЙ ПАК
                  </div>

                  <div className="pack-desc">
                    Повышенный шанс
                    легендарок
                  </div>
                </div>

                <div className="pack-price">
                  500 💰
                </div>
              </div>

              <div
                className="fifa-pack epic"
                onClick={() =>
                  openPack(250)
                }
              >
                <div>
                  <div className="pack-name">
                    ЭПИЧЕСКИЙ ПАК
                  </div>

                  <div className="pack-desc">
                    Средняя редкость
                  </div>
                </div>

                <div className="pack-price">
                  250 💰
                </div>
              </div>
            </div>
          )}

          {screen === "opened" &&
            openedCard && (
              <div className="opened-screen">
                <div className="you-got">
                  ВАМ ВЫПАЛО
                </div>

                <div className="single-card-area">
                  <div className="card-glow"></div>

                  <div className="card-shine"></div>

                  <img
                    src={openedCard.image}
                    alt="card"
                    className="opened-card"
                  />
                </div>

                <div className="opened-name">
                  {openedCard.name}
                </div>

                <div className="opened-rarity">
                  {openedCard.rarity}
                </div>

                <div className="opened-buttons">
                  <button
                    className="save-btn"
                    onClick={saveCard}
                  >
                    ЗАБРАТЬ
                  </button>

                  <button
                    className="sell-btn"
                    onClick={sellCard}
                  >
                    ПРОДАТЬ
                  </button>
                </div>
              </div>
            )}

          {screen === "collection" && (
            <div className="collection-screen">
              <div className="collection-top">
                <div className="section-title">
                  КОЛЛЕКЦИЯ
                </div>

                <select
                  className="sort-select"
                  value={sortType}
                  onChange={(e) =>
                    setSortType(
                      e.target.value
                    )
                  }
                >
                  <option>
                    Все
                  </option>

                  <option>
                    Легендарная
                  </option>

                  <option>
                    Эпическая
                  </option>

                  <option>
                    Редкая
                  </option>
                </select>
              </div>

              <div className="collection-grid">
                {filteredCollection.map(
                  (card, index) => (
                    <div
                      className="collection-card"
                      key={index}
                    >
                      <img
                        src={card.image}
                        alt="card"
                      />

                      <div className="card-name-small">
                        {card.name}
                      </div>

                      <div className="card-rarity-small">
                        {card.rarity}
                      </div>

                      <div className="card-count">
                        x
                        {cardCount(
                          card.name
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-nav">
          <button
            className="nav-btn"
            onClick={() => goTo("home")}
          >
            ГЛАВНАЯ
          </button>

          <button
            className="nav-btn"
            onClick={() => goTo("shop")}
          >
            МАГАЗИН
          </button>

          <button
            className="nav-btn"
            onClick={() =>
              goTo("collection")
            }
          >
            КОЛЛЕКЦИЯ
          </button>
        </div>
      </div>
    </div>
  );
}