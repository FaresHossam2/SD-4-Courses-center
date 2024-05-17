const questions = [
{
  question: "What is the term for the process of teaching a machine learning model?",
  answers: [
    { text: "Debugging", correct: false },
    { text: "Training", correct: true },
    { text: "Compiling", correct: false },
    { text: "Executing", correct: false },
  ],
},
{
  question: "Which of the following is a type of machine learning?",
  answers: [
    { text: "Supervised learning", correct: true },
    { text: "Superior learning", correct: false },
    { text: "Super learning", correct: false },
    { text: "Supreme learning", correct: false },
  ],
},
{
  question: "What is the goal of clustering in machine learning?",
  answers: [
    { text: "To categorize data into clusters", correct: true },
    { text: "To spread data out evenly", correct: false },
    { text: "To find the average of the data", correct: false },
    { text: "To find the highest value in the data", correct: false },
  ],
},
{
  question: "What is a neuron in a neural network?",
  answers: [
    { text: "A type of machine learning model", correct: false },
    { text: "A single node in the network", correct: true },
    { text: "A type of data used in machine learning", correct: false },
    { text: "A programming language for machine learning", correct: false },
  ],
},
{
  question: "What is 'overfitting' in machine learning?",
  answers: [
    { text: "When a model performs poorly on new data", correct: true },
    { text: "When a model is too large to fit in memory", correct: false },
    { text: "When a model is too complex to understand", correct: false },
    { text: "When a model takes too long to train", correct: false },
  ],
},
{
  question: "What is a 'feature' in machine learning?",
  answers: [
    { text: "A characteristic or property of an object", correct: true },
    { text: "A bug or error in the model", correct: false },
    { text: "A type of machine learning model", correct: false },
    { text: "A programming language for machine learning", correct: false },
  ],
},
{
  question: "What is 'TensorFlow'?",
  answers: [
    { text: "A type of machine learning model", correct: false },
    { text: "A programming language for machine learning", correct: false },
    { text: "A library for numerical computation", correct: true },
    { text: "A type of data used in machine learning", correct: false },
  ],
},
{
  question: "What is 'reinforcement learning'?",
  answers: [
    { text: "A type of machine learning where an agent learns to make decisions by trial and error", correct: true },
    { text: "A type of machine learning where an agent learns from labeled data", correct: false },
    { text: "A type of machine learning where an agent learns from unlabeled data", correct: false },
    { text: "A type of machine learning where an agent learns from a teacher", correct: false },
  ],
},
{
  question: "What is a 'decision tree' in machine learning?",
  answers: [
    { text: "A type of data used in machine learning", correct: false },
    { text: "A programming language for machine learning", correct: false },
    { text: "A type of machine learning model", correct: true },
    { text: "A characteristic or property of an object", correct: false },
  ],
},
{
  question: "What is 'deep learning'?",
  answers: [
    { text: "A type of machine learning based on artificial neural networks", correct: true },
    { text: "A type of machine learning based on decision trees", correct: false },
    { text: "A type of machine learning based on linear regression", correct: false },
    { text: "A type of machine learning based on clustering", correct: false },
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
  let quote =
  "Machine learning is the science of getting computers to act without being explicitly programmed Peter Norvig"
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture9"; // Replace with your lecture page URL
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
