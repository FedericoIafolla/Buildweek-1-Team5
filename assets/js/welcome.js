const check = document.getElementById("myCheckbox");
const btnProceed = document.getElementById("btnProceed");
const link = document.getElementById("link");
const vuoto = document.getElementById("vuoto");
const pieno = document.getElementById("pieno");
window.addEventListener("load", init);

function init() {}

// "Ascolta" il click sul checkbox
link.addEventListener("click", function () {
  check.checked = false;
});

// Funzione che abilita il pulsante "Proceed" dopo il checkbox
check.addEventListener("click", function () {
  if (check.checked) {
    btnProceed.disabled = false;
    pieno.style.display = "initial";
    vuoto.style.display = "none";
  } else {
    btnProceed.disabled = true;
    pieno.style.display = "none";
    vuoto.style.display = "initial";
  }
});
