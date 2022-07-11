// questions

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },

];

var score = 0;
var questionIndex = 0;
var timer = document.querySelector('#timer');
var start = document.querySelector('#start');
var questionsSection = document.querySelector('#questions');
var container = document.querySelector('#container');

// timer setup
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;

var olCreate = document.createElement('ol');

// click start, starts timer
start.addEventListener('click', function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = 'Time: ' + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
            }
        }, 1000);
    }
    render(questionIndex);
});

// questions on page
function render(questionIndex) {
    questionsSection.innerHTML = '';
    olCreate.innerHTML = '';

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsSection.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        questionsSection.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener('click', (compare));
    })
}

// adding right or wrong after selecting answer, penalty added 
function compare(event) {
    var element = event.target;

    if (element.matches('li')) {
        var createDiv = document.createElement('div');
        createDiv.setAttribute('id', 'createDiv');
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = 'Corrrect!';
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = 'Wrong!';
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
    } else {
        render(questionIndex);
    }
    questionsSection.appendChild(createDiv);
}
