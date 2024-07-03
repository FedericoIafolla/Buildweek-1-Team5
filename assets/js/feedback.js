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

text.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        alert("Abbiamo ricevuto il tuo feedback!");
        text.value = "";
    }
})
link2.addEventListener("click", function(){
    text.value = "";})
