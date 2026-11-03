document.addEventListener("DOMContentLoaded", function () {

const modal = document.getElementById("stock-modal");
const validate = document.getElementById("validate-stock");
const close = document.getElementById("close-stock");
const stock = document.getElementById("stock-content");
const message = document.getElementById("stock-message");

// URL Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOpGMVbAv5K3pWIMX-8SAxrM1heJA0EIRJBQSF_g30ArLzrS-7gvOBSt_udkhfvtQK/exec";

// Affiche la popup dès l'arrivée sur la page
if (modal) {
    modal.style.display = "flex";
}

// Fermeture bouton X
if (close) {
    close.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

// Validation formulaire
validate.addEventListener("click", function () {

    const nom = document.getElementById("nom").value.trim();
    const entreprise = document.getElementById("entreprise").value.trim();

    if (
        nom === "" ||
        entreprise === ""
    ) {

        message.textContent = "Merci de remplir tous les champs.";
        return;

    }

    message.textContent = "Enregistrement en cours...";
console.log({
    nom: nom,
    entreprise: entreprise
});
    fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify({
            nom: nom,
            entreprise: entreprise
        })

    })

    .then(() => {

        modal.style.display = "none";

        stock.classList.remove("hidden");

        renderStock();

    })

    .catch(error => {

        console.error(error);

        message.textContent =
            "Une erreur est survenue. Veuillez réessayer.";

    });

});

});
