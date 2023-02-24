//Récupération des éléments DOM
const lightbox = document.querySelector(".lightbox-wrapper");
const closeBtn = document.querySelector(".lightbox__close-button");
const nextBtn = document.querySelector(".lightbox__content-next");
const prevBtn = document.querySelector(".lightbox__content-previous");
const mediaContainer = document.querySelector(".lightbox__media-display");
const mediaTitle = document.querySelector(".lightbox__media-title");
const links = document.getElementsByClassName("media__link"); //!HTMLCollection

//initLbox appelée dans displayPortfolio
function initLightbox() {
	//ouverture de Lightbox
	openLightbox();

	//gestion des événements onclick
	closeBtn.addEventListener("click", closeLightbox);

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
		}
	});
}

function openLightbox() {
	//Ecoute des événements initiant l'ouverture de Lightbox
	for (let link of links) {
		link.addEventListener("click", function(event) {
			handleClick(event, link);
		});
		link.addEventListener("keydown", function(event) {
			if (event.key == "Enter") {
				handleClick(event, link);
			}
		});
	}
	//Lancement de la lighbox onclick et sur l'événement du clavier
	function handleClick(event, link) {
		event.preventDefault();
		lightbox.style.display = "block";
		main.setAttribute("aria-hidden", true);
		lightbox.setAttribute("aria-hidden", false);
		closeBtn.focus();
		//on détermine la position de la vue sur laquelle on ouvre LBox dans la liste des média 
		currentViewIndex = Array.from(links).indexOf(link);
		displayMediaLightbox(link);
	}
}

// Affichage du média contenu dans le lien cliqué dans la Lightbox
function displayMediaLightbox(link) {
	mediaContainer.innerHTML = link.firstElementChild.outerHTML;
	mediaTitle.innerHTML = link.nextElementSibling.firstElementChild.outerHTML;
	// Dans le cas où le média visé est une vidéo on rajoute les controls pour sa lecture
	if (mediaContainer.firstElementChild.nodeName == "VIDEO") {
		mediaContainer.firstElementChild.setAttribute("controls", true);
	}
}

//Fermeture de la Lightbox
function closeLightbox() {
	lightbox.style.display = "none";
	main.setAttribute("aria-hidden", false);
	lightbox.setAttribute("aria-hidden", true);
	document.querySelector(".portfolio-section a").focus();
	mediaContainer.innerHTML = "";
}

//Gestion du slideShow

let currentViewIndex = 0;

//fonction permettant de boucler la liste de vues dans les deux sens, l'argument "n" correspond au sens de changement de vues dans lightbox
function findViewsIndex(n) {
	const views = document.querySelectorAll(".media__link");//!Nodelist
	//si on est au bout de la liste des media, on reinitialise sur le premeier élément de la liste
	if (n > views.length - 1) {
		currentViewIndex = 0;
	} else if (n < 0) {
	//si on arrive au premier élément de la liste, on reinitialise sur le dernier élément de la liste
		currentViewIndex = views.length - 1;
	}
	displayMediaLightbox(views[currentViewIndex]);
}

//Fonction premettant de passer à la vue suivante avec n=1 en paramètre et à la vue précédante avec n =-1
function moreViews(n) {
	findViewsIndex((currentViewIndex += n));
}