const images = [
  "./img/img-1.png",
  "./img/img-2.png",
  "./img/img-3.png",
  "./img/img-4.png",
  "./img/img-5.png",
  "./img/img-6.png",
  "./img/img-7.png",
  "./img/img-8.png",
];

const shuffleArray = (array) => {
  return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const random = shuffleArray([...images, ...images]);

const cardList = document.querySelector(".cards");

const renderCards = () => {
  random.forEach((img) => {
    const markup = `
     <li class="card">
        <div class="view front-card"></div>
        <div class="view back-card">
            <img src="${img}" alt="card-image">
        </div>
     </li>
    `;
    cardList.insertAdjacentHTML("afterbegin", markup);
  });
};
renderCards();

let cardOne, cardTwo;
let disableCard = false;
function flipCard(e) {
  const card = e.target.closest(".card");
  if (!card) return;
  if (card !== cardOne && !disableCard) {
    card.classList.add("flip");
    if (!cardOne) {
      return (cardOne = card);
    }
    cardTwo = card;
    disableCard = true;
    const imgOne = cardOne.querySelector("img").src;
    const imgTwo = cardTwo.querySelector("img").src;
    matchCards(imgOne, imgTwo);
  }
}

let imgMatched = 0;
const matchCards = (img1, img2) => {
  if (img1 === img2) {
    imgMatched++;
    if (imgMatched == 8) {
      setTimeout(() => {
        resetAllCards();
      }, 2000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableCard = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("vibration");
      cardTwo.classList.add("vibration");
    }, 500);
    setTimeout(() => {
      cardOne.classList.remove("vibration", "flip");
      cardTwo.classList.remove("vibration", "flip");
      cardOne = cardTwo = "";
      disableCard = false;
    }, 1000);
  }
};

const resetAllCards = () => {
  imgMatched = 0;
  cardOne = cardTwo = "";
  cardList.innerHTML = "";
  random.sort(() => (Math.random() > 0.5 ? 1 : -1));
  renderCards();
};
cardList.addEventListener("click", flipCard);

const resetButton = document.querySelector(".btn");
resetButton.addEventListener("click", resetAllCards);
