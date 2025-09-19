const QUESTION_TIME = 15; // seconds
let currentQuestionIndex = 0;
let questions = [];
let score = 0;

function test() {
    console.log("This is a test function from game.js");
}

async function wait(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * t);
  });
}   

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    console.log("Showing question:", question);

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