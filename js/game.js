import { restartBarAnimation, endBarAnimation, animateChoicesPopUp } from "./animations.js";

const QUESTION_TIME = 15; // seconds
let currentQuestionIndex = 0;
let questions = [];
let score = 0;

var quizPage = document.getElementById("quiz-page");
var choiceList = document.querySelector(".choice-list");
let scoreboard = document.querySelector(".scoreboard-page");

var endSound = new Audio("assets/done.mp3"); // buffers automatically when created
endSound.volume = 0.2;

function test() {
    console.log("This is a test function from game.js");
}

async function conditionalWait(conditionFunc, checkInterval = 100) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (conditionFunc()) {
                clearInterval(interval);
                resolve();
            }
        }, checkInterval);
    });
}

async function wait(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * t);
  });
}   

var Question = {
    hasAnswered: false,
    choices: [],
    correctIndex: -1

}

var Timer = {
    timeLeft: QUESTION_TIME,
    timerInterval: null,
    onEnd: (correctIndex) => {
        console.log("Time's up!");
        Question.hasAnswered = true;
        endBarAnimation();
        showAnswer(correctIndex);
    },
}

const QuestionAnswered = () => {
    return Question.hasAnswered;
}

async function startTimer(timer, correctIndex) {
    timer.timerInterval = setInterval(() => {
        timer.timeLeft--;
        if (timer.timeLeft <= 0) {
            clearInterval(timer.timerInterval);
            timer.onEnd(correctIndex);
        }
    }, 1000);
}

// displays UI to show correct and wrong answers
async function showAnswer(correctIndex) {
    //console.log("Showing correct answer:", correctIndex);

    const choiceButtons = choiceList.querySelectorAll(".choice");
    choiceButtons.forEach((button) => {
        if (button.value == correctIndex) return;
        button.classList.add("wrong");
        
    });

    await wait(2);
}

function onAnswerSelected(selectedIndex, correctIndex, Timer) {
    
    if (Question.hasAnswered) return;
    
    console.log("correct answer:", correctIndex);
    Question.hasAnswered = true;

    // Correct answer
    if (selectedIndex == correctIndex) {
        score+= (Timer.timeLeft * 10);
        console.log("Correct! Score:", score);
        document.querySelector(".user-score").textContent = score;
    }
    clearInterval(Timer.timerInterval);
    showAnswer(correctIndex);

}

// show question and the choices
function showQuestion(questionIndex) {
    
    restartBarAnimation();
    animateChoicesPopUp();

    Question.hasAnswered = false;

    // get current question
    const currentQuestion = questions[questionIndex];
    console.log("Showing question:", currentQuestion);

    // randomizee correct and inccorect answers
    const correctAnswer = currentQuestion.correct_answer;
    const allAnswers = [];

    const correctIndex = Math.floor(Math.random() * 4);
    allAnswers[correctIndex] = correctAnswer;

    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) continue;
        allAnswers[i] = currentQuestion.incorrect_answers.pop();
    }

    console.log("All answers:", allAnswers, "Correct index:", correctIndex);

    // show question text and choices
    document.getElementById("question").innerHTML = currentQuestion.question;

    const choiceButtons = choiceList.querySelectorAll(".choice");
    choiceButtons.forEach((button, i) => {
        button.classList.remove("wrong");
        button.innerHTML = allAnswers[button.value];
    });

    return correctIndex;

}


async function GameInit(questionsArray) {
    questions = questionsArray;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("quiz-page").classList.remove("hidden");
    
    for (let i = 0; i < questions.length; i++) {
        Question.correctIndex = showQuestion(currentQuestionIndex);
        currentQuestionIndex++;

        Timer.timeLeft = QUESTION_TIME;

        startTimer(Timer, Question.correctIndex);

        // wait for the question time
        await conditionalWait(() => Timer.timeLeft <= 0 || QuestionAnswered());
        Timer.onEnd(Question.correctIndex);

        await wait(2);

    }

    endGame();
}

const choiceButtons = choiceList.querySelectorAll(".choice");
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        onAnswerSelected(button.value, Question.correctIndex, Timer);
    });
});

function endGame() {
    console.log("Game over! Final score:", score);
    
    document.getElementById("quiz-page").classList.add("hidden");
    scoreboard.classList.add("fade-in");

    scoreboard.querySelector(".score-value").innerHTML = "Score: " + score;
    scoreboard.classList.remove("hidden");

    endSound.play();

    //const choiceButtons = choiceList.querySelectorAll(".choice");
}

scoreboard.addEventListener('animationend', () => {
  scoreboard.classList.remove('fade-in');
});

export { test, GameInit, endGame };

window.endGame = endGame;