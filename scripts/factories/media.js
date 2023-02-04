/*A FAIRE:
1. fonction factory pour DOM images
2. fonction factory pour DOM videos
3. fonction qui regroupe les deux en fonction du type de media
importer dans photograph.js pour affichage
*/

function mediaFactory(data) {

	const { id, photographerId, title, image, video, date, price, likes } = data;

	function getViewCardDOM() {
	//création de l'élément DOM en fonction du type de media
		let view;
		if (data.hasOwnProperty("image")) {
			view = document.createElement('img');
			view.setAttribute("src", `assets/portfolio/${photographerId}/${image}`);
			view.setAttribute("alt", `${title}`);

		} else if (data.hasOwnProperty("video")) {
			view = document.createElement("video");
			view.removeAttribute("controls");
			view.setAttribute("src", `assets/portfolio/${photographerId}/${video}`);
			view.setAttribute("alt", `${title}`);
			view.setAttribute("preload", "metadata");
		}

		const article = document.createElement('article');
		article.classList.add("media");

		const link = document.createElement('a');
		link.classList.add("media__link");
		link.setAttribute("href", "");

		const aboutSection = document.createElement("div");
		aboutSection.classList.add("media__about");

		const mediaTitle = document.createElement("p");
		mediaTitle.textContent = title;

		const likesDiv = document.createElement("div");
		likesDiv.classList.add("media__likes");

		const likesQuantity = document.createElement("p");
		likesQuantity.classList.add("media__rating");
		likesQuantity.textContent = `${likes}`;

		const addLikesButton = document.createElement("button");

		//const heartIcon = createElement('img');
		//heartIcon.setAttribute("src", "assets/icons/heart.svg");

		article.appendChild(link);
		link.appendChild(view);
		article.appendChild(aboutSection);
		aboutSection.appendChild(mediaTitle);
		aboutSection.appendChild(likesDiv);
		likesDiv.appendChild(likesQuantity);
		likesDiv.appendChild(addLikesButton);
		//addLikesButton.appendChild(heartIcon);

		return (article);
	}
	return { getViewCardDOM };
}

/*function mediaFactory(data) {
	const { id, photographerId, title, image, video, date, price, likes } = data;
	let mediaTemplate = "";

   if (data.hasOwnProperty("image")) {
		
		function getViewCardDOM() {
			const article = document.createElement('article');
			article.classList.add("media");

			const link = document.createElement('a');
			link.classList.add("media__link");
			link.setAttribute("href", "");

			const img = document.createElement('img');
			img.setAttribute("src", `assets/medias/${photographerId}/${image}`);
			img.setAttribute("alt", `${title}`);

			const aboutSection = document.createElement("div");
			aboutSection.classList.add("media__about");

			const mediaTitle = document.createElement("p");
			mediaTitle.textContent = title;

			const likesDiv = document.createElement("div");
			likesDiv.classList.add("media__likes");
			
			const likesQuantity = document.createElement("p");
			likesQuantity.classList.add("media__rating");
			likesQuantity.textContent = `${likes}`;

			const addLikesButton = document.createElement("button");

			const heartIcon = createElement('img');

			article.appendChild(link);
			link.appendChild(img);
			article.appendChild(aboutSection);
			aboutSection.appendChild(mediaTitle);
			aboutSection.appendChild(likesDiv);
			likesDiv.appendChild(likesQuantity);
			likesDiv.appendChild(addLikesButton);
			addLikesButton.appendChild(heartIcon);

			mediaTemplate += article;


		} else if (data.hasOwnProperty("video")) {
			const article = document.createElement('article');
			article.classList.add("media");

			const link = document.createElement('a');
			link.classList.add("media__link");
			link.setAttribute("href", "");

			const img = document.createElement('img');
			img.setAttribute("src", `assets/medias/${photographerId}/${image}`);
			img.setAttribute("alt", `${title}`);

			const aboutSection = document.createElement("div");
			aboutSection.classList.add("media__about");

			const mediaTitle = document.createElement("p");
			mediaTitle.textContent = title;

			const likesDiv = document.createElement("div");
			likesDiv.classList.add("media__likes");

			const likesQuantity = document.createElement("p");
			likesQuantity.classList.add("media__rating");
			likesQuantity.textContent = `${likes}`;

			const addLikesButton = document.createElement("button");

			const heartIcon = createElement('img');

			article.appendChild(link);
			link.appendChild(video);
			article.appendChild(aboutSection);
			aboutSection.appendChild(mediaTitle);
			aboutSection.appendChild(likesDiv);
			likesDiv.appendChild(likesQuantity);
			likesDiv.appendChild(addLikesButton);
			addLikesButton.appendChild(heartIcon);

			mediaTemplate += article;
		}
		return (mediaTemplate);
	}
	return { getImageViewDOM };
}*/
