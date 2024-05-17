const questions = [
{
  question: "What is the process of disseminating information to a large audience?",
  answers: [
    { text: "Mass Communication", correct: true },
    { text: "Interpersonal Communication", correct: false },
    { text: "Intrapersonal Communication", correct: false },
    { text: "Group Communication", correct: false },
  ],
},
{
  question: "Which of the following is not a type of mass media?",
  answers: [
    { text: "Television", correct: false },
    { text: "Radio", correct: false },
    { text: "Newspaper", correct: false },
    { text: "Personal Diary", correct: true },
  ],
},
{
  question: "Who is often called the 'father of modern mass media'?",
  answers: [
    { text: "Marshall McLuhan", correct: true },
    { text: "Noam Chomsky", correct: false },
    { text: "Edward Bernays", correct: false },
    { text: "Walter Lippmann", correct: false },
  ],
},
{
  question: "What is the study of audience analysis in mass communication?",
  answers: [
    { text: "Demographics", correct: true },
    { text: "Psychographics", correct: false },
    { text: "Ethnographics", correct: false },
    { text: "Geographics", correct: false },
  ],
},
{
  question: "What is the 'hypodermic needle theory' in mass communication?",
  answers: [
    { text: "Media's message is directly received and wholly accepted by the receiver", correct: true },
    { text: "Media's message is interpreted differently by different receivers", correct: false },
    { text: "Media's message is largely ignored by the receiver", correct: false },
    { text: "Media's message is only received by those who agree with it", correct: false },
  ],
},
{
  question: "What is 'yellow journalism'?",
  answers: [
    { text: "Journalism that is based upon sensationalism and crude exaggeration", correct: true },
    { text: "Journalism that is based on facts and evidence", correct: false },
    { text: "Journalism that is biased towards a particular political party", correct: false },
    { text: "Journalism that is focused on celebrity news and gossip", correct: false },
  ],
},
{
  question: "What is the role of a 'gatekeeper' in mass communication?",
  answers: [
    { text: "Deciding what news reaches the public", correct: true },
    { text: "Writing news articles", correct: false },
    { text: "Delivering the news on television", correct: false },
    { text: "Designing the layout of a newspaper", correct: false },
  ],
},
{
  question: "What is 'libel' in the context of mass communication?",
  answers: [
    { text: "A written defamatory statement", correct: true },
    { text: "A spoken defamatory statement", correct: false },
    { text: "A true statement that harms someone's reputation", correct: false },
    { text: "A false statement that does not harm someone's reputation", correct: false },
  ],
},
{
  question: "What does the 'FCC' regulate in the United States?",
  answers: [
    { text: "Radio, television, wire, satellite, and cable", correct: true },
    { text: "Newspapers and magazines", correct: false },
    { text: "Books and literature", correct: false },
    { text: "Internet content", correct: false },
  ],
},
{
  question: "What is 'public relations' in the context of mass communication?",
  answers: [
    { text: "Managing the spread of information between an individual or an organization and the public", correct: true },
    { text: "Reporting news to the public", correct: false },
    { text: "Advertising products to the public", correct: false },
    { text: "Entertaining the public", correct: false },
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
let quote = "The speed of communications is wondrous to behold. It is also true that speed can multiply the distribution of information that we know to be untrue. - Edward R. Murrow";
  questionElement.innerHTML = userScore + "<br><br>" + quote;
  questionElement.style.textAlign = "center"; // Align the text at the center
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
  returnButton.style.display = "block"; // Show the return button
}

returnButton.addEventListener("click", () => {
  window.location.href = "/lecture7"; // Replace with your lecture page URL
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
