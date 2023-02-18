/*
TODO list:
1. fonction initLightbox avec les listeners  pour:
	OK! ouvrir LBOX (fonction à créer) + gestion des aria
   	OK! fermer LBOX (fonction à créer) + gestion des aria
		=> goToNext / goToPrevious (fonction à créer)
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
		moreViews(1); 
	});
	prevBtn.addEventListener("click", function () {
		moreViews(-1); 
	});
	//gestion des événements de Lightbox au clavier
	document.addEventListener("keydown", function(event) {
		if (lightbox.ariaHidden === "false" && event.key === "Escape") {
			closeLightbox();
		} else if (event.key === "ArrowRight") {
			moreViews(1); 
		} else if (event.key === "ArrowLeft") {
			moreViews(-1); 
		};
	});
	findViewsIndex(1);
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
			//on détermine la position de la vue sur laquelle on ouvre LBox dans la liste des média 
			currentViewIndex = Array.from(links).indexOf(link) + 1;
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

//Gestion du slideShow

let currentViewIndex = 1;

function findViewsIndex(n) {
	const views = document.querySelectorAll(".media__link");//Nodelist
	console.log(views);
	//une fois au bout de la liste des media, on reinitialise sur le premeier élément de la liste
	if (n > views.length) {
		currentViewIndex = 1;
	} else if (n < 1) {
	//une fois au premier élément de la liste, on reinitialise sur le dernier élément de la liste
		currentViewIndex = views.length;
	};
	displayMediaLightbox(views[currentViewIndex - 1]);
};

//Fonction premettant de passer à la vue suivante avec n=1 en paramètre et à la vue précédante avec n =-1
function moreViews(n) {
	findViewsIndex((currentViewIndex += n));
}


/*//Récupération du lien du média avec son ID
function getUrlMedia(mediaId) {
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
};*/
