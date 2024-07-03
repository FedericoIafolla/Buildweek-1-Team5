// setta le variabili, gli indici, il timer, le risposte corrette e sbagliate, se si vuole aggiungere che la risposta giusta sia variabile.. Io mi tiro fuori, non ne voglio sapere nulla, sparisco, scappo in messico, addios 

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

let questionLenght = questions.length;
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const questionParagraph = document.getElementById('questionCounter');
let currentQuestionIndex = 0;
let timeLeft = 10;
let timer;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = 1;
let selectedAnswer = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// inizializza il quiz, imposta gli indici a zero e aggiunge un event listener al pulsante per passare alla domanda successiva, avvia la sequenza della prima domanda chiamando setnexquestion

function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    resultElement.innerHTML = '';
    shuffle(questions); // Mescola le domande prima di iniziare il quiz
    nextButton.addEventListener('click', () => {
        clearInterval(timer); // Ferma il timer corrente
        if (selectedAnswer !== null) {
            const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex(answer => answer === questions[currentQuestionIndex].correct);
            if (selectedAnswer === correctAnswerIndex) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
            selectedAnswer = null; // reset the selected answer
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            showResults();
        }
    });
}

nextButton.addEventListener('click', function () {
    if (currentQuestion < 10) {
        currentQuestion++;
        questionParagraph.innerHTML = `QUESTION ${currentQuestion}<span>/10</span>`;
    }
});

// prepara e visualizza la prossima domanda

setNextQuestion();

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

// imposta il testo della domanda, crea un pulsante per ogni risposta e aggiunge event listener a ciascuno per gestire la risposta

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

// ripristina lo stato iniziale dell'interfaccia prima di mostrare una domanda

function resetState() {
    clearInterval(timer);
    nextButton.disabled = true;
    timerElement.innerText = '10';
    timeLeft = 10;
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// gestisce la selezione di una risposta, ma non incrementa i conteggi delle risposte

function selectAnswer(index) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('selected');
    });
    selectedAnswer = index;
    answerButtonsElement.children[index].classList.add('selected');
    nextButton.disabled = false; // Abilita il pulsante "PROCEDI"
}

// avvia il timer per la domanda corrente, se il tempo scade incrementa il conteggio delle risposte sbagliate e passa alla domanda successiva

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
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
    }, 1000);
}

// mostra i risultati del quiz, salva i risultati nel localStorage e reindirizza l'utente alla pagina dei risultati

function showResults() {
    localStorage.setItem('quizResults', JSON.stringify({ correct: correctAnswers, wrong: wrongAnswers,total: questionLenght}));
    window.location.href = 'results.html';
}

// scatena l'inferno

startQuiz();