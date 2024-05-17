const questions = [
{
  question: "What keyword is used to define a function in Python?",
  answers: [
    { text: "def", correct: true },
    { text: "function", correct: false },
    { text: "fun", correct: false },
    { text: "define", correct: false },
  ],
},
{
  question: "Which of the following is the correct syntax to output 'Hello World' in Python?",
  answers: [
    { text: "System.out.println('Hello World')", correct: false },
    { text: "console.log('Hello World')", correct: false },
    { text: "print('Hello World')", correct: true },
    { text: "printf('Hello World')", correct: false },
  ],
},
{
  question: "What is the correct way to comment a line in Python?",
  answers: [
    { text: "// This is a comment", correct: false },
    { text: "/* This is a comment */", correct: false },
    { text: "-- This is a comment", correct: false },
    { text: "# This is a comment", correct: true },
  ],
},
{
  question: "Which of the following is NOT a valid data type in Python?",
  answers: [
    { text: "int", correct: false },
    { text: "char", correct: true },
    { text: "str", correct: false },
    { text: "bool", correct: false },
  ],
},
{
  question: "What does the 'import' keyword do in Python?",
  answers: [
    { text: "It is used to create aliases for the modules", correct: false },
    { text: "It is used to define a scope that contains a set of related objects", correct: false },
    { text: "It is used to include external modules in the program", correct: true },
    { text: "All of the above", correct: false },
  ],
},
{
  question: "Which of the following is the correct way to declare a variable in Python?",
  answers: [
    { text: "int x = 10", correct: false },
    { text: "x = 10", correct: true },
    { text: "var x = 10", correct: false },
    { text: "x int = 10", correct: false },
  ],
},
{
  question: "What is the correct way to handle exceptions in Python?",
  answers: [
    { text: "if-else block", correct: false },
    { text: "for loop", correct: false },
    { text: "try-except block", correct: true },
    { text: "while loop", correct: false },
  ],
},
{
  question: "What keyword is used to create a class in Python?",
  answers: [
    { text: "class", correct: true },
    { text: "Class", correct: false },
    { text: "cls", correct: false },
    { text: "Class()", correct: false },
  ],
},
{
  question: "What is the correct way to define a list in Python?",
  answers: [
    { text: "my_list = list()", correct: false },
    { text: "my_list = {}", correct: false },
    { text: "my_list = []", correct: true },
    { text: "my_list = list[]", correct: false },
  ],
},
{
  question: "What is the correct way to define a dictionary in Python?",
  answers: [
    { text: "my_dict = []", correct: false },
    { text: "my_dict = {}", correct: true },
    { text: "my_dict = dict()", correct: false },
    { text: "my_dict = dict[]", correct: false },
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
let quote = "Python is the language of simplicity and power. - Guido van Rossum";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture6"; // Replace with your lecture page URL
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
