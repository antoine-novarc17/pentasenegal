document.addEventListener("DOMContentLoaded", function () {

const modal = document.getElementById("stock-modal");
const validate = document.getElementById("validate-stock");
const close = document.getElementById("close-stock");
const stock = document.getElementById("stock-content");
const message = document.getElementById("stock-message");

// URL Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPkNUhj-Z4K1eEp_pBlYiPxKiYub3_wU8ORDwJgxhnERmWAgTgCbQgPLEIOVpMO2iV/exec";

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
    const prenom = document.getElementById("prenom").value.trim();
    const entreprise = document.getElementById("entreprise").value.trim();
    const email = document.getElementById("email").value.trim();

    if (
        nom === "" ||
        prenom === "" ||
        entreprise === "" ||
        email === ""
    ) {

        message.textContent = "Merci de remplir tous les champs.";
        return;

    }

    message.textContent = "Enregistrement en cours...";

    fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            entreprise: entreprise,
            email: email
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


/* =========================================================
   STOCK DES PRODUITS
   Pour mettre à jour le stock : modifiez uniquement le
   tableau "produits" ci-dessous.
   ========================================================= */

const produits = [
  { nom: 'Poteaux béton 9m',        categorie: 'Ligne aérienne',    quantite: 42,   statut: 'en-stock' },
  { nom: 'Câble aluminium ACSR',    categorie: 'Ligne aérienne',    quantite: 3800, statut: 'en-stock' },
  { nom: 'Piquets de terre cuivre', categorie: 'Mise à la terre',   quantite: 15,   statut: 'faible' },
  { nom: 'Parafoudres BT',          categorie: 'Protection foudre', quantite: 0,    statut: 'rupture' },
  { nom: 'Électrodes de soudure',   categorie: 'Soudure',           quantite: 260,  statut: 'en-stock' },
  { nom: 'Pylônes télécoms',        categorie: 'Télécoms',          quantite: 6,    statut: 'faible' }
];

const statutLabels = {
    "en-stock": "En stock",
    "faible": "Stock faible",
    "rupture": "Rupture"
};

function renderStock() {

    const table = document.getElementById("stock-table");

    // Empêche d'ajouter deux fois les lignes
    if (table.querySelector(".stock-row:not(.stock-head)")) {
        return;
    }

    produits.forEach(produit => {

        const row = document.createElement("div");
        row.className = "stock-row";
        row.setAttribute("role", "row");

        row.innerHTML = `
            <span role="cell">${produit.nom}</span>
            <span role="cell">${produit.categorie}</span>
            <span role="cell" class="qty">${produit.quantite}</span>
            <span role="cell">
                <span class="status ${produit.statut}">
                    ${statutLabels[produit.statut]}
                </span>
            </span>
        `;

        table.appendChild(row);

    });

}
