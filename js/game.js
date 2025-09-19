const QUESTION_TIME = 15; // seconds
let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let hasAnswered = false

var quizPage = document.getElementById("quiz-page");
var choiceList = document.querySelector(".choice-list");

function test() {
    console.log("This is a test function from game.js");
}

async function wait(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * t);
  });
}   

function showQuestion(questionIndex) {
    
    hasAnswered = false;

    const question = questions[questionIndex];
    console.log("Showing question:", question);

    const correctAnswer = question.correct_answer;
    const allAnswers = [...question.incorrect_answers, correctAnswer];
    allAnswers.sort(() => Math.random() - 0.5); // Shuffle answers

    document.getElementById("question").innerHTML = question.question;

    const choiceButtons = choiceList.querySelectorAll(".choice");
    choiceButtons.forEach((button, i) => {
        button.innerHTML = allAnswers[i];
    });

}

async function GameInit(questionsArray) {
    questions = questionsArray;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("quiz-page").classList.remove("hidden");
    
    for (let i = 0; i < questions.length; i++) {
        showQuestion(currentQuestionIndex);
        currentQuestionIndex++;
        console.log("Current Question Index:", currentQuestionIndex);
        await wait(QUESTION_TIME);
    }
}

export { test, GameInit };