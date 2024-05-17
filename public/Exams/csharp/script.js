const questions = [
{
  question: "What keyword is used to declare a class in C#?",
  answers: [
    { text: "Class", correct: false },
    { text: "cls", correct: false },
    { text: "class", correct: true },
    { text: "Class()", correct: false },
  ],
},
{
  question: "Which of the following is the correct syntax to output 'Hello World' in C#?",
  answers: [
    { text: "System.out.println('Hello World');", correct: false },
    { text: "print('Hello World');", correct: false },
    { text: "cout << 'Hello World';", correct: false },
    { text: "Console.WriteLine('Hello World');", correct: true },
  ],
},
{
  question: "What is the entry point for all C# programs?",
  answers: [
    { text: "First method", correct: false },
    { text: "Main method", correct: true },
    { text: "C# method", correct: false },
    { text: "Console method", correct: false },
  ],
},
{
  question: "Which of the following is NOT a valid access modifier in C#?",
  answers: [
    { text: "friend", correct: true },
    { text: "public", correct: false },
    { text: "private", correct: false },
    { text: "protected", correct: false },
  ],
},
{
  question: "What does the 'using' keyword do in C#?",
  answers: [
    { text: "It is used to create aliases for the namespaces", correct: false },
    { text: "It is used to define a scope that contains a set of related objects", correct: false },
    { text: "All of the above", correct: false },
    { text: "It is used to include namespaces in the program", correct: true },
  ],
},
{
  question: "Which of the following is the correct way to declare an integer variable in C#?",
  answers: [
    { text: "Int num;", correct: false },
    { text: "integer num;", correct: false },
    { text: "int num;", correct: true },
    { text: "num int;", correct: false },
  ],
},
{
  question: "What is the correct way to declare a constant in C#?",
  answers: [
    { text: "constant int x;", correct: false },
    { text: "const int x;", correct: true },
    { text: "int const x;", correct: false },
    { text: "int x constant;", correct: false },
  ],
},
{
  question: "What is the correct way to handle exceptions in C#?",
  answers: [
    { text: "if-else block", correct: false },
    { text: "for loop", correct: false },
    { text: "try-catch block", correct: true },
    { text: "while loop", correct: false },
  ],
},
{
  question: "What keyword is used to create an instance of a class in C#?",
  answers: [
    { text: "this", correct: false },
    { text: "new", correct: true },
    { text: "class", correct: false },
    { text: "instance", correct: false },
  ],
},
{
  question: "What is the base class of all classes in C#?",
  answers: [
    { text: "Base", correct: false },
    { text: "Class", correct: false },
    { text: "None of the above", correct: false },
    { text: "Object", correct: true },
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
    "C# is not a language for a novice programmer. It is a language for a professional programmer who understands why things are done the way they are"
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture5"; // Replace with your lecture page URL
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
