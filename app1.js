function shuffle(arrayForShuffling) {
  for (let i = arrayForShuffling.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayForShuffling[i], arrayForShuffling[j]] = [
      arrayForShuffling[j],
      arrayForShuffling[i],
    ];
  }
  return arrayForShuffling;
}

function init() {
  let cardGame = [
    "./imgs/1.png",
    "./imgs/2.png",
    "./imgs/3.png",
    "./imgs/4.png",
    "./imgs/5.png",
  ];

  const shuffledSubset = shuffle(cardGame).slice(0, cardGame.length);
  const arrayAfterShuffling = shuffle(shuffledSubset.concat(shuffledSubset));

  const bordElements = document.getElementById("bord");
  let openCards = [];
  let clickable = true;
  let toFinish = [];
  let startTime;
  let score = 0;

  const spacer = document.createElement("div");
  spacer.className = "spacer";
  bordElements.appendChild(spacer);

  const row1 = document.createElement("div");
  row1.className = "row";
  bordElements.appendChild(row1);

  const row2 = document.createElement("div");
  row2.className = "row";
  bordElements.appendChild(row2);

  function updateTimer() {
    document.getElementById("time").textContent = count;
    document.getElementById("score").textContent = score;
  }

  let count = 50;
  const timer = setInterval(function () {
    count--;
    updateTimer();
    if (count === 0) {
      clearInterval(timer);
      if (toFinish.length !== cardGame.length) {
        clickable = false;
        const playAgain = confirm(`Time's up! Do you want to play again?`);
        if (playAgain) {
          location.reload();
        } else {
          window.close();
        }
      }
    }
  }, 1000);

  for (let i = 0; i < arrayAfterShuffling.length; i++) {
    const image = arrayAfterShuffling[i];

    const cardElement = document.createElement("div");
    cardElement.className = "card";

    const imgElement = document.createElement("img");
    imgElement.className = "img";
    imgElement.src = "./img/2.jpg";
    imgElement.alt = "";

    cardElement.appendChild(imgElement);

    if (i < arrayAfterShuffling.length / 2) {
      row1.appendChild(cardElement);
    } else {
      row2.appendChild(cardElement);
    }

    cardElement.onclick = () => {
      if (!clickable || openCards.includes(cardElement)) {
        return;
      }
      cardElement.classList.add("clicked");
      if (!startTime) {
        startTime = new Date();
      }

      imgElement.src = image;
      openCards.push(cardElement);

      if (openCards.length === 2) {
        clickable = false;
        setTimeout(() => {
          const [card1, card2] = openCards;
          const img1 = card1.querySelector(".img");
          const img2 = card2.querySelector(".img");

          if (img1.src === img2.src) {
            openCards = [];
            toFinish.push(img1.src);
            score += 10;
          } else {
            img1.src = "./img/2.jpg";
            img2.src = "./img/2.jpg";
            openCards = [];
          }
          if (toFinish.length == cardGame.length) {
            clickable = false;
            const playAgain = confirm(`Nice job! Do you want to play again?`);
            if (playAgain) {
              location.reload();
            } else {
              alert("Thanks for playing! Feel free to leave.");
              window.close();
            }
          }

          clickable = true;
        }, 500);
      }
    };
  }
}

init();
