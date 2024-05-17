const questions = [
{
  question: "What keyword is used to declare a class in Java?",
  answers: [
    { text: "class", correct: true },
    { text: "Class", correct: false },
    { text: "cls", correct: false },
    { text: "Class()", correct: false },
  ],
},
{
  question: "Which of the following is the correct syntax to output 'Hello World' in Java?",
  answers: [
    { text: "Console.WriteLine('Hello World');", correct: false },
    { text: "print('Hello World');", correct: false },
    { text: "System.out.println('Hello World');", correct: true },
    { text: "cout << 'Hello World';", correct: false },
  ],
},
{
  question: "What is the entry point for all Java programs?",
  answers: [
    { text: "public void main(String[] args)", correct: false },
    { text: "public static void main(String[] args)", correct: true },
    { text: "public static main(String[] args)", correct: false },
    { text: "public void static main(String[] args)", correct: false },
  ],
},
{
  question: "Which of the following is NOT a valid access modifier in Java?",
  answers: [
    { text: "friend", correct: true },
    { text: "public", correct: false },
    { text: "private", correct: false },
    { text: "protected", correct: false },
  ],
},
{
  question: "What does the 'import' keyword do in Java?",
  answers: [
    { text: "It is used to create aliases for the packages", correct: false },
    { text: "It is used to define a scope that contains a set of related objects", correct: false },
    { text: "All of the above", correct: false },
    { text: "It is used to include packages in the program", correct: true },
  ],
},
{
  question: "Which of the following is the correct way to declare an integer variable in Java?",
  answers: [
    { text: "Int num;", correct: false },
    { text: "integer num;", correct: false },
    { text: "num int;", correct: false },
    { text: "int num;", correct: true },
  ],
},
{
  question: "What is the correct way to declare a constant in Java?",
  answers: [
    { text: "constant int x;", correct: false },
    { text: "final int x;", correct: true },
    { text: "int const x;", correct: false },
    { text: "int x constant;", correct: false },
  ],
},
{
  question: "What is the correct way to handle exceptions in Java?",
  answers: [
    { text: "try-catch block", correct: true },
    { text: "if-else block", correct: false },
    { text: "for loop", correct: false },
    { text: "while loop", correct: false },
  ],
},
{
  question: "What keyword is used to create an instance of a class in Java?",
  answers: [
    { text: "this", correct: false },
    { text: "new", correct: true },
    { text: "class", correct: false },
    { text: "instance", correct: false },
  ],
},
{
  question: "What is the base class of all classes in Java?",
  answers: [
    { text: "Object", correct: true },
    { text: "Base", correct: false },
    { text: "Class", correct: false },
    { text: "None of the above", correct: false },
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
let quote = "Java is to JavaScript what car is to Carpet. - Chris Heilmann";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture4"; // Replace with your lecture page URL
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
