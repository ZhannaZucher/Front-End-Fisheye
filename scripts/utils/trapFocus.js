// Fonction qui piège le focus à l'intérieur d'une modale ouverte
const focusInModal = function (event, element) {
	event.preventDefault();
	const focusableSelector = ".close-button, a, button, textarea, input, li[role='option']";
	focusables = Array.from(element.querySelectorAll(focusableSelector));
	console.log(focusables);
	//Récupération de l'index de l'élément ayant le focus 
	let index = focusables.findIndex(f => f === element.querySelector(":focus"));
	//console.log(index);
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

/*function trapFocus(element) {
	const focusables = Array.from(element.querySelectorAll(".close-button, a, button, textarea, input"));
	console.log(focusables);

	element.addEventListener("keydown", function (event) {
		if (event.key === "Tab") {
			let index = focusables.findIndex(f => f === element.querySelector(":focus"));
			console.log(index);
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
	});
};*/


/*// Fonction qui piège le focus à l'intérieur de la modale ouverte
function trapFocus(element) {
	console.log("coucou");
	const focusableElements = element.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled])");
	const focusableArray = [...focusableElements];
	let firstElement = focusableArray[0];
	let lastElement = focusableElements[focusableArray.length - 1];
	//logs
	console.log(firstElement);
	console.log(lastElement);
	console.log(focusableArray);
	console.log(element);

	element.addEventListener("keydown", function (event) {
		let isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

		if (!isTabPressed) {
			return;
		};
		if (event.shiftKey) { // "shift + tab" est appuyé 
			if (document.activeElement === firstElement) {
				event.preventDefault();
				//le focus est remis sur le dernier élément avec focus
				lastElement.focus();
				console.log("shiftKey");
				
			} else if (document.activeElement === lastElement) { // "tab" est appuyé 
				event.preventDefault();
				//le focus est remis sur le premier élément avec focus
				firstElement.focus();
				console.log("tab");
			};
		};
	});
};*/


/*const focusableSelector = ".close-button, a, button, textarea, input";
let focusables = [];//!Nodelist

const focusInModal = function (event) {
	event.preventDefault();
	//console.log(focusables);
	//Récupération de l'index de l'élément ayant le focus 
	let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
	//console.log(index);
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
	}
	//mise de focus sur index 
	focusables[index].focus();
};









// Fonction qui piège le focus à l'intérieur de la modale ouverte
/*function trapFocus(element) {
	console.log("coucou");
	const focusableElements = element.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled])");
	let firstElement = focusableElements[0];
	let lastElement = focusableElements[focusableElements.length - 1];
	
	element.addEventListener("keydown", function(event) {
		let isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
		
		if (!isTabPressed) {
			return;
		};
		if (event.shiftKey) { // "shift + tab" est appuyé 
			if (document.activeElement === firstElement) {
				//le focus est remis sur le dernier élément avec focus
				lastElement.focus();
				console.log("shiftKey");
				event.preventDefault();
			} else if (document.activeElement === lastElement) { // "tab" est appuyé 
			//le focus est remis sur le premier élément avec focus
				firstElement.focus();
				console.log("tab");
				event.preventDefault();
			};
		};
	});
};

/*trapFocus(".lightbox-wrapper",
	".lightbox__close-button",
	".lightbox__content-next");
};
focusableZone, firstFocusableElement, lastFocusableElement*/

/*function trapFocus(element) {
	var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
	var firstFocusableEl = focusableEls[0];
	var lastFocusableEl = focusableEls[focusableEls.length - 1];
	var KEYCODE_TAB = 9;

	element.addEventListener('keydown', function (e) {
		var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

		if (!isTabPressed) {
			return;
		}

		if (e.shiftKey) { //shift+tab
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} else  { //tab
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		}
	});
}*/