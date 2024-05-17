const questions = [
  {
    question: "What is Graphic Design?",
    answers: [
      { text: "A craft where professionals create visual content to communicate messages", correct: true },
      { text: "A programming language", correct: false },
      { text: "A database", correct: false },
      { text: "A CSS framework", correct: false },
    ],
  },
  {
    question: "What are some common tools used in Graphic Design?",
    answers: [
      { text: "Adobe Creative Suite (Illustrator, Photoshop, InDesign)", correct: true },
      { text: "Microsoft Word", correct: false },
      { text: "Google Sheets", correct: false },
      { text: "Notepad", correct: false },
    ],
  },
  {
    question: "What is the principle of design that refers to the arrangement of elements?",
    answers: [
      { text: "Balance", correct: true },
      { text: "Contrast", correct: false },
      { text: "Repetition", correct: false },
      { text: "Space", correct: false },
    ],
  },
  {
    question: "What is typography in Graphic Design?",
    answers: [
      { text: "The art and technique of arranging type", correct: true },
      { text: "A type of color scheme", correct: false },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
    ],
  },
  {
    question: "What does RGB stand for in Graphic Design?",
    answers: [
      { text: "Red, Green, Blue", correct: true },
      { text: "Right, Good, Best", correct: false },
      { text: "Real, Graphic, Bold", correct: false },
      { text: "Rapid, Growth, Boost", correct: false },
    ],
  },
  {
    question: "What is a mood board in Graphic Design?",
    answers: [
      { text: "A collection of samples of colors, text, images, etc. that define a design style", correct: true },
      { text: "A type of color scheme", correct: false },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
    ],
  },
  {
    question: "What is kerning in typography?",
    answers: [
      { text: "The adjustment of space between characters in a font", correct: true },
      { text: "A type of color scheme", correct: false },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
    ],
  },
  {
    question: "What is the golden ratio in Graphic Design?",
    answers: [
      { text: "A mathematical ratio that's commonly found in nature and used for creating pleasing, natural looking compositions in design", correct: true },
      { text: "A type of color scheme", correct: false },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
    ],
  },
  {
    question: "What is a vector in Graphic Design?",
    answers: [
      { text: "A type of graphic that uses mathematical equations to create art that is clean, camera ready, and can be scaled infinitely, without any loss of quality or fidelity", correct: true },
      { text: "A type of color scheme", correct: false },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
    ],
  },
  {
    question: "What is a raster in Graphic Design?",
    answers: [
      { text: "A type of color scheme", correct: false },
      { text: "A type of digital image that uses tiny rectangular pixels to create an image", correct: true },
      { text: "A type of balance", correct: false },
      { text: "A type of contrast", correct: false },
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
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture18"; // Replace with your lecture page URL
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
