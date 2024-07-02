const check = document.getElementById("myCheckbox");
const btnProceed = document.getElementById("next-btn");
const link =document.getElementById("link")

window.addEventListener('load', init);

function init() {
    
}

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