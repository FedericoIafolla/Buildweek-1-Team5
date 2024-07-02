document.addEventListener('DOMContentLoaded', function() {
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));

    if (quizResults) {
        const resultElement = document.getElementById('quiz-results');
        resultElement.innerHTML = `Risposte Corrette: ${quizResults.correct} <br> Risposte Sbagliate: ${quizResults.wrong}`;
    } else {
        const resultElement = document.getElementById('quiz-results');
        resultElement.innerHTML = 'Nessun risultato disponibile.';
    }

    localStorage.removeItem('quizResults'); // Rimuove i risultati dopo averli mostrati
});