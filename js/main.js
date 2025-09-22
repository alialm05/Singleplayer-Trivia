import { GameInit } from './game.js';

var getCategoriesURL = "https://opentdb.com/api_category.php"
var getQuestionsURLTemplate = `https://opentdb.com/api.php?amount={questionNumber}&category={category}&difficulty={difficulty}&type=multiple`

var questionNumber = 10
var difficulty = "easy"
var categoryId = 9 // General Knowledge


async function fetchQuestions() {
    const url = getQuestionsURLTemplate
        .replace("{questionNumber}", questionNumber) // integer
        .replace("{category}", categoryId) // integer
        .replace("{difficulty}", difficulty); // string

    const res = await fetch(url)
    const data = await res.json()
    return data.results
}

async function fetchCategories() {

    const res = await fetch(getCategoriesURL)
    const data = await res.json()
    return data.trivia_categories
}

async function populateCategories() {
    const categories = await fetchCategories()
    const categorySelectContainer = document.getElementById("topics-container")
    
    categories.forEach(category => {
        const option = document.createElement("button")
        option.className = "topic-btn"
        option.value = category.id
        option.textContent = category.name
        categorySelectContainer.appendChild(option)

        option.addEventListener("click", function() {
            // Remove 'selected' class from all buttons
            document.querySelectorAll('.topic-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            // Add 'selected' class to the clicked button
            this.classList.add('selected');
            categoryId = this.value;
        });

    })
}

function setDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        console.log(btn.value, selectedDifficulty);
        if (btn.value === selectedDifficulty) {
            btn.classList.add('selected');
            return;
        }
        btn.classList.remove('selected');
    });
}

function setQuestionNumber(selectedNumber) {
    questionNumber = selectedNumber;
    document.querySelector('#question-amount-display').textContent = questionNumber;
}

function startGame() {
    // Hide the lobby page
    document.getElementById("lobby-page").classList.add("hidden");

    let score = 0;
    let currentQuestionIndex = 0;
    let questions = [];

    console.log(`Starting game with ${questionNumber} questions, difficulty: ${difficulty}, category ID: ${categoryId}`);

    fetchQuestions().then(fetchedQuestions => {
        questions = fetchedQuestions;
        console.log(questions);
        GameInit(questions);
    })
    .catch(error => {
        console.error("Error fetching questions:", error);
    });


}

function restart(){
    document.querySelector(".scoreboard-page").classList.add("hidden");
    document.getElementById("lobby-page").classList.remove("hidden");

    // Reset selections
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    difficulty = "easy";
    categoryId = 9;

}

document.addEventListener("DOMContentLoaded", function() {
    populateCategories();
});

window.setDifficulty = setDifficulty;
window.setQuestionNumber = setQuestionNumber;
window.startGame = startGame;
window.restart = restart;