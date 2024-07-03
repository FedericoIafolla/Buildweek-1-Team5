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
        const correctAnswers = document.getElementById('correct-answers');
        const wrongAnswers = document.getElementById('wrong-answers');
        const correctAnswersPercentage = document.getElementById('correct-answers-percentage');
        const wrongAnswersPercentage = document.getElementById('wrong-answers-percentage');
        correctAnswers.innerHTML = `${quizResults.correct} / ${quizResults.total} questions`;
        wrongAnswers.innerHTML = `${quizResults.wrong} / ${quizResults.total} questions`;
        const correctAnswersPercentageNumber = (quizResults.correct / parseInt(quizResults.total)) * 100;
        const wrongAnswersPercentageNumber = (quizResults.wrong / parseInt(quizResults.total)) * 100;
        correctAnswersPercentage.innerHTML = `${correctAnswersPercentageNumber}%`;
        wrongAnswersPercentage.innerHTML = `${wrongAnswersPercentageNumber}%`;

        const ctx = document.getElementById('myChart').getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Corrette', 'Sbagliate'],
                datasets: [{
                    data: [quizResults.correct, quizResults.wrong],
                    color: 'white',
                    backgroundColor: [
                        '#00FFFF',
                        '#C2128D'
                    ],
                    borderColor: [
                        '#00FFFF',
                        '#C2128D'
                    ],
                    borderWidth: 1,
                }]
            },

            // const doughnutLabel = {
            //     id: 'doughnutLabel',
            //     beforeDraw: function (chart, args, pluginOptions) {
            //         const { ctx, data } = chart;
            //         ctx.save();
            //         const xCoor = chart.getDataserMeta(0).data[0].x;
            //         const yCoor = chart.getDataserMeta(0).data[0].y;
            //         ctx.font = '25px sans-serif';
            //         ctx.fillStyle = 'white';
            //         ctx.fillText(text, xCoor, yCoor);
            //     },

                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    rotation: -Math.PI,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        },
                    }
                }
            });
        //aggiungiamo un div con un titolo e un paragrafo al centro del grafico
    }
    localStorage.removeItem('quizResults');
});


