//#region elements
//elements
const quizContainer = document.querySelector(".quiz");
const startContainer = document.querySelector(".start");
const btnStart = document.querySelector(".start-quiz");
const questionTitle = document.querySelector(".question-title");
const image = document.querySelector(".question-image");
//all questions elements
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");
const choiceE = document.querySelector("#E");
//timer elements
const counter = document.querySelector(".counter");
const gauge = document.querySelector(".time-gauge");
//circle questions
const progress = document.querySelector(".progress");
//score container
const scoreContainer = document.querySelector(".score-container");
//#endregion

//the game variables
let questionNow = 0;
let count = 0;
let questionTimer = 45; //30 seconds per question
let gaugeWidth = 150; //150px
let progressGauge = gaugeWidth / questionTimer;
let questionLeft = questions.length - 1;
let score = 0;
let correctAnswer = 0;
let TIMER;

btnStart.addEventListener("click", () => {
  document.body.style.backgroundImage = "none";
  startContainer.style.display = "none";
  renderQuestions();
  quizContainer.style.display = "flex";
  renderCircles();
  renderTimer();
  TIMER = setInterval(renderTimer, 1000);
});
//render the question
function renderQuestions() {
  const quest = questions[questionNow];
  questionTitle.innerHTML = `${quest.id}) ${quest.title}`;
  choiceA.innerHTML = `A) ${quest.choiceA}`;
  choiceB.innerHTML = `B) ${quest.choiceB}`;
  choiceC.innerHTML = `C) ${quest.choiceC}`;
  choiceD.innerHTML = `D) ${quest.choiceD}`;
  choiceE.innerHTML = `E) ${quest.choiceE}`;
  image.innerHTML = `<img src="${quest.image}" alt="Imagem da questão"/>`;
}

//circles with all questions: wrong or correct
function renderCircles() {
  for (let i = 0; i <= questionLeft; i++) {
    progress.innerHTML += `<div class="prog" id="${i}"></div>`;
  }
}

//set the timer
function renderTimer() {
  if (count <= questionTimer) {
    counter.innerHTML = `${count}s`;
    gauge.style.width = `${count * progressGauge}px`;
    count++;
  } else {
    count = 0;
    //without answer, is wrong
    answerWrong();
    //if exist more questions
    if (questionNow < questionLeft) {
      questionNow++;
      renderQuestions();
    } else {
      clearInterval(TIMER);
      renderScore();
    }
  }
}
//check if the answer is correct
function verifyAnswer(answer) {
  if (answer == questions[questionNow].correct) {
    answerCorrect();
    correctAnswer++;
    score++;
  } else {
    answerWrong();
  }
  count = 0;
  if (questionNow < questionLeft) {
    questionNow++;
    renderQuestions();
  } else {
    clearInterval(TIMER);
    renderScore();
  }
}

//show the score when game is over
function renderScore() {
  scoreContainer.style.display = "flex";
  const scorePerCent = Math.round((100 * score) / questions.length);
  let uau = "";
  let img = "";

  if (scorePerCent >= 80) {
    img = "./images/5.png";
    uau = "Parabéns, estou orgulhoso de você: ";
  } else if (scorePerCent >= 60) {
    img = "./images/4.png";
    uau = "Nada mal, gostei de ver: ";
  } else if (scorePerCent >= 40) {
    img = "./images/3.png";
    uau = "Éeeee... Você pode melhorar: ";
  } else if (scorePerCent >= 20) {
    img = "./images/2.png";
    uau = "Ok, talvez a Katia te chame para uma conversa: ";
  } else {
    img = "./images/1.png";
    uau = "Finga que você não fez esse teste e continue o que estava fazendo: ";
  }
  scoreContainer.innerHTML = `<img src="${img}" />`;
  scoreContainer.innerHTML += `<p>Você acertou ${correctAnswer} de ${questions.length} questões`;
  scoreContainer.innerHTML += `<p>${uau}${scorePerCent}% de acertos</p>`;
  scoreContainer.innerHTML += `<button class="btn-close" onclick='closeAll()'>Fechar</button>`;
}

//wrong and correct functions
function answerWrong() {
  document.getElementById(questionNow).style.backgroundColor = "#f00";
}
function answerCorrect() {
  document.getElementById(questionNow).style.backgroundColor = "#0f0";
}

function closeAll() {
  window.location.reload();
}
/*squares*/
const ulSquares = document.querySelector("ul.squares");
for (let i = 0; i < 11; i++) {
  const li = document.createElement("li");

  const random = (min, max) => Math.random() * (max - min) + min;

  const size = Math.floor(random(10, 120));
  const position = random(1, 99);
  const delay = random(5, 0.1);
  const duration = random(24, 12);

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.bottom = `-${size}px`;
  li.style.left = `${position}%`;
  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random},${Math.random},${Math.random})`;
  ulSquares.appendChild(li);
}
