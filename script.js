let gameOverText = "Game Over, Press Any Key to Restart";
const colorCard = document.getElementsByClassName("color-card");
const arr = [];
nextCard();
var level = 1;
var countArr = 0;

$(document).keypress(function () {
  if (!$(".level-up").text().startsWith("L")) {
    $(".level-up").text(`Level 1`);
    cardShowUp(arr);
  }
});

$(".color-card").on({
  click: function (event) {
    let clicked = event.target;
    clicked.classList.add("clicked");
    if (level == arr.length) {
      countArr++;
      console.log(countArr);
      gameCheck(clicked);
    }
  },
  transitionend: function (event) {
    event.target.classList.remove("clicked");
  },
  //   dblclick: function (event) {
  //     event.target.classList.remove("clicked");
  //     countArr++;

  // }
});

function gameCheck(target) {
  if (countArr == arr.length) {
    levelChange();
    nextCard();
  }
}

function nextCard() {
  countArr = 0;
  arr.push(Math.floor(Math.random() * 4) + 1);
}

function cardShowUp(list) {
  let LastNum = list[arr.length - 1];
  for (let domElement of colorCard) {
    if (domElement.classList[1].endsWith(LastNum)) {
      domElement.classList.add("showUP");
      // domElement.addEventListener()
      domElement.addEventListener("transitionend", () => {
        domElement.classList.remove("showUP");
      });
    }
  }
}

function levelChange() {
  level++;
  $(".level-up").text(`Level ${level}`);
}
