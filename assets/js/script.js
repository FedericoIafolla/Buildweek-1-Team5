const check = document.getElementById("myCheckbox");
const btnProceed = document.getElementById("btnProceed");

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

// checkbox.addEventListener('change', () => {
//   button.disabled = !checkbox.checked;