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

let timerInterval=null
let secondsRemaining = 60; 

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
  updateTimer();
};
renderCards();

let cardOne, cardTwo;
let disableCard = false;
let matchedPairs = 0;

function displayResultMessage(isWin) {
  const message = document.querySelector(".message");
  const messageContainer = document.querySelector(".message-container");
  message.textContent = isWin ? "You won!" : "You lost!";
  message.style.display = "block";
  messageContainer.style.display = "flex";

}

const matchCards = (img1, img2) => {
  if (img1 === img2) {
    matchedPairs++;

    if (matchedPairs == 8) {
      
      clearInterval(timerInterval); 
      displayResultMessage(true);
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
let gameOver = false;

const resetAllCards = () => {
  matchedPairs = 0;
  cardOne = cardTwo = "";
  cardList.innerHTML = "";
  random.sort(() => (Math.random() > 0.5 ? 1 : -1));
  renderCards();

  // Clear the timer
  clearInterval(timerInterval);
  timerInterval = null;
  secondsRemaining = 60; 
  updateTimer();
    gameOver = false;
  const messageContainer = document.querySelector(".message-container");
  messageContainer.style.display = "none";


};

function updateTimer() {
  const timerDisplay = document.querySelector(".timer");

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // Display the time in MM:SS format
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function flipCard(e) {
  if (gameOver) return; 
  const card = e.target.closest(".card");
  if (!card) return;

  // Check if the timer is not running and the game has not been won or lost
  if (timerInterval === null && matchedPairs !== 8) {
    timerInterval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        displayResultMessage(false); 
         gameOver = true; 
      }
      updateTimer();
    }, 1000);
  }

  // Rest of your flipCard logic
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

cardList.addEventListener("click", flipCard);

const resetButton = document.querySelectorAll(".btn");
resetButton.forEach((btn) => btn.addEventListener("click", resetAllCards));
