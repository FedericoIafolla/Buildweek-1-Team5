# README

# **Benchmark Platform EPICODE**

Benvenuti alla Benchmark Platform EPICODE! Si tratta di una web che permette agli utenti di svolgere un quiz con domande a risposta multipla. Le domande sono presentate una alla volta e gli utenti devono selezionare la risposta corretta. Alla fine del quiz, gli utenti possono visualizzare il punteggio ottenuto.

## Tecnologie utilizzata:

- HTML
- CSS
- JavaScript
- Librerie esterne (Chart.js)

## **Utilizzo**

Per utilizzare l'applicazione del quiz, basta aprire il file **`index.html`** in un browser web. Una volta caricata la pagina, l'utente può iniziare il quiz cliccando sul pulsante "Start Quiz". Seguire le istruzioni visualizzate sullo schermo per completare il quiz.

## **Requisiti tecnici**

- Browser web moderno (ad esempio, Google Chrome, Mozilla Firefox)
- Connessione internet

## Struttura

1. **Pagina di benvenuto**: `index.html` Quando accedi alla pagina di benvenuto, ti verrà chiesto di accettare le condizioni d'uso. Una volta accettate, puoi procedere alla pagina del benchmark.
2. **Pagina del benchmark**: `benchmark.html` Nella pagina del benchmark, troverai una serie di domande tecniche. Ogni domanda è temporizzata e puoi rispondere solo una volta. Se cambi scheda o apre una nuova finestra, la domanda diventa invalida. Il benchmark durerà circa 0-5 minuti.
3. **Pagina dei risultati**: `results.html`  Al completamento del quiz l'utente può visualizzare (anche graficamente) il punteggio ottenuto con la percentuale di risposte corrette e sbagliate.
4. **Pagina di feedback**: `feedback.html` Dopo aver completato il benchmark, l’utente può lasciare un feedback sul quiz. Questo aiuta a migliorare il progetto per le future applicazioni.

## Funzionalità

- **🙌 Pagina di benvenuto**
    
    Questo codice gestisce l'interazione dell'utente con una checkbox e un pulsante sulla pagina, e cambia la visualizzazione di alcuni elementi HTML in base alle azioni dell'utente.
    
    1. **Funzione `init`**: 
        
        ```jsx
        function init() {
            check = document.getElementById("myCheckbox");
            btnProceed = document.getElementById("btnProceed");
            link = document.getElementById("link");
            vuoto = document.getElementById("vuoto");
            pieno = document.getElementById("pieno");
        
            check.addEventListener("click", function () {
                if (check.checked) {
                    btnProceed.disabled = false;
                    pieno.style.display = "initial";
                    vuoto.style.display = "none";
                } else {
                    btnProceed.disabled = true;
                    pieno.style.display = "none";
                    vuoto.style.display = "initial";
                }
            });
        
            link.addEventListener("click", function () {
                check.checked = false;
            });
        }
        
        window.addEventListener('load', init);
        
        ```
        
        La funzione viene chiamata al caricamento della pagina. Questa funzione inizializza i riferimenti ai vari elementi HTML, come ad esempio il checkbox, il pulsante "Proceed", il link e i div "vuoto" e "pieno". Questo viene fatto per consentire l'interazione con questi elementi successivamente.
        
    2. **Checkbox Interaction**:
        
        ```jsx
        check.addEventListener("click", function () {
            if (check.checked) {
                btnProceed.disabled = false;
                pieno.style.display = "initial";
                vuoto.style.display = "none";
            } else {
                btnProceed.disabled = true;
                pieno.style.display = "none";
                vuoto.style.display = "initial";
            }
        });
        ```
        
        Quando viene cliccato il checkbox, viene attivato un event listener. Questo event listener controlla lo stato del checkbox. Se è selezionato, disabilita il pulsante "Proceed", rende visibile il div "pieno" e rende invisibile il div "vuoto". Altrimenti, abilita il pulsante "Proceed", rende visibile il div "vuoto" e rende invisibile il div "pieno".
        
    3. **Link Interaction**: Quando viene cliccato il link, viene attivato un event listener. Questo event listener imposta lo stato del checkbox su "non selezionato", disabilitando il pulsante "Proceed", rendendo visibile il div "vuoto" e rendendo invisibile il div "pieno".
        
        ```jsx
        CopyInsert
        link.addEventListener("click", function () {
            check.checked = false;
        });
        ```
        
- **❓ Pagina del benchmark**
    1. **Funzione `startQuiz`**:
    Avvia il quiz mescolando le domande e inizializzando le variabili per il conteggio delle risposte corrette e sbagliate. Aggiunge un listener al pulsante "Next" per passare alla domanda successiva e imposta la prima domanda chiamando `setNextQuestion`.
        
        ```jsx
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
        
        ```
        
    2. **Funzione `setNextQuestion`**:
    Ripristina lo stato iniziale del quiz chiamando `resetState`. Mostra la prossima domanda chiamando `showQuestion` e avvia il timer per la domanda corrente chiamando `startTimer`.
        
        ```jsx
        function setNextQuestion() {
            resetState();
            showQuestion(questions[currentQuestionIndex]);
            startTimer();
        }
        
        ```
        
    3. **Funzione `showQuestion`**:
    Mostra la domanda corrente e i relativi pulsanti per le risposte. Aggiunge un listener a ciascun pulsante di risposta per selezionare una risposta.
        
        ```jsx
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
        
        ```
        
    4. **Funzione `startTimer`**:
    Avvia un intervallo che decrementa il tempo rimanente di un secondo ogni volta. Aggiorna l'elemento del timer nel DOM e chiama `onTimesUp` quando il tempo scade.
        
        ```jsx
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
        
        ```
        
    5. **Funzione `onTimesUp`**:
    Viene chiamata quando il tempo per rispondere a una domanda è scaduto. Incrementa il contatore delle risposte sbagliate e passa alla domanda successiva.
        
        ```jsx
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
        
        ```
        
    6. **Funzione `showResults`**:
    Mostra i risultati del quiz salvando i dati nel `localStorage` e reindirizzando l'utente a una pagina dei risultati.
        
        ```jsx
        function showResults() {
            quizEnded = true; // Imposta il flag che il quiz è terminato
            localStorage.setItem('quizResults', JSON.stringify({ correct: correctAnswers, wrong: wrongAnswers, total: questionLength }));
            window.location.href = 'results.html';
        }
        
        ```
        
    7. **Funzione `shuffle`**:
    Mescola l'array delle domande in modo casuale per garantire che l'ordine delle domande sia diverso ogni volta che il quiz viene eseguito.
        
        ```jsx
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        ```
        
    8. **Funzione `selectAnswer`**:
    Gestisce la selezione di una risposta da parte dell'utente. Evidenzia la risposta selezionata e abilita il pulsante "Next".
        
        ```jsx
        function selectAnswer(index) {
            Array.from(answerButtonsElement.children).forEach(button => {
                button.classList.remove('selected');
            });
            selectedAnswer = index;
            answerButtonsElement.children[index].classList.add('selected');
            nextButton.disabled = false;
        }
        
        ```
        
    9. **Funzioni di gestione del timer (`formatTime`, `setRemainingPathColor`, `calculateTimeFraction`, `setCircleDasharray`)**:
    Gestiscono la visualizzazione e la formattazione del timer. Cambiano il colore del cerchio del timer in base al tempo rimanente.
        
        ```jsx
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
        
        ```
        
    
    Queste funzioni sono fondamentali per la gestione del quiz, garantendo il corretto funzionamento del timer, il cambio delle domande, la gestione delle risposte degli utenti e la visualizzazione dei risultati finali.
    
    <aside>
    💡 FUNZIONALITA DI ANTICHEAT
    
    1. **Listener per controllare se il cursore esce dalla pagina**:
    Questo listener rileva quando il cursore dell'utente esce dalla pagina del quiz. Se il quiz non è già terminato o non è già stato interrotto a causa dell'uscita del cursore, chiama la funzione `endQuizOnLeave` per terminare il quiz.
        
        ```jsx
        document.addEventListener('mouseleave', function() {
            if (!quizEnded && !quizExited) { // Controlla se il quiz non è terminato e se non è già stato terminato per uscita del cursore
                endQuizOnLeave(); // Chiama la funzione per terminare il quiz a causa dell'uscita del cursore
            }
        });
        
        ```
        
    2. **Funzione `endQuizOnLeave`**:
    Questa funzione viene chiamata quando il cursore esce dalla pagina. Termina il quiz, interrompe il timer e imposta il flag `quizExited` per indicare che il quiz è stato terminato a causa dell'uscita del cursore. Inoltre, conteggia tutte le domande non risposte come sbagliate e mostra i risultati.
        
        ```jsx
        function endQuizOnLeave() {
            clearInterval(timerInterval); // Interrompi il timer
            quizExited = true; // Imposta il flag che il quiz è stato terminato per uscita del cursore
        
            // Conta le risposte date sbagliate e le domande non risposte come sbagliate
            wrongAnswers = questionLength - correctAnswers;
        
            showResults(); // Mostra i risultati
        }
        
        ```
        
    
    Queste due parti del codice costituiscono il meccanismo anticheat. Il listener monitora il comportamento dell'utente e, se rileva un'azione sospetta (come uscire dalla pagina), attiva la funzione `endQuizOnLeave` per terminare il quiz immediatamente e registrare tutte le domande non risposte come errate.
    
    </aside>
    
- **🔢  Pagina dei risultati**
    
    
- **⭐ Pagina di feedback**

## Contributors

Il progetto è stato realizzato dal Team 5 come parte del Build Week 1 di EPICODE. 

[@FedericoIafolla](https://github.com/FedericoIafolla)

[@John-9813](https://github.com/John-9813)

[@d-mala](https://github.com/d-mala)

[@Nicolomecca](https://github.com/Nicolomecca) 

[@mary1457](https://github.com/mary1457)

[@Romina-Timis](https://github.com/Romina-Timis)

## **Contatti**

Speriamo che questo README ti sia utile per capire meglio il progetto "Benchmark Platform EPICODE". Se hai altre domande, non esitare a chiedere!

Buona fortuna nel completare il tuo esame!

---

*Questo README fornisce una panoramica dettagliata del progetto "Benchmark Platform EPICODE". Inclusa la sua struttura, le funzionalità e i dettagli per utilizzarlo correttamente.*

