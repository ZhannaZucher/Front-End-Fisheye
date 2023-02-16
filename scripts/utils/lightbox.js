/*
TODO list:
1. fonction initLightbox avec les listeners  pour:
	ouvrir LBOX (fonction à créer) + gestion des aria
   fermer LBOX (fonction à créer) + gestion des aria
	goToNext (fonction à créer)
	goToPrevious (fonction à créer) 
	events keybord

2. fonction "ouvrir LBOX" avec
	Lbox style block + idem pour lBOX bcgrd
	main : aria hidden=true, LBOX wrapper = false
	focus sur btn close
	appel de la fonction setMediaView (soit avec links soit avec id)

3. fonction fermer LBOX:
	display none + aria + focus

4. fonction qui gère next/prev slideShow (avec index)
...
*/
//Récupération des éléments DOM
//const main = document.querySelector("#main"); //a mettre dans display
const lightboxBackgroud = document.querySelector(".background-lightbox");//a mettre dans display
const lightbox = document.querySelector(".lightbox-wrapper");//a mettre dans display
const closeBtn = document.querySelector(".lightbox__close-button");
const nextBtn = document.querySelector(".lightbox__content-next");
const prevBtn = document.querySelector(".lightbox__content-previous");
//const links = document.getElementsByClassName("media__link");

function initLightbox() {
	openLightbox();
		


};

function openLightbox() {
	const links = document.getElementsByClassName("media__link");

	//Lancement de la lighbox onclick sur le lien de média
	for (let link of links) {
		link.addEventListener("click", event => {
			event.preventDefault();
			lightboxBackgroud.style.display = "block";
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
	const mediaContainer = document.querySelector(".lightbox__media-display");
	const mediaTitle = document.querySelector(".lightbox__media-title");

	mediaContainer.innerHTML = link.firstElementChild.outerHTML;
	mediaTitle.innerHTML = link.nextElementSibling.firstElementChild.outerHTML;
	// Dans le cas où le média visé est une vidéo on rajoute les controls pour sa lecture
	if (mediaContainer.firstElementChild.nodeName == "VIDEO") {
		mediaContainer.firstElementChild.setAttribute("controls", true);
	};
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