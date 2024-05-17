const questions = [
  {
    question: "What does UI stand for in design?",
    answers: [
      { text: "Underlying Infrastructure", correct: false },
      { text: "User Interface", correct: true },
      { text: "Unified Integration", correct: false },
      { text: "Universal Internet", correct: false },
    ],
  },
  {
    question: "What does UX stand for in design?",
    answers: [
      { text: "Unified Exchange", correct: false },
      { text: "Underlying Experiment", correct: false },
      { text: "User Experience", correct: true },
      { text: "Universal Exposition", correct: false },
    ],
  },
  {
    question: "What is the main goal of UX design?",
    answers: [
      { text: "To improve customer satisfaction and loyalty", correct: true },
      { text: "To make the website look attractive", correct: false },
      { text: "To increase the website loading speed", correct: false },
      { text: "To make the website more secure", correct: false },
    ],
  },
  {
    question: "What is a wireframe in UI design?",
    answers: [
      { text: "A type of font used in web design", correct: false },
      { text: "A tool for creating animations", correct: false },
      { text: "A color palette for a website", correct: false },
      {
        text: "A visual guide that represents the skeletal framework of a website",
        correct: true,
      },
    ],
  },
  {
    question: "What is a prototype in UX design?",
    answers: [
      {
        text: "A preliminary version of a product, from which other forms are developed",
        correct: true,
      },
      { text: "A type of font used in web design", correct: false },
      { text: "A tool for creating animations", correct: false },
      { text: "A color palette for a website", correct: false },
    ],
  },
  {
    question: "What is the difference between UI and UX?",
    answers: [
      {
        text: "UI is about the user's experience, UX is about the look and feel of a product",
        correct: false,
      },
      { text: "UI and UX are the same thing", correct: false },
      {
        text: "UI is about the look and feel of a product, UX is about the user's experience using it",
        correct: true,
      },
      {
        text: "UI is about the website loading speed, UX is about the website security",
        correct: false,
      },
    ],
  },
  {
    question: "What is user-centered design?",
    answers: [
      {
        text: "A design philosophy that focuses on making the website look attractive",
        correct: false,
      },
      {
        text: "A design philosophy that focuses on making the website load faster",
        correct: false,
      },
      {
        text: "A design philosophy where the end-user's needs, wants and limitations are a focus at all stages within the design process",
        correct: true,
      },
      {
        text: "A design philosophy that focuses on making the website more secure",
        correct: false,
      },
    ],
  },
  {
    question: "What is a persona in UX design?",
    answers: [
      { text: "A type of font used in web design", correct: false },
      {
        text: "A fictional character created to represent a user type that might use a site, brand, or product in a similar way",
        correct: true,
      },
      { text: "A tool for creating animations", correct: false },
      { text: "A color palette for a website", correct: false },
    ],
  },
  {
    question: "What is usability testing in UX design?",
    answers: [
      {
        text: "A technique used to evaluate a product by testing it on users",
        correct: true,
      },
      {
        text: "A technique used to make the website look attractive",
        correct: false,
      },
      {
        text: "A technique used to increase the website loading speed",
        correct: false,
      },
      {
        text: "A technique used to make the website more secure",
        correct: false,
      },
    ],
  },
  {
    question: "What is responsive design in UI design?",
    answers: [
      { text: "A design that loads quickly", correct: false },
      { text: "A design that responds to user interactions", correct: false },
      {
        text: "An approach to web design that makes web pages render well on a variety of devices and window or screen sizes",
        correct: true,
      },
      { text: "A design that is secure from hackers", correct: false },
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
    "React makes it painless to create interactive UIs. - Facebook's React.js team";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture14"; // Replace with your lecture page URL
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
