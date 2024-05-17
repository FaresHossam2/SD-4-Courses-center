const questions = [
  {
    question: "What is Node.js?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A programming language", correct: false },
      { text: "A database", correct: false },
      { text: "A JavaScript runtime built on Chrome's V8 JavaScript engine", correct: true },
    ],
  },
  {
    question: "Who developed Node.js?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Google", correct: false },
      { text: "Ryan Dahl", correct: true },
    ],
  },
  {
    question: "What is npm in Node.js?",
    answers: [
      { text: "A JavaScript library", correct: false },
      { text: "A CSS framework", correct: false },
      { text: "A database", correct: false },
      { text: "A package manager for the JavaScript programming language", correct: true },
    ],
  },
  {
    question: "What is the event loop in Node.js?",
    answers: [
      { text: "A programming paradigm", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "A database table", correct: false },
      { text: "A design pattern that allows Node.js to perform non-blocking I/O operations", correct: true },
    ],
  },
  {
    question: "What is Express.js?",
    answers: [
      { text: "A database", correct: false },
      { text: "A CSS framework", correct: false },
      { text: "A JavaScript library", correct: false },
      { text: "A minimal and flexible Node.js web application framework", correct: true },
    ],
  },
  {
    question: "What is a callback function in Node.js?",
    answers: [
      { text: "A type of variable", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "A database table", correct: false },
      { text: "A function passed into another function as an argument to be executed later", correct: true },
    ],
  },
  {
    question: "What is the purpose of module.exports in Node.js?",
    answers: [
      { text: "To import modules", correct: false },
      { text: "To define a CSS rule", correct: false },
      { text: "To create a database table", correct: false },
      { text: "To export functions, objects or values from a file so they can be used by other programs with the require function", correct: true },
    ],
  },
  {
    question: "What is a buffer in Node.js?",
    answers: [
      { text: "A type of variable", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "A database table", correct: false },
      { text: "A temporary storage spot for a chunk of data that is being transferred from one place to another", correct: true },
    ],
  },
  {
    question: "What is the purpose of the Node.js file system (fs) module?",
    answers: [
      { text: "To style HTML documents", correct: false },
      { text: "To perform CRUD operations on a database", correct: false },
      { text: "To manipulate the DOM", correct: false },
      { text: "To interact with the file system on your computer", correct: true },
    ],
  },
  {
    question: "What is stream in Node.js?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A type of variable", correct: false },
      { text: "A database table", correct: false },
      { text: "A collection of data - just like an array or a string, that you can manipulate in chunks as data comes in or goes out", correct: true },
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

const returnButton = document.getElementById("return-button");

function showScore() {
  resetState();
  let userScore = `You scored ${score} out of ${questions.length}.`;
 let quote = "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture17"; // Replace with your lecture page URL
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
