/*
TODO list:
1. fonction initLightbox avec les listeners  pour:
	OK! ouvrir LBOX (fonction à créer) + gestion des aria
   	OK! fermer LBOX (fonction à créer) + gestion des aria
		=> goToNext (fonction à créer)
		=> goToPrevious (fonction à créer) 
		OK! events keybord (arrows)
2. OK! fonction "ouvrir LBOX" avec
		Lbox style block 
		main : aria hidden=true, LBOX wrapper = false
		focus sur btn close
		appel de la fonction setMediaView (soit avec links soit avec id)
3. OK! fonction fermer LBOX: display none + aria + focus
4.  => fonction qui gère next/prev slideShow (avec index)
...
*/
//Récupération des éléments DOM
const lightbox = document.querySelector(".lightbox-wrapper");
const closeBtn = document.querySelector(".lightbox__close-button");
const nextBtn = document.querySelector(".lightbox__content-next");
const prevBtn = document.querySelector(".lightbox__content-previous");
const mediaContainer = document.querySelector(".lightbox__media-display");
const mediaTitle = document.querySelector(".lightbox__media-title");
const links = document.getElementsByClassName("media__link"); //HTMLCollection

//initLbox appelée dans displayPortfolio
function initLightbox() {
	openLightbox();
	//gestion des événements onclick
	closeBtn.addEventListener("click", closeLightbox);
	// Lancement de la Lightbox sur l'événement du clavier
	for (let link of links) {
		link.addEventListener("keydown", (event) => {
			if (event.key == "Enter") {
				openLightbox(link);
			};
		});
	};
	//les événements onclick pour pour flèches next / prev
	nextBtn.addEventListener("click", function() {
		goToNext(1); //fonction à créer
	});
	prevBtn.addEventListener("click", function () {
		goToPrevious(-1); //fonction à créer
	});
	//gestion des événements de Lightbox au clavier
	document.addEventListener("keydown", function(event) {
		if (lightbox.ariaHidden === "false" && event.key === "Escape") {
			closeLightbox();
		} else if (event.key === "ArrowRight") {
			goToNext(1); //fonction à créer
		} else if (event.key === "ArrowLeft") {
			goToPrevious(-1); //fonction à créer
		};
	});
};

function openLightbox() {
	//Lancement de la lighbox onclick sur le lien de média
	for (let link of links) {
		link.addEventListener("click", event => {
			event.preventDefault();
			lightbox.style.display = "block";
			main.setAttribute("aria-hidden", true);
			lightbox.setAttribute("aria-hidden", false);
			closeBtn.focus();
			displayMediaLightbox(link);
		});
	};	
};

// Affichage du média contenu dans le lien cliqué dans la Lightbox
function displayMediaLightbox(link) {
	mediaContainer.innerHTML = link.firstElementChild.outerHTML;
	mediaTitle.innerHTML = link.nextElementSibling.firstElementChild.outerHTML;
	// Dans le cas où le média visé est une vidéo on rajoute les controls pour sa lecture
	if (mediaContainer.firstElementChild.nodeName == "VIDEO") {
		mediaContainer.firstElementChild.setAttribute("controls", true);
	};
};

//Fermeture de la Lightbox
function closeLightbox() {
	lightbox.style.display = "none";
	main.setAttribute("aria-hidden", false);
	lightbox.setAttribute("aria-hidden", true);
	mediaContainer.innerHTML = "";
};



/*//Récupération du lien du média avec son ID
function getUrlMedia(mediaId) {
	//const listOfMedia = document.getElementsByTagName("article");
	let array = [...listOfMedia];
	let media;
	//const mediaArray = Array.from(listOfMedia);
	//console.log(listOfMedia);
	array.forEach((currentMedia) => {
		if (currentMedia.id == mediaId) {
			media = currentMedia;
		};
	});
	return media;
};
//const mediaList = document.getElementsByTagName("article");
//console.log(mediaList);*/