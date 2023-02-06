//Extraction de l'Id du photographe depuis l'URl affichée:
const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));
console.log(id);

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
	console.log(photographer);
	return [photographer, portfolio];
};

//Affichage du header
function displayDataPhotographer(photographer) {
	const photographerHeader = document.querySelector('.photograph-header');
	const photographerModel = photographerFactory(photographer);
	const profileHeader = photographerModel.getProfileHeader();
	photographerHeader.appendChild(profileHeader);
	console.log(profileHeader);
};

//Affichage des media
function displayPortfolio(portfolio) {
	const portfolioSection = document.querySelector(".portfolio-section");

	portfolio.forEach((media) => {
		const mediaModel = mediaFactory(media);
		const mediaCardDOM = mediaModel.getViewCardDOM();
		portfolioSection.appendChild(mediaCardDOM);
	});
}

//Affichage de la section prix et likes
function displayAside(photographer, portfolio) {
	const infoSection = document.querySelector(".info-section");
	const asideModel = photographerFactory(photographer, portfolio);
	const asideCardDOM = asideModel.getInfoCardDOM();
	infoSection.appendChild(asideCardDOM);
}

async function init() {
	const [photographer, portfolio]  = await getPhotographerData(id);
	displayDataPhotographer(photographer);
	displayPortfolio(portfolio);
	displayAside(photographer, portfolio);
};

init();