let currentQuestion = 1;
let riskCount = 0; // Counter for answers indicating higher risk
let totalRelevantQuestions = 0; // Counter for total relevant questions

function nextQuestion(answer) {
    if (currentQuestion === 1) {
        let age = parseInt(document.getElementById("age").value);
        if (isNaN(age)) {
            alert("Please enter a valid age.");
            return;
        }
        if (age > 50) {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 2;
    } else if (currentQuestion === 2) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 3;
    } else if (currentQuestion === 3) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 4;
    }
    // Add more relevant questions here
    else if (currentQuestion === 4) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 5;
    } else if (currentQuestion === 5) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 6;
    } else if (currentQuestion === 6) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 7;
    } else if (currentQuestion === 7) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 8;
    } else if (currentQuestion === 8) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 9;
    } else if (currentQuestion === 9) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 10;
    } else if (currentQuestion === 10) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 11;
    } else if (currentQuestion === 11) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        currentQuestion = 12;
    } else if (currentQuestion === 12) {
        if (answer === 'yes') {
            riskCount++;
        }
        totalRelevantQuestions++;
        displayResult();
        return;
    }

    showQuestion(currentQuestion);
}

function showQuestion(questionNumber) {
    let questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        if (index + 1 === questionNumber) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
}

function displayResult() {
    let resultElement = document.getElementById('result');
    let riskPercentage = (riskCount / totalRelevantQuestions) * 100;

    if (riskPercentage > 50) {
        resultElement.textContent = "Based on your answers, it is recommended to consult a doctor for further evaluation.";
    } else {
        resultElement.textContent = "Based on your answers, your risk seems low, but it's still a good idea to have regular check-ups.";
    }
    resultElement.style.display = 'block';
}

// Function to handle form submission for prediction
function handlePredictionForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const form = event.target;
    const formData = new FormData(form);

    // Create an array to store input data
    let inputData = [];

    // Populate array with form data
    for (const [key, value] of formData.entries()) {
        // Split the comma-separated values and parse them as floats
        const values = value.split(',').map(v => parseFloat(v));
        inputData = inputData.concat(values);
    }

    // Validate input values
    if (!validateInput(inputData)) {
        alert("Please enter valid input values.");
        return;
    }

    // Send AJAX request to get prediction
    getPrediction(inputData);
}

// Function to send AJAX request and get prediction
function getPrediction(inputData) {
    // Send POST request to server
    fetch('/get-prediction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        // Display prediction result
        displayPredictionResult(data.result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to display prediction result
function displayPredictionResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}

//Function to validate input values
function validateInput(inputData) {
    // Validate input values
    for (const key in inputData) {
        if (isNaN(inputData[key])) {
            return false;
        }
    }

    return true;
}

// Add event listener to form submission
document.addEventListener('DOMContentLoaded', function () {
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', handlePredictionForm);
    }
});
