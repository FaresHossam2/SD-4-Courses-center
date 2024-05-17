const questions = [
{
  question: "What is the correct way to comment in Python?",
  answers: [
    { text: "// This is a comment", correct: false },
    { text: "/* This is a comment */", correct: false },
    { text: "# This is a comment", correct: true },
    { text: "<!-- This is a comment -->", correct: false },
  ],
},
{
  question: "How do you create a function in Python?",
  answers: [
    { text: "function myFunction() {}", correct: false },
    { text: "def myFunction():", correct: true },
    { text: "myFunction():", correct: false },
    { text: "function: myFunction()", correct: false },
  ],
},
{
  question: "What is the correct way to create a variable in Python?",
  answers: [
    { text: "var myVariable = 1", correct: false },
    { text: "myVariable := 1", correct: false },
    { text: "myVariable = 1", correct: true },
    { text: "let myVariable = 1", correct: false },
  ],
},
{
  question: "How do you create a list in Python?",
  answers: [
    { text: "myList = []", correct: true },
    { text: "myList = list[]", correct: false },
    { text: "myList = {}", correct: false },
    { text: "myList = list{}", correct: false },
  ],
},
{
  question: "What is the output of print(str(2) * 2)?",
  answers: [
    { text: "4", correct: false },
    { text: "22", correct: true },
    { text: "2 * 2", correct: false },
    { text: "Error", correct: false },
  ],
},
{
  question: "What is the correct way to import a module in Python?",
  answers: [
    { text: "import.module 'moduleName'", correct: false },
    { text: "import moduleName", correct: true },
    { text: "module import 'moduleName'", correct: false },
    { text: "moduleName import", correct: false },
  ],
},
{
  question: "What is the correct way to handle exceptions in Python?",
  answers: [
    { text: "try: ... except 'Exception': ...", correct: false },
    { text: "try: ... catch 'Exception': ...", correct: false },
    { text: "try: ... except Exception: ...", correct: true },
    { text: "try: ... exception 'Exception': ...", correct: false },
  ],
},
{
  question: "What is the correct way to read a file in Python?",
  answers: [
    { text: "open('myfile.txt', 'r')", correct: true },
    { text: "read('myfile.txt')", correct: false },
    { text: "file.open('myfile.txt', 'r')", correct: false },
    { text: "file('myfile.txt', 'r')", correct: false },
  ],
},
{
  question: "What is the correct way to define a class in Python?",
  answers: [
    { text: "class MyClass {}", correct: false },
    { text: "class MyClass:", correct: true },
    { text: "MyClass:", correct: false },
    { text: "class: MyClass", correct: false },
  ],
},
{
  question: "What is the output of print(bool('False'))?",
  answers: [
    { text: "False", correct: false },
    { text: "True", correct: true },
    { text: "Error", correct: false },
    { text: "'False'", correct: false },
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
  window.location.href = "/lecture12"; // Replace with your lecture page URL
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
