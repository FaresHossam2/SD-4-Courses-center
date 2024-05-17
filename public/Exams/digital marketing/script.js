const questions = [
{
  question: "What does SEO stand for in Digital Marketing?",
  answers: [
    { text: "Search Engine Optimization", correct: true },
    { text: "Secure Electronic Office", correct: false },
    { text: "Social Engagement Optimization", correct: false },
    { text: "Sales Efficiency Operation", correct: false },
  ],
},
{
  question: "What is the purpose of a Call To Action (CTA)?",
  answers: [
    { text: "To prompt a user to take a specific action", correct: true },
    { text: "To call the marketing team into a meeting", correct: false },
    { text: "To increase the volume of calls to a business", correct: false },
    { text: "To evaluate the effectiveness of an advertisement", correct: false },
  ],
},
{
  question: "What is a conversion in digital marketing?",
  answers: [
    { text: "When a visitor to your website completes a desired goal", correct: true },
    { text: "Changing the design of your website", correct: false },
    { text: "Converting traditional marketing strategies into digital ones", correct: false },
    { text: "The process of turning images into digital formats", correct: false },
  ],
},
{
  question: "What does PPC stand for in marketing?",
  answers: [
    { text: "Pay Per Click", correct: true },
    { text: "Publicity, Promotion, Communication", correct: false },
    { text: "Profit Per Customer", correct: false },
    { text: "Product Placement Cost", correct: false },
  ],
},
{
  question: "What is the main advantage of digital marketing?",
  answers: [
    { text: "Ability to interact directly with targeted audiences", correct: true },
    { text: "It is more expensive than traditional marketing", correct: false },
    { text: "It is easier to do than traditional marketing", correct: false },
    { text: "It can only be done on social media", correct: false },
  ],
},
{
  question: "What is 'bounce rate' in digital marketing?",
  answers: [
    { text: "The percentage of visitors who navigate away from the site after viewing only one page", correct: true },
    { text: "The number of bounces a basketball makes", correct: false },
    { text: "The rate at which emails are returned undelivered", correct: false },
    { text: "The rate at which customers leave a store without buying anything", correct: false },
  ],
},
{
  question: "What is the purpose of Google Analytics?",
  answers: [
    { text: "To track and report website traffic", correct: true },
    { text: "To analyze the performance of Google's search engine", correct: false },
    { text: "To provide analytics for physical stores", correct: false },
    { text: "To analyze the performance of your computer", correct: false },
  ],
},
{
  question: "What is a 'lead' in digital marketing?",
  answers: [
    { text: "A potential customer in your target market", correct: true },
    { text: "The leading page of a website", correct: false },
    { text: "A type of metal", correct: false },
    { text: "A command given to a dog", correct: false },
  ],
},
{
  question: "What is 'content marketing'?",
  answers: [
    { text: "A type of marketing that involves the creation and sharing of online material", correct: true },
    { text: "Marketing that is content with its results", correct: false },
    { text: "Marketing that involves a lot of paperwork", correct: false },
    { text: "Marketing that involves a lot of happy customers", correct: false },
  ],
},
{
  question: "What is 'social media marketing'?",
  answers: [
    { text: "The use of social media platforms to promote a product or service", correct: true },
    { text: "Marketing that involves a lot of social events", correct: false },
    { text: "Marketing that involves a lot of media coverage", correct: false },
    { text: "Marketing that involves a lot of social interaction", correct: false },
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
let quote = "Marketing is no longer about the stuff that you make, but about the stories you tell. - Seth Godin";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture8"; // Replace with your lecture page URL
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
