const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
        color: "#00FFFF"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

//Array di domande e risposte 
const questions = [
    {
        question: "What does CPU stand for?",
        answers: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"],
        correct: "Central Processing Unit"
    },
    {
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        answers: ["Static", "Private", "Final", "Public"],
        correct: "Final"
    },
    {
        question: "The logo for Snapchat is a Bell.",
        answers: ["True", "False"],
        correct: "False"
    },
    {
        question: "Pointers were not used in the original C programming language; they were added later on in C++.",
        answers: ["True", "False"],
        correct: "False"
    },
    {
        question: "What is the most preferred image format used for logos in the Wikimedia database?",
        answers: [".png", ".jpeg", ".svg", ".gif"],
        correct: ".svg"
    },
    {
        question: "In web design, what does CSS stand for?",
        answers: ["Counter Strike: Source", "Cascading Style Sheet", "Corrective Style Sheet", "Computer Style Sheet"],
        correct: "Cascading Style Sheet"
    },
    {
        question: "What is the code name for the mobile operating system Android 7.0?",
        answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow", "Nougat"],
        correct: "Nougat"
    },
    {
        question: "On Twitter, what is the character limit for a Tweet?",
        answers: ["140", "120", "160", "100"],
        correct: "140"
    },
    {
        question: "Linux was first created as an alternative to Windows XP.",
        answers: ["True", "False"],
        correct: "False"
    },
    {
        question: "Which programming language shares its name with an island in Indonesia?",
        answers: ["Python", "Java", "C", "Jakarta"],
        correct: "Java"
    }
];

let questionLength = questions.length;
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('base-timer-label');
const resultElement = document.getElementById('result');
const questionParagraph = document.getElementById('questionCounter');
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = 1;
let selectedAnswer = null;
// Questa funzione prende l'array e ne rimescola casualmente gli elementi.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    resultElement.innerHTML = '';

    shuffle(questions);

    nextButton.addEventListener('click', () => {
        clearInterval(timerInterval);

        if (selectedAnswer !== null) {
            const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex(answer => answer === questions[currentQuestionIndex].correct);
            if (selectedAnswer === correctAnswerIndex) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
            selectedAnswer = null;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            showResults();
        }
    });
    
    setNextQuestion();
}
// Questa funzione mostra la prossima domanda del quiz, resettando lo stato
//del quiz e avviando il timer
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

nextButton.addEventListener('click', function () {
    if (currentQuestion < 10) {
        currentQuestion++;
        questionParagraph.innerHTML = `QUESTION ${currentQuestion}<span>/10</span>`;
    }
});

function resetState() {
    clearInterval(timerInterval);
    nextButton.disabled = true;
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    timerElement.innerText = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(item) {
    questionElement.innerHTML = `<h1>${item.question}</h1>`;
    item.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(index) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('selected');
    });
    selectedAnswer = index;
    answerButtonsElement.children[index].classList.add('selected');
    nextButton.disabled = false;
}

function onTimesUp() {
    clearInterval(timerInterval);
    wrongAnswers++;
    currentQuestion++;
    questionParagraph.innerHTML = `QUESTION ${currentQuestion}<span>/10</span>`;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResults();
    }
}
// Questa funzione avvia il timer per una domanda, aggiornando il tempo rimanente
// e il cerchio di progressione del timer
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        timerElement.innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}
// Abbiamo utilizzato questa funzione per salvare i riusltati del quiz nel localStorage
// e reindirizza l'utente alla pagina dei risultati
function showResults() {
    localStorage.setItem('quizResults', JSON.stringify({ correct: correctAnswers, wrong: wrongAnswers, total: questionLength }));
    window.location.href = 'results.html';
}

startQuiz();
