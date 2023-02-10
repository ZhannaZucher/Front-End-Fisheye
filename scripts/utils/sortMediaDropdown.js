//Eléments DOM du menu dropdown
const dropdownButton = document.querySelector(".dropdown__button");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownOptions = document.querySelectorAll(".dropdown__list-item");

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

//fermeture du dropdown avec ESC
dropdownList.addEventListener("keydown", function (event) {
	if (dropdownList.style.display = "flex" && event.key === "Escape") {
	runDropdownMenu(false);		
	}
});

//Appel de la fonction gérant les options pour chaque option onclick et sur événement du clavier
dropdownOptions.forEach((option) => {
	option.addEventListener("click", () => selectOption(option));
	option.addEventListener("keydown", (event) => {
		if (event.key == "Enter") {
			selectOption(option);
		}
	});
});

/*TODO list:	
1. faire une fonction qui :
a. OK choisit une option pour trier
b. OK communique option choisie a la fonction sort(à créer également à part)
c. OK gère aria-selected true/false
d. OK met le paramètre show=false pour la fonction runDropdownMenu pour pouvoir fermer la liste déroulante une fois option selectionnée
e. OK injecte le text de l'option choisie dans le contenu du button fermer/ouvrir dropdown?
*/
function selectOption(option) {
	if (option.getAttribute("aria-selected") == "false") {
		//on met à false la valeur booléenne de l'attribut "aria-selected" de l'option mise à "true" par défaut:
		let unselectedOption = document.querySelector(`.dropdown__list-item[aria-selected="true"]`);
		unselectedOption.setAttribute("aria-selected", "false");
		//on appelle la fonction sortMedia sur l'option choisie(à faire): sortMedia(option.dataset.name);
		//on injecte le text de l'option choisie dans le contenu du button fermer/ouvrir dropdown:
		dropdownButton.innerText = option.innerText;
		//dropdownList.insertBefore(option, dropdownList.firstChild);
	}
	//on met l'argument de la fonction runDropdownMenu à false pour pouvoir fermer le dropdown
	runDropdownMenu(false);
	option.setAttribute("aria-selected", "true");
};