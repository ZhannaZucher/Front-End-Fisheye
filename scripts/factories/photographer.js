function photographerFactory(data) {
    const { name, portrait, city, country, id, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.setAttribute("href", `../../photographer.html?id=${id}`);
        link.setAttribute("role", "link");
        link.setAttribute("title", `Visiter la page de profil de ${name}`);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const divDescription = document.createElement('div');

        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add("photographer__location");

        const slogan = document.createElement('p');
        slogan.textContent = tagline;
        slogan.classList.add("photographer__slogan");

        const pricePerDay = document.createElement('p');
        pricePerDay.textContent = `${price}€/jour`;
        pricePerDay.classList.add("photographer__price");

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(divDescription);
        divDescription.appendChild(location);
        divDescription.appendChild(slogan);
        divDescription.appendChild(pricePerDay);


        return (article);
    }
    return { name, picture, getUserCardDOM }
}