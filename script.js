const quizData = [
    {
        question: "What is the capital of France?",
        options: [
            { id: 'a', text: "London" },
            { id: 'b', text: "Paris" },
            { id: 'c', text: "Berlin" },
            { id: 'd', text: "Rome" }
        ],
        correctAnswer: 'b'
    },
    {
        question: "What is the highest mountain in the world?",
        options: [
            { id: 'a', text: "K2" },
            { id: 'b', text: "Kangchenjunga" },
            { id: 'c', text: "Mount Everest" },
            { id: 'd', text: "Lhotse" }
        ],
        correctAnswer: 'c'
    },
    {
        question: "What is the chemical symbol for gold?",
        options: [
            { id: 'a', text: "Au" },
            { id: 'b', text: "Ag" },
            { id: 'c', text: "Fe" },
            { id: 'd', text: "Cu" }
        ],
        correctAnswer: 'a'
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: [
            { id: 'a', text: "Venus" },
            { id: 'b', text: "Mars" },
            { id: 'c', text: "Jupiter" },
            { id: 'd', text: "Saturn" }
        ],
        correctAnswer: 'b'
    },
    {
        question: "What is the largest ocean on Earth?",
        options: [
            { id: 'a', text: "Atlantic Ocean" },
            { id: 'b', text: "Indian Ocean" },
            { id: 'c', text: "Arctic Ocean" },
            { id: 'd', text: "Pacific Ocean" }
        ],
        correctAnswer: 'd'
    },
];

const quizContent = document.getElementById('quiz-content');
let selectedAnswers = {};
let score = 0;
let currentQuestionIndex = 0;

function renderQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';

    const questionText = document.createElement('h2');
    questionText.className = 'question-text';
    questionText.textContent = currentQuestion.question;

    const optionsList = document.createElement('ul');
    optionsList.className = 'options-list';

    currentQuestion.options.forEach(option => {
        const optionItem = document.createElement('li');
        optionItem.className = 'option-item';

        const optionLabel = document.createElement('label');
        optionLabel.className = 'option-label';

        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `question-${currentQuestionIndex}`;
        optionInput.value = option.id;
        optionInput.className = 'option-input';
        optionInput.checked = selectedAnswers[currentQuestionIndex] === option.id;

        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option.text;

        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(optionText);
        optionLabel.addEventListener('click', () => {
            selectedAnswers[currentQuestionIndex] = option.id;
            renderQuestion(); // Re-render to update selected option styling
        });
        optionItem.appendChild(optionLabel);
        optionsList.appendChild(optionItem);
    });

    questionCard.appendChild(questionText);
    questionCard.appendChild(optionsList);

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.textContent = currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
    submitButton.onclick = () => {
        if (selectedAnswers[currentQuestionIndex] === undefined) {
            alert('Please select an answer.');
            return;
        }

        if (currentQuestionIndex === quizData.length - 1) {
            calculateScore();
            renderResult();
        } else {
            currentQuestionIndex++;
            renderQuestion();
        }
    };

    questionCard.appendChild(submitButton);
    quizContent.innerHTML = '';
    quizContent.appendChild(questionCard);
}

function calculateScore() {
    score = 0;
    quizData.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
}

function renderResult() {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    const resultTitle = document.createElement('h2');
    resultTitle.className = 'result-title';
    resultTitle.textContent = 'Quiz Result';

    const resultScore = document.createElement('p');
    resultScore.className = 'result-score';
    resultScore.textContent = `Your Score: ${score} / ${quizData.length}`;

    // Add feedback for correct and wrong answers
    quizData.forEach((question, index) => {
        const selectedOption = selectedAnswers[index];
        const correctAnswer = question.correctAnswer;
        const questionDiv = document.createElement('div');
        questionDiv.className = 'feedback';
        questionDiv.textContent = `Question ${index + 1}: ${question.question}`;

        if (selectedOption === correctAnswer) {
            questionDiv.classList.add('correct-answer');
            questionDiv.textContent += "  Correct Answer";
        } else {
            questionDiv.classList.add('wrong-answer');
            questionDiv.textContent += `  Wrong Answer, Correct Answer is ${question.options.find(opt => opt.id === correctAnswer).text}`;
        }
        
        resultCard.appendChild(questionDiv);
    });

    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = 'Restart Quiz';
    restartButton.onclick = () => {
        selectedAnswers = {};
        score = 0;
        currentQuestionIndex = 0;
        renderQuestion();
    };

    resultCard.appendChild(resultTitle);
    resultCard.appendChild(resultScore);
    resultCard.appendChild(restartButton);
    quizContent.innerHTML = '';
    quizContent.appendChild(resultCard);
}

renderQuestion();
