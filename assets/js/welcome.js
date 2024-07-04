const check = document.getElementById("myCheckbox");
const btnProceed = document.getElementById("next-btn");
const link =document.getElementById("link")
//Viene definita una funzione 'init' ceh viene chiamata quando la pagina
//web viene caricata
window.addEventListener('load', init);

function init() {
    
}
//Viene aggiunto un event listener al link (link.addEventListener("click", function(){...})). 
//Quando il link viene cliccato, il checkbox (check) viene impostato su false.
link.addEventListener("click", function(){
    check.checked= false;
});

//creiamo una funzione per abilitare il button quando il checkbox è checked
check.addEventListener("click", function () {
    if (check.checked) {
        btnProceed.disabled = false;
    }
    else {
        btnProceed.disabled = true; 
    }
}
);