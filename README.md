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

1. **Pagina di benvenuto**: `index.html` Quando si accede alla pagina di benvenuto, verrà chiesto di accettare le condizioni d'uso. Una volta accettate, si può procedere alla pagina del benchmark.
2. **Pagina del benchmark**: `benchmark.html` Nella pagina del benchmark, troviamo una serie di domande tecniche. Ogni domanda è temporizzata e si può rispondere solo una volta. Se si cambia scheda o si apre una nuova finestra, la domanda diventa invalida. Il benchmark ha una durata di circa 0-5 minuti.
3. **Pagina dei risultati**: `results.html`  Al completamento del quiz l'utente può visualizzare (anche graficamente) il punteggio ottenuto con la percentuale di risposte corrette e sbagliate. L’esito del quiz è dato dal rapporto tra risposte corrette e risposte errate in percentuale, raffigurate in un grafico sotto forma di anello aventi due colori distinti, azzurro per le risposte corrette e viola per le risposte errate. Per il superamento del quiz è necessario raggiungere il 60% di risposte corrette, in tal caso all’interno del grafico sarà presente un breve messaggio di congratulazioni con la conferma dell’esito positivo. Nel caso non si fosse raggiunta la predetta percentuale, l’esito del quiz sarà negativo e all’interno del grafico comparirà la conferma. Ai lati del grafico saranno illustrate le percentuali delle risposte, a sinistra quelle corrette invece a destra quelle errate. Sotto alle percentuali sono presenti i numeri che indicano la quantità delle domande corrette e la quantità delle domande errate da 0 a 10. Per passare alla pagina successiva è presente un bottone che consente di passare alla pagina del feedback.
4. **Pagina di feedback**: `feedback.html` Dopo aver completato il benchmark, l’utente può lasciare un feedback raffigurato con delle stelle selezionabili con un click dove il parere negativo è zero, ovvero che nessuna stella viene selezionata, fino al 10 dove tutte le stelle vengono selezionate.. Questo aiuta a migliorare il progetto per le future applicazioni. Sotto ad esso si aggiunge un commento descrittivo dell’esperienza effettuata ed un bottone selezionabile per ottenere maggiori informazioni. Selezionando il bottone delle info si accede al sito ufficiale di Epicode.

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
        
    
    <aside>
    🚨 ADD-ON: FUNZIONALITA DI ANTICHEAT
    
    Queste due parti del codice costituiscono il meccanismo anticheat. Il listener monitora il comportamento dell'utente e, se rileva un'azione sospetta (come uscire dalla pagina), attiva la funzione `endQuizOnLeave` per terminare il quiz immediatamente e registrare tutte le domande non risposte come errate.
    
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
        
    </aside>
    
- **🔢  Pagina dei risultati**
    1. **Plugin `doughnutLabel`**:
        
        `doughnutLabel` è un plugin personalizzato per il grafico a ciambella. Gestisce il disegno e la posizione delle etichette all'interno del grafico, includendo la scelta del font e dei colori.
        
        ```jsx
        const doughnutLabel = {
          id: "doughnutLabel",
          beforeDraw: function (chart, args, pluginOptions) {
            const { ctx, data } = chart;
            ctx.save();
            const centerX = chart.width / 2;
            const centerY = chart.height / 2 - 75;
        
            const lines = pluginOptions.text.split("\\n");
            const fontSize = pluginOptions.fontSize || 12;
            const lineHeight = pluginOptions.lineHeight || 1.5;
            const boldFont = `${fontSize * 1.6}px sans-serif`;
            const regularFont = `${fontSize * 1.1}px sans-serif`;
        
           ctx.textAlign = "center";
        
            lines.forEach((line, index) => {
              if (index < 2) {
                ctx.font = boldFont;
                if (index === 1) {
                  ctx.fillStyle = pluginOptions.colorSecondLine;
                } else {
                  ctx.fillStyle = pluginOptions.color;
                }
              } else {
                ctx.font = regularFont;
                ctx.fillStyle = pluginOptions.color;
              }
        
              ctx.fillText(line, centerX, centerY + index * fontSize * lineHeight);
            });
        
            ctx.restore();
          },
        };
        
        ```
        
    2. **Plugin `ShadowPlugin`**:
        
        Questo plugin gestisce l'aggiunta dell'ombra al grafico stesso, migliorando l'aspetto visivo complessivo del grafico.
        
        ```jsx
        const ShadowPlugin = {
          id: "shadowPlugin",
          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
          },
        };
        ```
        
    3. **Event Listener per DOMContentLoaded**:
        
        Questo evento gestisce il caricamento completo del documento HTML e l'inizializzazione del grafico a ciambella basato sui risultati del quiz memorizzati in `localStorage`. Imposta anche il contenuto delle statistiche e decide quale messaggio mostrare all'interno del grafico in base alla percentuale di risposte corrette.
        
        ```jsx
        document.addEventListener("DOMContentLoaded", function () {
          const quizResults = JSON.parse(localStorage.getItem("quizResults"));
        
          if (quizResults) {
            
            //...
        
            if (correctAnswersPercentageNumber >= 60) {
              text =
                "Congratulazioni!\\nHai superato l'esame.\\n\\nTi invieremo il certificato\\ntra pochi minuti.\\nControlla la tua email\\n(inclusa la cartella spam/promozioni)";
              colorSecondLine = "#01FBFC";
        
         poof(); // Funzione non definita nel codice fornito, potrebbe essere esterna
            } else {
              text =
                "Ci dispiace\\nNon hai superato l'esame\\n\\nSarai contattato dal tuo insegnante\\nnei prossimi giorni";
              colorSecondLine = "#C2128D";
            }
        
            new Chart(ctx, {
              type: "doughnut",
              data: {
                labels: ["Sbagliate", "Corrette"],
                datasets: [
                  {
                    data: [quizResults.wrong, quizResults.correct],
                    backgroundColor: ["#C2128D", "#00FFFF"],
                    borderColor: ["#C2128D", "#00FFFF"],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: false,
                maintainAspectRatio: false,
                cutout: "70%",
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                  doughnutLabel: {
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "white",
                    colorSecondLine: colorSecondLine,
                    text: text,
                  },
                },
              },
              plugins: [doughnutLabel, ShadowPlugin],
            });
        
            localStorage.removeItem("quizResults");
          }
        });
        
        ```
        
    
    <aside>
    🎉 ADD-ON: EFFETTO CORIANDOLI
    Al completamento del quiz se il risultato è positivo viene visualizzato un effetto coriandoli (confetti). Ecco come funziona l'intervento dei confetti nel codice:
    
    1. **Condizione di Avvio dei Confetti**:
    La funzione `poof()` viene chiamata quando `correctAnswersPercentageNumber` (percentuale di risposte corrette nel quiz memorizzata nel `localStorage`) è maggiore o uguale a 60%.
        
        ```jsx
        if (correctAnswersPercentageNumber >= 60) {
          // ...
          poof();
        }
        ```
        
        In questo caso, se la percentuale di risposte corrette è almeno il 60%, vengono avviati gli effetti dei confetti.
        
    2. **Funzione `poof()`**:
        - Inizialmente, viene creato un contenitore (`container`) nel DOM che ospiterà i confetti. Questo contenitore è un elemento `<div>` posizionato in modo fisso sopra la pagina.
        - Viene selezionato un tema di colore per i confetti dalla lista `colorThemes`.
        - Viene avviato un ciclo che aggiunge periodicamente nuovi confetti al contenitore, usando la funzione `addConfetto()`. Ogni confetto è un'istanza della classe `Confetto`.
        - Viene avviato un loop usando `requestAnimationFrame()` che gestisce l'aggiornamento e il rendering dei confetti.
        - I confetti vengono aggiornati con la funzione `update()` della classe `Confetto`. Questa funzione gestisce il movimento e la trasformazione dei confetti in base al tempo trascorso.
    3. **Classe `Confetto`**:
        - Ogni confetto è rappresentato da un elemento `<div>` contenente un altro elemento `<div>`. Questi elementi sono gestiti tramite JavaScript per il loro stile e posizionamento.
        - I confetti hanno varie proprietà come dimensioni, posizione iniziale, velocità di movimento e colore.
        - Il movimento dei confetti è animato usando la funzione `update()` che aggiorna la posizione del confetto sulla base del tempo trascorso dall'ultima chiamata.
    
    In sintesi, quando il risultato del quiz indica che la percentuale di risposte corrette è sufficientemente alta (60% o più), la funzione `poof()` viene chiamata per mostrare un effetto visivo di confetti che cadono sulla pagina. Questo crea un'animazione festosa che aggiunge un elemento di feedback visivo positivo per l'utente.
    
    </aside>
    
- **⭐ Pagina di feedback**
    1. **Aggiunta Event listener al click di una stella**
        
        Aggiungiamo gli event listener alle stelle per gestire i clic e i movimenti del mouse.
        
        ```jsx
        element.addEventListener("click", function () {
          if (i === 0 && click === false) {
            click = true;
            colorstar(i);
            indicecliccato = i;
          } else if (i === 0 && click) {
            stars[0].style.color = "white";
            indicecliccato = 0;
            click = false;
          } else {
            colorstar(i);
            indicecliccato = i;
          }
        });
        ```
        
        Quando una stella viene cliccata:
        
        - Se è la prima stella (`i === 0`) e non è stata ancora cliccata (`click === false`), colora la stella e aggiorna lo stato.
        - Se è la prima stella ed è già stata cliccata, deseleziona la stella.
        - Altrimenti, colora la stella e aggiorna l'indice della stella cliccata.
    2. **Gestione del Mouseover**
        
        Quando il mouse passa sopra una stella, tutte le stelle vengono deselezionate e la stella corrente viene colorata.
        
        ```jsx
        element.addEventListener("mouseover", function () {
          deselect();
          colorstar(i);
        });
        ```
        
    3. **Gestione del Mouseout**
        
        Quando il mouse lascia una stella, tutte le stelle vengono deselezionate.
        
        Se c'è una stella selezionata (`indicecliccato > 0` o `click` è `true`), viene ricolorata la stella selezionata.
        
        ```jsx
        element.addEventListener("mouseout", function () {
          deselect();
          if (indicecliccato > 0 || click) {
            colorstar(indicecliccato);
          }
        });
        ```
        
    4. **Funzione `colorstar`**
        
        Colora tutte le stelle fino all'indice `i` incluso con il colore `#00FFFF`.
        
        ```jsx
        function colorstar(i) {
          for (let y = 0; y <= i; y++) {
            stars[y].style.color = "#00FFFF";
          }
        }
        ```
        
    5. **Funzione `deselect`**
        
        Deseleziona tutte le stelle, impostando il loro colore a bianco.
        
        ```jsx
        function deselect() {
          stars.forEach((element, i) => {
            element.style.color = "white";
          });
        }
        ```
        

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
