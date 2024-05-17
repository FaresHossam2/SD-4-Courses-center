const questions = [
  {
    question: "What is the synonym of 'happy'?",
    answers: [
      { text: "Sad", correct: false },
      { text: "Joyful", correct: true },
      { text: "Angry", correct: false },
      { text: "Bored", correct: false },
    ],
  },
  {
    question: "What is the antonym of 'up'?",
    answers: [
      { text: "Down", correct: true },
      { text: "Left", correct: false },
      { text: "Right", correct: false },
      { text: "Above", correct: false },
    ],
  },
  {
    question: "What is the past tense of 'run'?",
    answers: [
      { text: "Ran", correct: true },
      { text: "Runned", correct: false },
      { text: "Running", correct: false },
      { text: "Runner", correct: false },
    ],
  },
  {
    question: "What is the plural of 'child'?",
    answers: [
      { text: "Childs", correct: false },
      { text: "Children", correct: true },
      { text: "Childes", correct: false },
      { text: "Childer", correct: false },
    ],
  },
  {
    question: "What is the superlative form of 'good'?",
    answers: [
      { text: "Gooder", correct: false },
      { text: "Goodest", correct: false },
      { text: "Best", correct: true },
      { text: "Better", correct: false },
    ],
  },
  //...
  {
    question: "Which is the correct possessive form of 'it'?",
    answers: [
      { text: "Its", correct: true },
      { text: "It's", correct: false },
      { text: "Its'", correct: false },
      { text: "Itz", correct: false },
    ],
  },
  {
    question: "What is the correct form of 'you are' in contraction?",
    answers: [
      { text: "You're", correct: true },
      { text: "Your", correct: false },
      { text: "Youar", correct: false },
      { text: "Yore", correct: false },
    ],
  },
  {
    question: "Which is the correct past tense of 'go'?",
    answers: [
      { text: "Went", correct: true },
      { text: "Goed", correct: false },
      { text: "Gone", correct: false },
      { text: "Go'd", correct: false },
    ],
  },
  {
    question: "What is the plural form of 'mouse'?",
    answers: [
      { text: "Mouses", correct: false },
      { text: "Mice", correct: true },
      { text: "Mouse's", correct: false },
      { text: "Mouce", correct: false },
    ],
  },
  {
    question: "Which is the correct contraction of 'I will'?",
    answers: [
      { text: "I'll", correct: true },
      { text: "I'will", correct: false },
      { text: "Iwill", correct: false },
      { text: "Iwil", correct: false },
    ],
  },
  //...
  {
    question: "Which is the correct past tense of 'fly'?",
    answers: [
      { text: "Flied", correct: false },
      { text: "Flown", correct: false },
      { text: "Flew", correct: true },
      { text: "Flyed", correct: false },
    ],
  },
  {
    question: "What is the plural form of 'tooth'?",
    answers: [
      { text: "Tooths", correct: false },
      { text: "Teeth", correct: true },
      { text: "Tooth's", correct: false },
      { text: "Toothz", correct: false },
    ],
  },
  {
    question: "Which is the correct contraction of 'we will'?",
    answers: [
      { text: "We'll", correct: true },
      { text: "We'will", correct: false },
      { text: "Wewill", correct: false },
      { text: "We wil", correct: false },
    ],
  },
  {
    question: "Which is the correct past tense of 'see'?",
    answers: [
      { text: "Saw", correct: true },
      { text: "Seen", correct: false },
      { text: "See'd", correct: false },
      { text: "Sees", correct: false },
    ],
  },
  {
    question: "What is the plural form of 'sheep'?",
    answers: [
      { text: "Sheeps", correct: false },
      { text: "Sheep", correct: true },
      { text: "Sheep's", correct: false },
      { text: "Sheepz", correct: false },
    ],
  },
  {
    question: "Which is the correct contraction of 'he is'?",
    answers: [
      { text: "He's", correct: true },
      { text: "Heis", correct: false },
      { text: "He is", correct: false },
      { text: "He'is", correct: false },
    ],
  },
  {
    question: "Which is the correct past tense of 'drink'?",
    answers: [
      { text: "Drank", correct: true },
      { text: "Drinked", correct: false },
      { text: "Drunk", correct: false },
      { text: "Drink'd", correct: false },
    ],
  },
  {
    question: "What is the plural form of 'goose'?",
    answers: [
      { text: "Gooses", correct: false },
      { text: "Geese", correct: true },
      { text: "Goose's", correct: false },
      { text: "Goosez", correct: false },
    ],
  },
  {
    question: "Which is the correct contraction of 'she will'?",
    answers: [
      { text: "She'll", correct: true },
      { text: "She'will", correct: false },
      { text: "Shewill", correct: false },
      { text: "She wil", correct: false },
    ],
  },
  {
    question: "Which is the correct past tense of 'think'?",
    answers: [
      { text: "Thought", correct: true },
      { text: "Thinked", correct: false },
      { text: "Thunk", correct: false },
      { text: "Think'd", correct: false },
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
    "“English doesn't borrow from other languages. English follows other languages down dark alleys, knocks them over and goes through their pockets for loose grammar.” - James D. Nicoll";
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
