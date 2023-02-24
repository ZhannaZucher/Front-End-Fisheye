//Récupération des données des photographes depuis le fichier JSON
async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    return await response.json();
}
    //Affichage des photographes avec photographer factory
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer-section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupèration des datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
