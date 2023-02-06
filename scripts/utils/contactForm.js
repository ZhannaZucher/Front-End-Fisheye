/*
A faire:
1. OK: récupérer les éléments du DOM
2. OK: fetch data 
3. OK: récupérer le nom du photographe 
4. OK: afficher le bon nom dans le title
5. OK: open modal avec aria-hidden true/false sur modale et body + no scroll + focus sur le btn close + bckground
6. OK: close modal avec escape et aria-hidden true/false + focus sur le btn open  + bckground + effacer les input
7. OK: gérer les focus modal ouverte / modale fermée
8. OK: onsubmit afficher console.log des inputs
*/

//Récupération des éléments du DOM
const modal = document.getElementById("contact-modal");
const background = document.querySelector(".background-modal");
const form = document.querySelector("form");
const title = document.querySelector(".modal-header__title");
const photographerName = document.querySelector(".photograph-header__title"); 
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const contactButton = document.querySelector(".contact-button");
const closeButton = document.querySelector(".close-button");
const sendButton = document.querySelector(".send-button");
const body = document.querySelector("body");
const main = document.getElementById("main");
const inputs = [firstName, lastName, email, message]; 

//Récupération des données des photographes depuis le fichier JSON
async function getDatas() {
    const response = await fetch('data/photographers.json');
    return await response.json();
};

//Récupération du nom du photographe et affichage du titre personnalisé
async function customizeTitle() {
    const data = await getDatas();
    const photographer = data.photographers.find((photographer) => photographer.id === id);
    console.log(photographer.name);
    title.textContent += " " + photographer.name;
};
customizeTitle();

//Lancement du formulaire de contact
function displayModal() {
	modal.style.display = "block";
    background.style.display = "block";
    main.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-hidden", false);
    body.classList.add("noscroll");
}

//Fermeture du formulaire 
function closeModal() {
    modal.style.display = "none";
    background.style.display = "none";
    main.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-hidden", true);
    body.classList.remove("noscroll");
}

//Fermeture du formulaire avec ESC
document.addEventListener("keydown", function(event) {
    if(modal.ariaHidden === "false" && event.key === "Escape") {
        closeModal();
    }
});

//Affichage du contenu du formulaire dans la console, fermeture et reset du formulaire
form.addEventListener('submit', function(event) {
    event.preventDefault();
    inputs.forEach((input) => console.log(input.value));
    closeModal();
    inputs.forEach((input) => (input.value = ""));
});