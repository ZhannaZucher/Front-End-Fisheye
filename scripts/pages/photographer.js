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
	const {photographers} = data;
	const photographer = photographers.find((photographer) => photographer.id === id);
	//Récupération du nouveau array avec tous les média du photographe concerné
	/*const mediaPortfolio = medias.filter((media) => media.photographerId === id);*/
	console.log(photographer);
	return [photographer];
};

function displayDataPhotographer(photographer) {
	const photographerHeader = document.querySelector('.photograph-header');
	const photographerModel = photographerFactory(photographer);
	const profileHeader = photographerModel.getProfileHeader();
	photographerHeader.appendChild(profileHeader);
	console.log(profileHeader);
};

async function init() {
	const [photographer]  = await getPhotographerData(id);
	displayDataPhotographer(photographer);
};

init();