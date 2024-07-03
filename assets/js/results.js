// document.addEventListener('DOMContentLoaded', function() {
//     const quizResults = JSON.parse(localStorage.getItem('quizResults'));

//     if (quizResults) {
//         const resultElement = document.getElementById('quiz-results');
//         resultElement.innerHTML = `Risposte Corrette: ${quizResults.correct} <br> Risposte Sbagliate: ${quizResults.wrong}`;
//     } else {
//         const resultElement = document.getElementById('quiz-results');
//         resultElement.innerHTML = 'Nessun risultato disponibile.';
//     }

//     localStorage.removeItem('quizResults'); // Rimuove i risultati dopo averli mostrati
// });

document.addEventListener('DOMContentLoaded', function () {
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));

    if (quizResults) {
        const resultElement = document.getElementById('quiz-results');
        resultElement.innerHTML = `Risposte Corrette: ${quizResults.correct} <br> Risposte Sbagliate: ${quizResults.wrong}`;

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Corrette', 'Sbagliate'],
                datasets: [{
                    data: [quizResults.correct, quizResults.wrong],
                    backgroundColor: [
                        '#00FFFF',
                        '#C2128D'
                    ],
                    borderColor: [
                        '#00FFFF',
                        '#C2128D'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                cutout: '70%',
            }
        });

        // Use the chart
        document.getElementById('chartContainer').appendChild(ctx.canvas);
    }
    localStorage.removeItem('quizResults');
});