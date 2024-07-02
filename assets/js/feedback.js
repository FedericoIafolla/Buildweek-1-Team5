const text = document.getElementById("myText");
const stelle = document.querySelectorAll("span");
let indicecliccato = 0;
window.addEventListener('load', init);

function init() {
    stelle.forEach((element, i) => {
        element.addEventListener("click", function () {
            colorstar(i);
            indicecliccato=i;
        })
        element.addEventListener("mouseover", function () {
            deselect();
            colorstar(i);



        })
        element.addEventListener("mouseout", function () { 
            deselect();
            if (indicecliccato>0) {
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
        alert("Ciao");
        text.value = "";
    }
})
link2.addEventListener("click", function(){
    text.value = "";})