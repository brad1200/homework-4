// Last page: All Done!
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