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
const doughnutLabel = {
  id: "doughnutLabel",
  beforeDraw: function (chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();
    const centerX = chart.width / 2;
    const centerY = chart.height / 2 - 50;

    const lines = pluginOptions.text.split("\n");
    const fontSize = pluginOptions.fontSize || 12;
    const lineHeight = pluginOptions.lineHeight || 1.5;
    const boldFont = `${fontSize * 1.6}px sans-serif`;
    const regularFont = `${fontSize * 1}px sans-serif`;

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


document.addEventListener("DOMContentLoaded", function () {
  const quizResults = JSON.parse(localStorage.getItem("quizResults"));

  if (quizResults) {
    const correctAnswers = document.getElementById("correct-answers");
    const wrongAnswers = document.getElementById("wrong-answers");
    const correctAnswersPercentage = document.getElementById(
      "correct-answers-percentage"
    );
    const wrongAnswersPercentage = document.getElementById(
      "wrong-answers-percentage"
    );

    correctAnswers.innerHTML = `${quizResults.correct} / ${quizResults.total} questions`;
    wrongAnswers.innerHTML = `${quizResults.wrong} / ${quizResults.total} questions`;

    const correctAnswersPercentageNumber =
      (quizResults.correct / parseInt(quizResults.total)) * 100;
    const wrongAnswersPercentageNumber =
      (quizResults.wrong / parseInt(quizResults.total)) * 100;

    correctAnswersPercentage.innerHTML = `${correctAnswersPercentageNumber}%`;
    wrongAnswersPercentage.innerHTML = `${wrongAnswersPercentageNumber}%`;

    const ctx = document.getElementById("myChart").getContext("2d");

    let text, colorSecondLine;
    if (correctAnswersPercentageNumber >= 60) {
      text =
        "Congratulations!\nYou passed the exam.\n\nWe'll send you the certificate \nin few minutes. Check your email \n(including promotions/spam folder)";
      colorSecondLine = "#01FBFC";
    } else {
      text =
        "We are sorry\nYou failed the exam\n\nYou will be contacted by \nyour teacher in the next few days";
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
            fontSize: 13,
            lineHeight: 1.5,
            color: "white",
            colorSecondLine: colorSecondLine,
            text: text,
          },
        },
      },
      plugins: [doughnutLabel],
    });
  }
  localStorage.removeItem("quizResults");
});
