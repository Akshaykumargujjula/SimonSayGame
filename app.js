let p = document.querySelector(".parent span h2");

let btns = document.querySelectorAll(".btn");
let level = 0;
let GameSeq = [];
let userSeq = [];
let started = false;
let btnsArray = ["first", "sec", "thi", "four"];
let running = new Audio("running.mp3");
for (btn of btns) {
  btn.addEventListener("click", btnPress);
}

// Step 3 is CHecking the user input against the GameSeq
function checkAns(idx) {
  if (GameSeq[idx] === userSeq[idx]) {
    if (GameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    p.innerHTML = `Game Over ! Your Score is ${level}  <br>  Press Any Key to Restart `;
    let gameover = new Audio("gameover.mp3");
    running.pause();
    gameover.play();
    reset();
  }
}
function btnPress() {
  UserFlash(this);

  let color = this.getAttribute("id");
  userSeq.push(color);

  checkAns(userSeq.length - 1);
}
function UserFlash(btn) {
  btn.classList.add("black");
  setTimeout(function () {
    btn.classList.remove("black");
  }, 500);
}
function GameFlash(btn) {
  btn.classList.add("active");
  setTimeout(function () {
    btn.classList.remove("active");
  }, 500);
}

function levelUp() {
  // Step 2: reaching Level 1
  userSeq = [];
  level++;
  p.innerText = `Level ${level} `;

  let num = btnsArray[Math.floor(Math.random() * 4)];
  GameSeq.push(num);

  GameFlash(document.querySelector(`.${num}`));
  let levelUp=new Audio("levelUp2.mp3");
  levelUp.play();
}

// Step 1: pressing any key
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started ");
    started = true;

    running.play();
    running.loop=true;
    levelUp();
  } else {
    return;
  }
});

function reset() {
  started = false;
  level = 0;
  GameSeq = [];
  userSeq = [];
}
