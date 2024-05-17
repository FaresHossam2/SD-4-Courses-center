const questions = [
 {
  question: "What is the correct syntax to output 'Hello World' in C++?",
  answers: [
    { text: "cout >> 'Hello World';", correct: false },
    { text: "cout << 'Hello World';", correct: true },
    { text: "cout <> 'Hello World';", correct: false },
    { text: "cout >< 'Hello World';", correct: false },
  ],
},
{
  question: "What is the correct way to define a main function in C++?",
  answers: [
    { text: "function main() {}", correct: false },
    { text: "main function() {}", correct: false },
    { text: "main() int {}", correct: false },
    { text: "int main() {}", correct: true },
  ],
},
{
  question: "What is the correct way to declare an integer variable in C++?",
  answers: [
    { text: "var int = 5;", correct: false },
    { text: "integer var = 5;", correct: false },
    { text: "int var = 5;", correct: true },
    { text: "var = 5;", correct: false },
  ],
},
{
  question: "What is the correct way to create a pointer in C++?",
  answers: [
    { text: "pointer p;", correct: false },
    { text: "int *p;", correct: true },
    { text: "p *int;", correct: false },
    { text: "*p int;", correct: false },
  ],
},
{
  question: "What is the correct way to create a reference in C++?",
  answers: [
    { text: "reference r;", correct: false },
    { text: "r &int;", correct: false },
    { text: "int &r;", correct: true },
    { text: "&r int;", correct: false },
  ],
},
{
  question: "What is the correct way to create a string in C++?",
  answers: [
    { text: "s string = 'Hello';", correct: false },
    { text: "string s = 'Hello';", correct: true },
    { text: "str s = 'Hello';", correct: false },
    { text: "s = 'Hello';", correct: false },
  ],
},
{
  question: "What is the correct way to create a constant in C++?",
  answers: [
    { text: "const int c = 5;", correct: true },
    { text: "c const = 5;", correct: false },
    { text: "constant c = 5;", correct: false },
    { text: "c = 5;", correct: false },
  ],
},
{
  question: "What is the correct way to create a function in C++?",
  answers: [
    { text: "myFunction void() {}", correct: false },
    { text: "function myFunction() {}", correct: false },
    { text: "myFunction() void {}", correct: false },
    { text: "void myFunction() {}", correct: true },
  ],
},
{
  question: "What is the correct way to create a class in C++?",
  answers: [
    { text: "MyClass class {}", correct: false },
    { text: "class = MyClass {}", correct: false },
    { text: "class MyClass {}", correct: true },
    { text: "MyClass = class {}", correct: false },
  ],
},
{
  question: "What is the correct way to create an object in C++?",
  answers: [
    { text: "obj MyClass;", correct: false },
    { text: "MyClass obj;", correct: true },
    { text: "object obj = MyClass;", correct: false },
    { text: "obj = MyClass;", correct: false },
  ],
},
{
  question: "What is the correct way to create a public method in a C++ class?",
  answers: [
    { text: "public: void myMethod() {}", correct: true },
    { text: "void myMethod() public {}", correct: false },
    { text: "public void myMethod() {}", correct: false },
    { text: "myMethod() public void {}", correct: false },
  ],
},
{
  question: "What is the correct way to create a private variable in a C++ class?",
  answers: [
    { text: "int myVar; private", correct: false },
    { text: "private int myVar;", correct: false },
    { text: "private: int myVar;", correct: true },
    { text: "myVar private: int;", correct: false },
  ],
},
{
  question: "What is the correct way to include a library in C++?",
  answers: [
    { text: "include <iostream>", correct: false },
    { text: "<iostream> include", correct: false },
    { text: "iostream include", correct: false },
    { text: "#include <iostream>", correct: true },
  ],
},
{
  question: "What is the correct way to use the standard namespace in C++?",
  answers: [
    { text: "namespace std;", correct: false },
    { text: "std::", correct: false },
    { text: "std using namespace;", correct: false },
    { text: "using namespace std;", correct: true },
  ],
},
{
  question: "What is the correct way to create a for loop in C++?",
  answers: [
    { text: "for i = 0; i < 10; i++ {}", correct: false },
    { text: "for (int i = 0; i < 10; i++) {}", correct: true },
    { text: "for (i = 0; i < 10; i++) {}", correct: false },
    { text: "for (int i = 0; i < 10; i++)", correct: false },
  ],
},
{
  question: "What is the correct way to create an if statement in C++?",
  answers: [
    { text: "if (x > y) {}", correct: true },
    { text: "if x > y {}", correct: false },
    { text: "if (x > y)", correct: false },
    { text: "if x > y", correct: false },
  ],
},
{
  question: "What is the correct way to create an array in C++?",
  answers: [
    { text: "arr[5] int;", correct: false },
    { text: "array arr[5];", correct: false },
    { text: "int arr[5];", correct: true },
    { text: "arr[5];", correct: false },
  ],
},
{
  question: "What is the correct way to create a vector in C++?",
  answers: [
    { text: "vector<int> v;", correct: true },
    { text: "v vector<int>;", correct: false },
    { text: "vector v<int>;", correct: false },
    { text: "v<int> vector;", correct: false },
  ],
},
{
  question: "What is the correct way to create a switch statement in C++?",
  answers: [
    { text: "switch x { case 1: break; }", correct: false },
    { text: "switch(x) { case 1: }", correct: false },
    { text: "switch(x) { case 1: break; }", correct: true },
    { text: "x switch { case 1: break; }", correct: false },
  ],
},
{
  question: "What is the correct way to create a while loop in C++?",
  answers: [
    { text: "while x < 10 {}", correct: false },
    { text: "while (x < 10)", correct: false },
    { text: "x < 10 while {}", correct: false },
    { text: "while (x < 10) {}", correct: true },
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
    "C++ is a language which combines the flexibility of assembly language with the power of assembly language. - R. S. Broughton";
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
