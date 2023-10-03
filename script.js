

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");
const questionDisplay = document.getElementById("question");
const initialsInput = document.getElementById("initials");
const questionsEl = document.getElementById("questions-container");
const endPage = document.getElementById("end-page");
const finalScoreElement = document.getElementById("final-score"); // Define finalScoreElement


// Function to start the game
function startGame() {
    startButton.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion(currentQuestionIndex);
}

// Function to update the timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft} seconds`;

        // Check if time has run out
        if (timeLeft === 0 || currentQuestionIndex === jsQuestions.length) {
            endGame();
        }
    }
}

// Function to display a question
function displayQuestion(index) {
    if (index < jsQuestions.length) {
        const question = jsQuestions[index];
        const questionElement = document.getElementById("question"); 
        questionElement.textContent = question.question;

        // Create answer choice buttons dynamically
        const choicesContainer = document.getElementById("choices"); 
        choicesContainer.innerHTML = ""; 

        question.choices.forEach((choice, choiceIndex) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", () => checkAnswer(choiceIndex));
            choicesContainer.appendChild(choiceButton);
        });
    } else {
        endGame();
    }
}



// Function to check the user's answer
function checkAnswer(selectedChoiceIndex) {
    if (currentQuestionIndex < jsQuestions.length) {
        const currentQuestion = jsQuestions[currentQuestionIndex];
        if (selectedChoiceIndex === currentQuestion.correctAnswer) {
            // Correct answer, move to the next question
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            // Incorrect answer, subtract time (e.g., 10 seconds)
            timeLeft -= 10;
        }
    } else {
        endGame();
    }
}


// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "Game Over";
    const finalScore = timeLeft;

    // Hide the game container
    const questions = document.getElementById("questions");
    if (questions) {
        questions.style.display = 'none';
    }

    // Show the end container and display the final score
    const endContainer = document.getElementById("end-container");
    if (endContainer) {
        endContainer.style.display = "block";
    }

    // Display the final score
    const finalScoreElement = document.getElementById("final-score");
    if (finalScoreElement) {
        finalScoreElement.textContent = finalScore;
    }
}


startButton.addEventListener("click", startGame);

const scoreForm = document.getElementById("score-form");
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const initials = initialsInput.value;
    const finalScore = timeLeft; 
    console.log(`Initials: ${initials}, Score: ${finalScore}`);
});

const jsQuestions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        choices: ["Styling web pages"," Adding interactivity and functionality to web pages","Defining web page structure","Creating database schemas"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is used to create an array in JavaScript",
        choices: ["array = {}", "array()", "var array = []", "createArray()"],
        correctAnswer: 2
    },
    {
        question: "What does the return statement in a JavaScript function do?",
        choices: ["it ends the function immediately", "It specifies the data type of the function", "It returns a value from the function.", " It defines a local variable within the function."],
        correctAnswer: 2
    },
    {
        question:"Which of the following JavaScript data types is not considered a primitive data type?",
        choices: ["Number", "String", "Object", "Boolean"],
        correctAnswer: 2
    },
    {
        question:"In JavaScript, which loop is used when you want to execute a block of code as long as a condition is true?",
        choices: ["'for' loop", "'while' loop", "'do...while' loop", "'switch' statement"],
        correctAnswer: 1
    }
];
