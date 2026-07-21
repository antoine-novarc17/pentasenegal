document.addEventListener("DOMContentLoaded", function () {


const modal = document.getElementById("stock-modal");
const validate = document.getElementById("validate-stock");
const close = document.getElementById("close-stock");
const stock = document.getElementById("stock-content");


// Affiche la popup dès l'arrivée sur la page

modal.style.display = "flex";


// Fermeture bouton X

close.addEventListener("click", function(){

    modal.style.display = "none";

});


// Validation

validate.addEventListener("click", function(){


const nom = document.getElementById("nom").value;
const prenom = document.getElementById("prenom").value;
const entreprise = document.getElementById("entreprise").value;
const email = document.getElementById("email").value;


if(
nom === "" ||
prenom === "" ||
entreprise === "" ||
email === ""
){

document.getElementById("stock-message").textContent =
"Merci de remplir tous les champs.";

return;

}


// Cache popup

modal.style.display = "none";


// Affiche le stock

stock.classList.remove("hidden");


// Charge les produits

chargerStock();


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
