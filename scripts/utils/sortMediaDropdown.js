//Eléments DOM du menu dropdown
const dropdownButton = document.querySelector(".dropdown__button");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownOptions = document.querySelector(".dropdown__list-item");

// fonction pour ouvrir / fermer la liste déroulante
function runDropdownMenu(show) {
	let switchCurrentState = dropdownButton.getAttribute("aria-expanded") == "true" ? "false" : "true";
	dropdownButton.setAttribute("aria-expanded", switchCurrentState);
	dropdownList.style.display = show ? "flex" : "none";
}

//Ecoute de l'événement sur le bouton du menu déroulant
dropdownButton.addEventListener("click", () => {
	runDropdownMenu(true);
});

/*TODO list:
1.*/