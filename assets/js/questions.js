var startBtn = document.getElementById("startBtn");
var question = document.getElementById("question");


var questions = [
    {
        questionText: "How to declare a variable in JavaScript?",
        choices: ["var", "for", "while", "if"],
        answer: "var"
    },
    {
        questionText: "Which is not a primitive data tyoe in JavaScript?",
        choices: ["Boolean", "Number", "String", "Character"],
        answer: "Character"
    },
    {
        questionText: "Which of these is not a logical operator?",
        choices: ["!", "&", "||", "&&"],
        answer: "&"
    }
]

init();

function renderQuestion() {
    questionText = "";
    choices = "";
    answer = "";
}

// start quiz button
startBtn.addEventListener("click", startQuiz);

// go back button
highScoreHeader.addEventListener("click", renderHighScore);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCount();

}

startQuiz();