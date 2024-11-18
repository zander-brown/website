// Game state
let gameState = {
    score: 0,
    level: 1,
    health: 100,
    currentQuestion: null,
    questions: []
};

// Question bank with varying difficulty
const questionBank = {
    easy: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Hybrid Text Making Language"
            ],
            correct: 0,
            explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages."
        },
        {
            question: "Which programming language is known as the 'language of the web'?",
            options: [
                "Python",
                "Java",
                "JavaScript",
                "C++"
            ],
            correct: 2,
            explanation: "JavaScript is widely known as the 'language of the web' because it's the primary language used for client-side web development."
        }
    ],
    medium: [
        {
            question: "What is the time complexity of binary search?",
            options: [
                "O(n)",
                "O(log n)",
                "O(n²)",
                "O(1)"
            ],
            correct: 1,
            explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each step."
        },
        {
            question: "Which of these is NOT a JavaScript data type?",
            options: [
                "undefined",
                "boolean",
                "string",
                "integer"
            ],
            correct: 3,
            explanation: "In JavaScript, there is no 'integer' type. Numbers are represented by the 'number' data type, which can be both integers and floating-point numbers."
        }
    ],
    hard: [
        {
            question: "What is the main difference between TCP and UDP?",
            options: [
                "TCP is faster than UDP",
                "UDP guarantees packet delivery",
                "TCP provides reliable, ordered delivery",
                "UDP uses more bandwidth"
            ],
            correct: 2,
            explanation: "TCP (Transmission Control Protocol) ensures reliable, ordered delivery of data packets, while UDP (User Datagram Protocol) provides no such guarantees but offers faster transmission."
        },
        {
            question: "Which design pattern is used when you need a single instance of a class throughout the application?",
            options: [
                "Factory Pattern",
                "Singleton Pattern",
                "Observer Pattern",
                "Decorator Pattern"
            ],
            correct: 1,
            explanation: "The Singleton Pattern is used when you want to ensure a class has only one instance and provide a global point of access to it."
        }
    ]
};

// Initialize game
function startGame() {
    gameState = {
        score: 0,
        level: 1,
        health: 100,
        currentQuestion: null,
        questions: []
    };
    updateUI();
    loadQuestions();
    displayNextQuestion();
}

// Load questions based on current level
function loadQuestions() {
    gameState.questions = [];
    if (gameState.level <= 3) {
        gameState.questions = gameState.questions.concat(questionBank.easy);
    }
    if (gameState.level > 2 && gameState.level <= 5) {
        gameState.questions = gameState.questions.concat(questionBank.medium);
    }
    if (gameState.level > 4) {
        gameState.questions = gameState.questions.concat(questionBank.hard);
    }
    // Shuffle questions
    gameState.questions.sort(() => Math.random() - 0.5);
}

// Display next question
function displayNextQuestion() {
    if (gameState.questions.length === 0) {
        loadQuestions();
    }
    
    gameState.currentQuestion = gameState.questions.pop();
    const questionArea = document.getElementById('question-area');
    const question = document.getElementById('question');
    const options = document.getElementById('options');
    
    question.textContent = gameState.currentQuestion.question;
    options.innerHTML = '';
    
    gameState.currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        options.appendChild(button);
    });

    // Hide feedback
    document.getElementById('feedback').style.display = 'none';
}

// Check answer
function checkAnswer(selectedIndex) {
    const isCorrect = selectedIndex === gameState.currentQuestion.correct;
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const explanation = document.getElementById('explanation');
    
    if (isCorrect) {
        gameState.score += 10 * gameState.level;
        feedbackText.textContent = "Correct! ";
        if (gameState.score >= gameState.level * 50) {
            gameState.level++;
            loadQuestions();
        }
    } else {
        gameState.health -= 20;
        feedbackText.textContent = "Incorrect. ";
    }
    
    explanation.textContent = gameState.currentQuestion.explanation;
    feedback.style.display = 'block';
    
    updateUI();
    
    if (gameState.health <= 0) {
        endGame();
        return;
    }
    
    // Display next question after 3 seconds
    setTimeout(displayNextQuestion, 3000);
}

// Update UI elements
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
    const healthFill = document.getElementById('health-fill');
    healthFill.style.width = `${gameState.health}%`;
    healthFill.style.backgroundColor = gameState.health > 50 ? '#4CAF50' : 
                                     gameState.health > 20 ? '#FFC107' : '#F44336';
}

// End game
function endGame() {
    const questionArea = document.getElementById('question-area');
    questionArea.innerHTML = `
        <h3>Game Over!</h3>
        <p>Final Score: ${gameState.score}</p>
        <p>Level Reached: ${gameState.level}</p>
        <button class="btn" onclick="startGame()">Play Again</button>
    `;
}

// Add some basic styles
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        #health-bar {
            width: 100%;
            height: 20px;
            background-color: #ddd;
            border-radius: 10px;
            margin: 10px 0;
        }
        
        #health-fill {
            width: 100%;
            height: 100%;
            background-color: #4CAF50;
            border-radius: 10px;
            transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }
        
        #options {
            display: grid;
            gap: 10px;
            margin: 20px 0;
        }
        
        #feedback {
            margin: 20px 0;
            padding: 15px;
            border-radius: 5px;
            background-color: #f5f5f5;
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: var(--secondary-color);
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .btn:hover {
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});