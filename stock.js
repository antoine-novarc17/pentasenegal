const PASSWORD = "PENTA2026";


function login(){

const name = document.getElementById("name").value;
const company = document.getElementById("company").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;


if(password !== PASSWORD){

document.getElementById("error").textContent =
"Mot de passe incorrect";

return;

}


// Envoi des informations au Google Sheet

fetch("TON_URL_GOOGLE_SCRIPT", {

method:"POST",

body: JSON.stringify({
name:name,
company:company,
email:email
})

});


// Affichage du stock

document.getElementById("login-box").style.display="none";

document.getElementById("stock-content").style.display="block";


}
