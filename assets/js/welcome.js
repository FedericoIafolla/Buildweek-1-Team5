const check = document.getElementById("myCheckbox");
const btnProceed = document.getElementById("btnProceed");

window.addEventListener("load", init())

function init() {
    check.checked=false;
    console.log(check);
}

check.addEventListener("click", function () {
    if (check.checked) {
        btnProceed.disabled = false;
    }
    else {
        btnProceed.disabled = true; 
    }
}
)

// btnProceed.addEventListener("click", function () { 
    
//     console.log(check);
// });

//creiamo una funzione per abilitare il button quando il checkbox è checked


// checkbox.addEventListener('change', () => {
//   button.disabled = !checkbox.checked;