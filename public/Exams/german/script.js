const questions = [
{
  question: "Was ist das deutsche Wort für 'apple'?",
  answers: [
    { text: "Apfel", correct: true },
    { text: "Birne", correct: false },
    { text: "Orange", correct: false },
    { text: "Banane", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'dog'?",
  answers: [
    { text: "Hund", correct: true },
    { text: "Katze", correct: false },
    { text: "Maus", correct: false },
    { text: "Vogel", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'house'?",
  answers: [
    { text: "Haus", correct: true },
    { text: "Auto", correct: false },
    { text: "Baum", correct: false },
    { text: "Stuhl", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'book'?",
  answers: [
    { text: "Buch", correct: true },
    { text: "Tisch", correct: false },
    { text: "Stift", correct: false },
    { text: "Tür", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'hello'?",
  answers: [
    { text: "Hallo", correct: true },
    { text: "Tschüss", correct: false },
    { text: "Ja", correct: false },
    { text: "Nein", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'goodbye'?",
  answers: [
    { text: "Tschüss", correct: true },
    { text: "Hallo", correct: false },
    { text: "Ja", correct: false },
    { text: "Nein", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'yes'?",
  answers: [
    { text: "Ja", correct: true },
    { text: "Nein", correct: false },
    { text: "Bitte", correct: false },
    { text: "Danke", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'no'?",
  answers: [
    { text: "Nein", correct: true },
    { text: "Ja", correct: false },
    { text: "Bitte", correct: false },
    { text: "Danke", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'please'?",
  answers: [
    { text: "Bitte", correct: true },
    { text: "Danke", correct: false },
    { text: "Ja", correct: false },
    { text: "Nein", correct: false },
  ],
},
{
  question: "Was ist das deutsche Wort für 'thank you'?",
  answers: [
    { text: "Danke", correct: true },
    { text: "Bitte", correct: false },
    { text: "Ja", correct: false },
    { text: "Nein", correct: false },
  ],
},
//   // Add more questions here...
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
  let quote =
    "German is the language of thinkers and poets. - Johann Wolfgang von Goethe"
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture1"; // Replace with your lecture page URL
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
