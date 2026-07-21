document.addEventListener("DOMContentLoaded", function () {


const modal = document.getElementById("stock-modal");
const validate = document.getElementById("validate-stock");
const close = document.getElementById("close-stock");
const stock = document.getElementById("stock-content");
const message = document.getElementById("stock-message");


// URL Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPkNUhj-Z4K1eEp_pBlYiPxKiYub3_wU8ORDwJgxhnERmWAgTgCbQgPLEIOVpMO2iV/exec";


// Affiche la popup dès l'arrivée sur la page

if(modal){
    modal.style.display = "flex";
}


// Fermeture bouton X

if(close){

    close.addEventListener("click", function(){

        modal.style.display = "none";

    });

}



// Validation formulaire

validate.addEventListener("click", function(){


const nom = document.getElementById("nom").value.trim();
const prenom = document.getElementById("prenom").value.trim();
const entreprise = document.getElementById("entreprise").value.trim();
const email = document.getElementById("email").value.trim();



if(
nom === "" ||
prenom === "" ||
entreprise === "" ||
email === ""
){

message.textContent =
"Merci de remplir tous les champs.";

return;

}


// Message attente

message.textContent = "Enregistrement en cours...";



// Envoi vers Google Sheet

fetch(GOOGLE_SCRIPT_URL, {

    method: "POST",

    body: JSON.stringify({

        nom: nom,
        prenom: prenom,
        entreprise: entreprise,
        email: email

    })

})

.then(response => {


    // Fermeture popup

    modal.style.display = "none";


    // Affiche le stock

    stock.classList.remove("hidden");


    // Charge les produits

    chargerStock();


})

.catch(error => {


    console.error(error);

    message.textContent =
    "Une erreur est survenue. Veuillez réessayer.";

});


});



});





function chargerStock(){


const produits = [

{
produit:"Kcup®",
categorie:"Soudure aluminothermique",
quantite:"120",
statut:"Disponible"
},

{
produit:"Connecteurs",
categorie:"Réseaux électriques",
quantite:"85",
statut:"Disponible"
}

];



const table = document.getElementById("stock-table");


// Sécurité : évite de charger deux fois le stock

if(table.querySelector(".stock-row:not(.stock-head)")){
    return;
}



produits.forEach(p => {


let ligne = document.createElement("div");

ligne.className="stock-row";


ligne.innerHTML = `

<span>${p.produit}</span>
<span>${p.categorie}</span>
<span>${p.quantite}</span>
<span>${p.statut}</span>

`;


table.appendChild(ligne);


});


}
