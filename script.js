const main = document.querySelector("main");
let audio = new Audio("./sound/lose1.wav");
let audio1 = new Audio("./sound/click.wav");

const colorNum = [];
const colorCards = $(".color-card");
var count = 0;
var level = 1;

$(document).keypress(function () {
  clickToPlay();
});

$(document).ready(function () {
  $(".color-card").on({
    click: function (event) {
      audio1.currentTime = 0
      event.target.classList.add("clicked");
      audio1.play();
      gameCheck(event.target);
    },
    transitionend: function (event) {
      event.target.classList.remove("clicked");
    },
  });

  $(".btn-play").click(function () {
    clickToPlay();
  });
});

function addColor() {
  colorNum.push(Math.floor(Math.random() * 4) + 1);
  setTimeout(() => {
    showCard();
  }, 500);
}

function showCard() {
  for (let item of colorCards) {
    let lastNum = colorNum[colorNum.length - 1];
    if (item.classList[1].indexOf(lastNum) != -1) {
      item.classList.add("showUP");
      item.addEventListener("transitionend", function () {
        item.classList.remove("showUP");
      });
    }
  }
}

function lose() {
  document.querySelector("main").classList.add("main-err");
  audio.currentTime = 0;
  audio.play();
  document.querySelector("main").addEventListener("transitionend", (e) => {
    if (e.propertyName != "background-color") return;
    document.querySelector("main").classList.remove("main-err");
  });
}
function win() {
  audio1.currentTime = 0;
  document.querySelector("main").classList.add("win");
  document.querySelector("main").addEventListener("transitionend", (e) => {
    if (e.propertyName == "background-color") {
      document.querySelector("main").classList.remove("win");
    }
  });
}

function gameCheck(target) {
  if (target.classList[1].indexOf(colorNum[count]) != -1) {
    count++;
  } else {
    count = 0;
    level = 1;
    colorNum.splice(0, colorNum.length);
    lose();
    $(".level-up")
      .html(`<h1 class="level-up">GameOver Press Any Key to Continue or <a class="btn-play" 
      href="#">Click Here </a></h1>`);

    $(".btn-play").click(function () {
      clickToPlay();
    });
  }
  if (count === colorNum.length && colorNum.length != 0) {
    console.log(count, colorNum);
    count = 0;
    level++;
    $(".level-up").text(`Level ${level}`);
    win();
    addColor();
  }
}

function clickToPlay() {
  if (!$("h1").text().startsWith("L")) {
    count = 0;
    level = 1;
    colorNum.splice(0, colorNum.length);
    $("h1").text("Level 1");
    addColor();
  }
}
