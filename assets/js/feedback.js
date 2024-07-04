const text = document.getElementById("myText");
const stelle = document.querySelectorAll("span");
let indicecliccato = 0;
let click = false;
window.addEventListener('load', init);

function init() {
    stelle.forEach((element, i) => {
        element.addEventListener("click", function () {
            if (i===0 &&  click===false){
                click=true;
                colorstar(i); 
                indicecliccato=i;
            }
            else if (i===0 && click) {
                stelle[0].style.color = "white";
                indicecliccato=0;
                click=false;
            }
            else {colorstar(i); 
                indicecliccato=i;}

        })
        // Abbiamo utilizzato un Event Listener per il mouseover su una stella
        // dove all'interno richiama la funzione per rimuovere la selezione da tutte le stella
        // e quella per selezionare la stella su cui si è posato il mouse
        //abbiamo lavorato in modo simile per il mouseout nel codice sottostante
        element.addEventListener("mouseover", function () {
            deselect();
            colorstar(i);



        })
        element.addEventListener("mouseout", function () { 
            deselect();
            if (indicecliccato>0 || click) {
                colorstar(indicecliccato);
            }
        })

    });

};
// Utilizziamo questa funzione per colorare le stelle attraverso un ciclo
function colorstar(i) {
    for (let y = 0; y <= i; y++) {
        stelle[y].style.color = "#00FFFF";
    }
}



function deselect() {
    stelle.forEach((element, i) => {
        element.style.color = "white";
    })

}
// Event listener per il taso enter nella textarea
text.addEventListener("keydown", function (event) {
    //se il tasto enter viene premuti
    if (event.key === "Enter") {
        //mostra un messaggio di conferma e resetta il valore della textarea
        alert("Abbiamo ricevuto il tuo feedback!");
        text.value = "";
    }
})
link2.addEventListener("click", function(){
    text.value = "";})
