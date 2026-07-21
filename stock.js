validateStock.onclick = function(){

const nom = document.getElementById("nom").value;
const prenom = document.getElementById("prenom").value;
const entreprise = document.getElementById("entreprise").value;
const email = document.getElementById("email").value;


if(!nom || !prenom || !entreprise || !email){

document.getElementById("stock-message").textContent =
"Merci de remplir tous les champs.";

return;

}


// Enregistrement Google Sheet

fetch("https://script.google.com/macros/s/AKfycbzPkNUhj-Z4K1eEp_pBlYiPxKiYub3_wU8ORDwJgxhnERmWAgTgCbQgPLEIOVpMO2iV/exec", {

method:"POST",

body:JSON.stringify({

nom:nom,
prenom:prenom,
entreprise:entreprise,
email:email

})

});


// Redirection vers la page stock
sessionStorage.setItem(
"stockAccess",
"true"
);
window.location.href = "stock.html";


};
