const questions = [
  {
    question: "What is React?",
    answers: [
      { text: "A JavaScript library for building user interfaces", correct: true },
      { text: "A CSS framework", correct: false },
      { text: "A programming language", correct: false },
      { text: "A database", correct: false },
    ],
  },
  {
    question: "Who developed React?",
    answers: [
      { text: "Google", correct: false },
      { text: "Facebook", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
    ],
  },
  {
    question: "What is JSX in React?",
    answers: [
      { text: "A CSS preprocessor", correct: false },
      { text: "A database query language", correct: false },
      { text: "A type of React component", correct: false },
      { text: "A syntax extension for JavaScript", correct: true },
    ],
  },
  {
    question: "What is a component in React?",
    answers: [
      { text: "A JavaScript function", correct: false },
      { text: "A reusable piece of the UI", correct: true },
      { text: "A CSS rule", correct: false },
      { text: "A database table", correct: false },
    ],
  },
  {
    question: "What is the virtual DOM in React?",
    answers: [
      { text: "A type of database", correct: false },
      { text: "A JavaScript library", correct: false },
      { text: "A copy of the real DOM", correct: true },
      { text: "A CSS framework", correct: false },
    ],
  },
  {
    question: "What is state in React?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A way to store variable data between function calls", correct: true },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
    ],
  },
  {
    question: "What is a prop in React?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      { text: "A way to pass data from parent to child components", correct: true },
    ],
  },
  {
    question: "What is a hook in React?",
    answers: [
      { text: "A CSS rule", correct: false },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      { text: "A function that lets you use state and other React features without writing a class", correct: true },
    ],
  },
  {
    question: "What is Redux in the context of React?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A predictable state container for JavaScript apps", correct: true },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
    ],
  },
  {
    question: "What is React Router?",
    answers: [
      { text: "A collection of navigational components that compose declaratively with your application", correct: true },
      { text: "A CSS framework", correct: false },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
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
let quote = "React makes it painless to create interactive UIs. - Facebook's React.js team";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture11"; // Replace with your lecture page URL
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
