const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Text Machine Language", correct: false },
      { text: "High Text Markup Language", correct: false },
    ],
  },
  {
    question: "What is the correct HTML tag for the largest heading?",
    answers: [
      { text: "h6", correct: false },
      { text: "h1", correct: true },
      { text: "head", correct: false },
      { text: "heading", correct: false },
    ],
  },
  {
    question: "How can you make a numbered list in HTML?",
    answers: [
      { text: "ul", correct: false },
      { text: "ol", correct: true },
      { text: "li", correct: false },
      { text: "dl", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheet", correct: true },
      { text: "Colorful Style Sheet", correct: false },
      { text: "Creative Style Sheet", correct: false },
      { text: "Computer Style Sheet", correct: false },
    ],
  },
  {
    question: "What is the correct CSS syntax?",
    answers: [
      { text: "{body;color:black;}", correct: false },
      { text: "body:color=black;", correct: false },
      { text: "body {color: black;}", correct: true },
      { text: "{body:color=black;}", correct: false },
    ],
  },
  {
    question: "How do you insert a comment in a CSS file?",
    answers: [
      { text: "// this is a comment", correct: false },
      { text: "/* this is a comment */", correct: true },
      { text: "' this is a comment", correct: false },
      { text: "// this is a comment //", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "text-style", correct: false },
      { text: "font-style", correct: false },
    ],
  },
  {
    question: "What is the correct HTML for referring to an external style sheet?",
    answers: [
      { text: "stylesheetheet>mystyle.css</stylesheet", correct: false },
      { text: "style src='mystyle.css'", correct: false },
      { text: "link rel='stylesheet' type='text/css' href='mystyle.css'", correct: true },
      { text: "style href='mystyle.css'", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "font", correct: false },
      { text: "class", correct: false },
      { text: "styles", correct: false },
      { text: "style", correct: true },
    ],
  },
  {
    question: "Which is the correct CSS selector to select all <p> elements inside <div> elements?",
    answers: [
      { text: "div p", correct: true },
      { text: "div.p", correct: false },
      { text: "div > p", correct: false },
      { text: "p div", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function dingSound() {
  let ding = new Audio("sounds/ding.mp3");
  ding.play();
}

function wrongSound() {
  let wrong = new Audio("sounds/wrong-answer.mp3");
  wrong.play();
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    dingSound();
    selectedBtn.classList.add("correct");
    score++;
  } else {
    wrongSound();
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

const returnButton = document.getElementById('return-button');

function showScore() {
  resetState();
  let userScore = `You scored ${score} out of ${questions.length}.`;
let quote = "HTML and CSS are the bricks and mortar of the web. - Bill Erickson";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture10"; // Replace with your lecture page URL
});

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
