//Eléments DOM du menu dropdown
const dropdownButton = document.querySelector(".dropdown__button");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownOptions = document.querySelectorAll(".dropdown__list-item");
const portfolioSection = document.querySelector(".portfolio-section");

// fonction pour ouvrir / fermer la liste déroulante
function runDropdownMenu(show) {
	let switchCurrentState = dropdownButton.getAttribute("aria-expanded") == "true" ? "false" : "true";
	dropdownButton.setAttribute("aria-expanded", switchCurrentState);
	dropdownList.style.display = show ? "flex" : "none"; dropdownButton.focus();
}

//Ecoute de l'événement sur le bouton du menu déroulant
dropdownButton.addEventListener("click", () => {
	runDropdownMenu(true); 
});

//fermeture du dropdown avec ESC
dropdownList.addEventListener("keydown", function (event) {
	if (dropdownList.style.display = "flex" && event.key === "Escape") {
		runDropdownMenu(false);
		dropdownButton.focus();	
	};	
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


function selectOption(option) {
	if (option.getAttribute("aria-selected") == "false") {
		//on met à false la valeur booléenne de l'attribut "aria-selected" de l'option mise à "true" par défaut:
		let unselectedOption = document.querySelector(`.dropdown__list-item[aria-selected="true"]`);
		unselectedOption.setAttribute("aria-selected", "false");
		//on appelle la fonction sortMedia pour trier les média 
		sortMedia(option.dataset.name);
		//on injecte le text de l'option choisie dans le contenu du button fermer/ouvrir dropdown:
		dropdownButton.innerText = option.innerText;
	}
	//on met l'argument de la fonction runDropdownMenu à false pour pouvoir fermer le dropdown
	runDropdownMenu(false);
	option.setAttribute("aria-selected", "true");
};


//tri du tableau de média du photographe
function sortMedia(type) {
	let array = [...listOfMedia];
	switch (type) {
		case "likes":
			array.sort((a, b) => b.dataset.likes - a.dataset.likes);
			break;
		case "date":
			array.sort((a, b) => new Date(a.dataset.date).getTime() > new Date(b.dataset.date).getTime() ? 1 : -1);
			break;
		case "title":
			array.sort((a, b) => a.dataset.title.toLowerCase() > b.dataset.title.toLowerCase() ? 1 : -1);
	}
	portfolioSection.innerHTML = "";
	array.forEach((element) => {
		portfolioSection.appendChild(element);
	});
};


