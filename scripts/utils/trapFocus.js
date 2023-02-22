// Fonction qui piège le focus à l'intérieur d'une modale ouverte
const focusInModal = function (event, element) {
	event.preventDefault();
	const focusableSelector = ".close-button, a, button, textarea, input, li[role='option']";
	focusables = Array.from(element.querySelectorAll(focusableSelector));
	
	//Récupération de l'index de l'élément ayant le focus 
	let index = focusables.findIndex(f => f === element.querySelector(":focus"));
	if (event.shiftKey === true) {
		index--;
	} else {
		index++;
	};
	if (index >= focusables.length) {
		index = 0;
	};
	if (index < 0) {
		index = focusables.length - 1;
	};
	//mise de focus sur index 	
	focusables[index].focus();
};

//Ecoute de l'événement du clavier pour savoir sur quel élément appeler la fonction qui gère le focus
window.addEventListener("keydown", function (event) {
	if (event.key === "Tab" && modal.style.display === "block") {
		focusInModal(event, modal);
	} else if (event.key === "Tab" && lightbox.style.display === "block") {
		focusInModal(event, lightbox);
	} else if (event.key === "Tab" && dropdownList.style.display === "flex") {
		focusInModal(event, dropdownList);
	};
});