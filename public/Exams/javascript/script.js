const questions = [
  {
    question: "What is JavaScript?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A programming language", correct: true },
      { text: "A database", correct: false },
      { text: "A UI software development kit", correct: false },
    ],
  },
  {
    question: "Who developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Google", correct: false },
      { text: "Netscape", correct: true },
    ],
  },
  {
    question: "What is a function in JavaScript?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A type of variable", correct: false },
      {
        text: "A block of code designed to perform a particular task",
        correct: true,
      },
      { text: "A database table", correct: false },
    ],
  },
  {
    question: "What is an object in JavaScript?",
    answers: [
      { text: "A database table", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "A type of variable", correct: false },
      { text: "A standalone entity with properties and type", correct: true },
    ],
  },
  {
    question: "What is the DOM in JavaScript?",
    answers: [
      {
        text: "Document Object Model, a programming interface for web documents",
        correct: true,
      },
      { text: "A JavaScript library", correct: false },
      { text: "A type of database", correct: false },
      { text: "A CSS framework", correct: false },
    ],
  },
  {
    question: "What is a variable in JavaScript?",
    answers: [
      { text: "A type of function", correct: false },
      { text: "A database table", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "A container for storing data values", correct: true },
    ],
  },
  {
    question: "What is an array in JavaScript?",
    answers: [
      { text: "A type of function", correct: false },
      { text: "A database table", correct: false },
      {
        text: "A special variable, which can hold more than one value at a time",
        correct: true,
      },
      { text: "A CSS rule", correct: false },
    ],
  },
  {
    question: "What is a string in JavaScript?",
    answers: [
      { text: "A database table", correct: false },
      { text: "A sequence of characters", correct: true },
      { text: "A type of function", correct: false },
      { text: "A CSS rule", correct: false },
    ],
  },
  {
    question: "What is the purpose of JavaScript in web development?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A type of function", correct: false },
      { text: "A database table", correct: false },
      { text: "To make web pages interactive and dynamic", correct: true },
    ],
  },
  {
    question: "What is an event in JavaScript?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A type of function", correct: false },
      { text: "A database table", correct: false },
      {
        text: "A signal to the code that something has happened",
        correct: true,
      },
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
  let quote =
    "JavaScript is the backbone of modern web development and enables interactive and complex web experiences. - Anonymous";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture16"; // Replace with your lecture page URL
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
