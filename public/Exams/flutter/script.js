const questions = [
  {
    question: "What is Flutter?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A programming language", correct: false },
      { text: "A database", correct: false },
      {
        text: "An open-source UI software development kit created by Google",
        correct: true,
      },
    ],
  },
  {
    question: "Who developed Flutter?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Google", correct: true },
      { text: "Facebook", correct: false },
    ],
  },
  {
    question: "What language is used to write Flutter apps?",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
      { text: "Dart", correct: true },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "What is a widget in Flutter?",
    answers: [
      { text: "A database table", correct: false },
      { text: "A CSS rule", correct: false },
      { text: "The basic building block of the UI in Flutter", correct: true },
      { text: "A JavaScript function", correct: false },
    ],
  },
  {
    question: "What is the equivalent of the virtual DOM in Flutter?",
    answers: [
      { text: "Widget tree", correct: true },
      { text: "A JavaScript library", correct: false },
      { text: "A type of database", correct: false },
      { text: "A CSS framework", correct: false },
    ],
  },
  {
    question: "What is a state in Flutter?",
    answers: [
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      { text: "A CSS rule", correct: false },
      {
        text: "Information that can be read synchronously when the widget is built and might change during the lifetime of the widget",
        correct: true,
      },
    ],
  },
  {
    question: "What is a StatefulWidget in Flutter?",
    answers: [
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      {
        text: "A widget that can change—internally or externally—over the lifetime of the widget",
        correct: true,
      },
      { text: "A CSS rule", correct: false },
    ],
  },
  {
    question: "What is a StatelessWidget in Flutter?",
    answers: [
      { text: "A database table", correct: false },
      {
        text: "A widget that describes part of the user interface which can depend on configuration information in the widget itself and in the widget’s parent",
        correct: true,
      },
      { text: "A type of component", correct: false },
      { text: "A CSS rule", correct: false },
    ],
  },
  {
    question: "What is the purpose of the Flutter SDK?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      {
        text: "To develop applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia, and the web from a single codebase",
        correct: true,
      },
    ],
  },
  {
    question: "What is Flutter's rendering engine?",
    answers: [
      { text: "A CSS framework", correct: false },
      { text: "A type of component", correct: false },
      { text: "A database table", correct: false },
      { text: "Skia", correct: true },
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
    "Flutter allows you to build beautiful native apps on iOS and Android from a single codebase. - Google's Flutter team";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture15"; // Replace with your lecture page URL
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
