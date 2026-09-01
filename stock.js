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
console.log({
    nom: nom,
    prenom: prenom,
    entreprise: entreprise,
    email: email
});
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
	{ nom: "Ensemble Montant + Traverse NV57070E EN S355",	    categorie: "Armements",					          quantite: 80,			statut: "en-stock-14-09" },
	{ nom: "Herse d'ancrage simple 1700x70 avec ridoir S355",	categorie: "Armements",					          quantite: 80,			statut: "en-stock-14-09" },
	{ nom: "Traverse double ancrage L70 E1700 S355",		    categorie: "Armements",					          quantite: 80,			statut: "en-stock-14-09" },
	{ nom: "Œillet à rotule norme de 16",				        categorie: "Accessoires de chaines",			  quantite: 1000,		statut: "en-stock-14-09" },
	{ nom: "Pince de suspension 22 à 185mm²",			        categorie: "Accessoires de chaines",			  quantite: 500,		statut: "en-stock-14-09" },
	{ nom: "Pince de suspension 22 à 93mm²",			        categorie: "Accessoires de chaines",			  quantite: 500,		statut: "en-stock-14-09" },
	{ nom: "Bras de tête BTSE",					                categorie: "Réseau HTA",					      quantite: 0,			statut: "en-stock-14-09" },
	{ nom: "Bras horizontal BPSE 70 680 S355",			        categorie: "Réseau HTA",					      quantite: 0,			statut: "en-stock-14-09" },
	{ nom: "Isolateur composite rigide 36 kV LDF:1280mm",		categorie: "Isolateurs",					      quantite: 0,			statut: "en-stock-14-09" },
	{ nom: "Ensemble de suspension BT",				            categorie: "Réseau BT",					          quantite: 1000,		statut: "en-stock-14-09" },
	{ nom: "Ensemble d'ancrage simple BT",				        categorie: "Réseau BT",					          quantite: 1000,		statut: "en-stock-14-09" },
	{ nom: "Connecteurs à perforation simultanée 16 à 95",		categorie: "Connecteurs à perforation",			quantite: 3000,			statut: "en-stock-14-09" },
	{ nom: "Capuchon thermo-rétractable 16-70",			        categorie: "Produits thermo-rétractables",		quantite: 649,			statut: "en-stock-14-09" },
	{ nom: "Etrier 16x70x140 avec 6 écrous",			        categorie: "Accessoires de chaines",			quantite: 1000,			statut: "en-stock-14-09" },
	{ nom: "Isolateur composite 70 kN 1116mm",			        categorie: "Isolateurs",					     quantite: 0,			statut: "en-stock-14-09" },
	{ nom: "Ball socket norme de 16",				            categorie: "Accessoires de chaines",			quantite: 1500,			statut: "en-stock-14-09" },
	{ nom: "Ball socket BS 70",					                categorie: "Accessoires de chaines",			quantite: 500,			statut: "en-stock-14-09" },
	{ nom: "Pince d'ancrage 34 à 148mm²",				        categorie: "Accessoires de chaines",			quantite: 500,			statut: "en-stock-14-09" },
	{ nom: "Attache préformée 54,6 sur ISI-LPI",			    categorie: "Accessoires de chaines",			quantite: 0,			statut: "en-stock-14-09" },
	{ nom: "Feuillard Inox 20x0,4",				                categorie: "Interrupteur aérien à commande manuelle",	quantite: 40,	statut: "en-stock-14-09" },
	{ nom: "Chape Inox 20 (vendues par 100 unités)",		    categorie: "Accessoires de chaines",			quantite: 4000,			statut: "en-stock-14-09" },
];
const statutLabels = {
    "en-stock": "En stock",
    "faible": "Stock faible",
    "rupture": "Rupture"
};

/* 🔧 STATUT "EN STOCK À PARTIR DU JJ/MM"
   Dans le tableau "produits" ci-dessus, au lieu de "en-stock", écrivez
   "en-stock-JJ-MM" (jour puis mois, sur 2 chiffres) pour indiquer une
   date de disponibilité future.
   Exemple : statut: "en-stock-01-02"  →  affiche "EN STOCK À PARTIR DU 01/02" */
const REGEX_DATE_STATUT = /^en-stock-(\d{2})-(\d{2})$/;

function getStatutAffichage(statut) {

    const match = REGEX_DATE_STATUT.exec(statut);

    if (match) {
        const [, jour, mois] = match;
        return {
            classe: "a-venir",
            libelle: `En stock à partir du ${jour}/${mois}`
        };
    }

    return {
        classe: statut,
        libelle: statutLabels[statut] || statut
    };

}

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

        const { classe, libelle } = getStatutAffichage(produit.statut);

        row.innerHTML = `
            <span role="cell">${produit.nom}</span>
            <span role="cell">${produit.categorie}</span>
            <span role="cell" class="qty">${produit.quantite}</span>
            <span role="cell">
                <span class="status ${classe}">
                    ${libelle}
                </span>
            </span>
        `;

        table.appendChild(row);

    });

}
