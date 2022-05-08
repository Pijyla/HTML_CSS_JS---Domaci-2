const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("questionNumber");
const scoreText = document.getElementById("score");
//const restart = document.getElementById("restart");

let questionCounter;
let score;
const MAX_QUESTIONS = 10;

let acceptingAnswers;

// Get data (questions) from json file
function loadFromFile() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "js.json", false);

  xhr.send();

  xhr.onload = function () {
    if (this.status == 200) {
      //console.log(this.response)
    } else {
      console.log("Something went wrong");
    }
  };

  return xhr.response;
}

let questions = JSON.parse(loadFromFile());

startGame = () => {
  questionCounter = 0;
  score = 0;
  acceptingAnswers = true;
  scoreText.innerText = score;
  availableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
  getNewQuestion();
};

const getRandomQuestions = (arr, n) => {
  let len = arr.length;
  if (n > len) {
    throw new RangeError(
      "getRandomQuestions: more elements taken than available"
    );
  }

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    saveScore();
    return window.location.assign('/congratulations.html');
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  currentQuestion = availableQuestions[0];
  question.innerText = currentQuestion.question;

  answers.forEach((answer) => {
    answer.innerText = currentQuestion[answer.dataset["answer"]];
  });
  //TODO add randomization

  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      if (!acceptingAnswers) {
        return;
      }

      acceptingAnswers = false;

      const clickedAnswer = e.target;
      const answeredLetter = clickedAnswer.dataset["answer"];

      let classToApply = "incorrect";

      if (answeredLetter === currentQuestion.answer) {
        score++;
        scoreText.innerText = score;
        classToApply = "correct";
      }else{
        saveScore();
        return window.location.assign('/end.html');
      }

      // Apply class for correct and incorrect answers
      clickedAnswer.parentElement.classList.add(classToApply);

      setTimeout(() => {
        clickedAnswer.parentElement.classList.remove(classToApply);
        getNewQuestion();
        acceptingAnswers = true;
      }, 1000);
    });
  });
  availableQuestions.shift();
};

function saveScore(){
  const fscore = document.getElementById('score').textContent;
  localStorage.setItem("SCORE", fscore);
  return
}

startGame();