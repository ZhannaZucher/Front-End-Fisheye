import { photographerFactory } from "../factories/photographer.js";
import { sortMedia } from "../utils/sortMediaDropdown.js";
import { mediaFactory } from "../factories/media.js";
import { initLightbox } from "../utils/lightbox.js";

let totalLikes = 0; // variable pour compter les likes sur les média

//Extraction de l'Id du photographe depuis l'URl affichée:
export function getIdPhotographer() {
	const params = new URL(document.location).searchParams;
	const id = parseInt(params.get("id"));
	return id; 
}

//Récupération des données des photographes depuis le fichier JSON
async function getData() {
	const response = await fetch('data/photographers.json');
	return await response.json();
}

//Récupération de l'objet photographer concerné en fonction de l'id affichée dans l'URL et de ses média
async function getPhotographerData(id) {
	const data = await getData();
	const {photographers, media} = data;
	const photographer = photographers.find((photographer) => photographer.id === id);
	//Récupération du nouveau array avec tous les média du photographe concerné
	const portfolio = media.filter((media) => media.photographerId === id);
	return [photographer, portfolio];
}

//Affichage du header avec photographer factory
function displayDataPhotographer(photographer) {
	const photographerHeader = document.querySelector('.photograph-header');
	const photographerModel = photographerFactory(photographer);
	const profileHeader = photographerModel.getProfileHeader();
	photographerHeader.appendChild(profileHeader);
}

//Affichage des media avec média factory
function displayPortfolio(portfolio) {
	const portfolioSection = document.querySelector(".portfolio-section");
	portfolio.forEach((media) => {
		const mediaModel = mediaFactory(media);
		const mediaCardDOM = mediaModel.getViewCardDOM();
		portfolioSection.appendChild(mediaCardDOM);
		//Pour chaque média affiché on écoute l'événement sur le bouton "liker"
		document.querySelector(`#media-${media.id} .media__button`).addEventListener("click", likesControl);
	});
	//listOfMedia = document.querySelectorAll(".portfolio-section article");//!Nodelist
	//Les média sont triés par popularité par défault
	sortMedia("likes");
	initLightbox();
}

//Fonction pour la gestion des likes sur chaque media + retourne le n total de likes du photographe
function likesControl(event) {
	const likesBtn = event.currentTarget;
	//on accède au noeud du DOM précédant le boutton qui contient le nombre de likes
	let likesContent = likesBtn.previousElementSibling;
		if(!likesBtn.dataset.isLiked) {
			likesContent.innerText = parseInt(likesContent.innerText) + 1;
			++totalLikes;
			//une fois que lévénement s'est produit sur le boutton on lui crée l'attribut data-is-liked à true pour empêcher de liker plus d'une fois
			likesBtn.dataset.isLiked = true;
		} else if (likesBtn.dataset.isLiked) {
			//si le média a déjà été liké, on décrémente le n de likes et on enlève l'attribut data
			likesContent.innerText = parseInt(likesContent.innerText) - 1;
			--totalLikes;
			delete likesBtn.dataset.isLiked;
	}
	//on appelle la fonction qui met à jour le n total de likes du photographe affiché dans aside info en mettant afterlikescontrol à true
	getLikesTotalforAside(null, true);
	return totalLikes;
}

//Récuperation des tous les likes du photographe avant et après l'événement "like"
function getLikesTotalforAside(portfolio, afterLikesControl = false) {
	if (afterLikesControl) {
		//si on a liké une photo => maj du nombre total de likes
		document.querySelector(".info-section__current-rating").innerText = totalLikes;
	} else {
		//sinon on parcourt la liste de média en ajoutant le n de likes pour en afficher le total
		totalLikes = 0;
		portfolio.forEach((element) => {
			totalLikes += element.likes;
		});
		document.querySelector(".info-section__current-rating").innerText = totalLikes;
	}
}

//Affichage de la section prix et likes
function displayAside(photographer, portfolio) {
	const infoSection = document.querySelector(".info-section");
	const asideModel = photographerFactory(photographer, portfolio);
	const asideCardDOM = asideModel.getInfoCardDOM();
	infoSection.appendChild(asideCardDOM);
	//appel de la fonction qui affiche le n total de likes mis à jour 
	getLikesTotalforAside(portfolio);
}

async function init() {
	const [photographer, portfolio]  = await getPhotographerData(getIdPhotographer());
	displayDataPhotographer(photographer);
	displayPortfolio(portfolio);
	displayAside(photographer, portfolio);
}

init();