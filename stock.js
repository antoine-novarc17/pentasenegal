const produits = [

{
nom:"Connecteur HTA",
categorie:"Raccordement",
quantite:"120",
statut:"En stock"
},

{
nom:"Parafoudre",
categorie:"Protection",
quantite:"35",
statut:"Faible"
},

{
nom:"Câble cuivre",
categorie:"Mise à la terre",
quantite:"0",
statut:"Rupture"
}


];




const modal = document.getElementById("stock-modal");

const button = document.getElementById("validate-stock");

const content = document.getElementById("stock-content");

const table = document.getElementById("stock-table");

const message = document.getElementById("stock-message");





button.addEventListener("click",()=>{


const nom = document.getElementById("nom").value;
const prenom = document.getElementById("prenom").value;
const entreprise = document.getElementById("entreprise").value;
const email = document.getElementById("email").value;



if(!nom || !prenom || !entreprise || !email){

message.textContent="Merci de remplir tous les champs.";

return;

}




modal.style.display="none";


content.classList.remove("hidden");



produits.forEach(p=>{


const ligne=document.createElement("div");

ligne.className="stock-row";


ligne.innerHTML=`

<span>${p.nom}</span>

<span>${p.categorie}</span>

<span class="qty">${p.quantite}</span>

<span class="status ${
p.statut==="En stock" ? "en-stock" :
p.statut==="Faible" ? "faible" :
"rupture"
}">
${p.statut}
</span>

`;


table.appendChild(ligne);


});



});
