let ballSize = 100;
let time = 0;
let score = 0;

const watch = document.querySelector(".watch");
const gamescore = document.querySelector(".score");
const gameboard = document.querySelector(".gameboard");
const gameOverPopup = document.getElementById("gameOverPopup");
const finalScore = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");

const popSound = new Audio("sound/pop.mp3");
const gameOverSound = new Audio("sound/gameover.mp3");
const bgMusic = new Audio("sound/bg.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.5;

// Function to show popup
function showGameOver(score) {
  finalScore.textContent = score;
  gameOverPopup.classList.add("show");
}

// Function to hide and restart
playAgainBtn.addEventListener("click", () => {
  popSound.play();
  setTimeout(() => {
    gameOverPopup.classList.remove("show");
    location.reload(); // simple way to restart . its reload the page
  }, 350);
});

document.body.addEventListener("click", () => {
  bgMusic.play();
});

let a = setInterval(() => {
  const posx = Math.floor(Math.random() * (850 - ballSize));
  const posy = Math.floor(Math.random() * (700 - ballSize));

  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.width = ballSize + "px";
  ball.style.height = ballSize + "px";
  ball.style.position = "absolute";
  ball.style.left = posx + "px";
  ball.style.top = posy + "px";
  const colors = [
    "#ff6b6b", // neon light red
    "#6bcfff", // neon light blue
    "#6bff95", // neon light green
    "#fff36b", // neon light yellow
    "#c77dff", // neon light purple
    "#ff9f43", // neon light orange
  ];

  ball.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  ball.style.boxShadow = `0 0 25px ${ball.style.backgroundColor}`;

  ball.style.borderRadius = "50%";

  gameboard.appendChild(ball);

  //   ball.addEventListener("click", () => {
  //     score++;
  //     gamescore.textContent = String(score);
  //     ball.remove();
  //   });

  ball.addEventListener("click", () => {
    score++;
    gamescore.textContent = score;

    popSound.currentTime = 0;
    popSound.play();

    ball.classList.add("burst");
    setTimeout(() => {
      //wait till animation of burst
      ball.remove();
    }, 350);
  });

  // auto remove if not clicked
  const autoremove = setTimeout(() => {
    //if ball exist then remove it -> ball.parentnode returns null if ball not exist , return parent element if ball exist
    if (ball.parentNode) {
      ball.remove();
    }
  }, 2000);
}, 700);

let d = setInterval(() => {
  //scoreboard and timer
  time++;
  watch.textContent = String(time);
  if (time === 15) {
    gameOverSound.play();
    bgMusic.pause();
    bgMusic.currentTime = 0;
    showGameOver(score);
    clearInterval(a);
    clearInterval(d);
  }
}, 1000);
