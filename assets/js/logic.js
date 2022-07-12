var score = 0;
var questionIndex = 0;
var timer = document.querySelector('#timer');
var start = document.querySelector('#start');
var questionsSection = document.querySelector('#questions');
var container = document.querySelector('#container');

// timer setup
var secondsLeft = 80;
var holdInterval = 0;
var penalty = 10;

var olCreate = document.createElement('ol');

// starts timer when you click
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

// questions appear on page
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

// adding feedback after selecting answer, penalty added 
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

// All Done page
function allDone() {
    questionsSection.innerHTML = "";
    timer.innerHTML = "";

    // Heading: All Done!
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsSection.appendChild(createH1);

    // Paragraph element
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsSection.appendChild(createP);

    // Final score is pulled from time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsSection.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";
    questionsSection.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsSection.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";
    questionsSection.appendChild(createSubmit);



    // Initials and score stored on local
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var finalScores = localStorage.getItem("finalScores");
            if (finalScores === null) {
                finalScores = [];
            } else {
                finalScores = JSON.parse(finalScores);
            }
            finalScores.push(finalScore);
            var newScore = JSON.stringify(finalScores);
            localStorage.setItem("finalScores", newScore);
            window.location.replace("scores.html");
        }
    });
}