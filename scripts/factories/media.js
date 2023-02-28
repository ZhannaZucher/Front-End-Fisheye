export function mediaFactory(data) {
//Destructuration de l'objet et son assignement à la variable 
	const { id, photographerId, title, image, video, date, likes } = data;

	function getViewCardDOM() {
	//création de l'élément DOM pour accueillir un media en tenant compte de son type (img ou vidéo) 
		let view;
		if (image) {
			view = document.createElement('img');
			view.setAttribute("src", `assets/portfolio/${photographerId}/${image}`);
			view.setAttribute("alt", `${title}`);
			view.classList.add("media__view");
			view.dataset.id = `${id}`;

		} else if (video) {
			view = document.createElement("video");
			view.removeAttribute("controls");
			view.setAttribute("src", `assets/portfolio/${photographerId}/${video}`);
			view.setAttribute("alt", `${title}`);
			view.setAttribute("preload", "metadata");
			view.classList.add("media__view");
			view.dataset.id = `${id}`;
		}

		const article = document.createElement('article');
		article.classList.add("media");
		article.setAttribute("id", `media-${id}`);
		article.dataset.title = `${title}`;
		article.dataset.date =`${date}`;
		article.dataset.likes = `${likes}`;

		const link = document.createElement('a');
		link.classList.add("media__link");
		link.setAttribute("href", "#");
		link.setAttribute("aria-label", `${title}, closup view`);
		link.setAttribute("role", "link");

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
		addLikesButton.classList.add("media__button");

		const heartIcon = document.createElement('img');
		heartIcon.setAttribute("src", "assets/icons/heart.svg");
		heartIcon.setAttribute("alt", "likes");

		article.appendChild(link);
		link.appendChild(view);
		article.appendChild(aboutSection);
		aboutSection.appendChild(mediaTitle);
		aboutSection.appendChild(likesDiv);
		likesDiv.appendChild(likesQuantity);
		likesDiv.appendChild(addLikesButton);
		addLikesButton.appendChild(heartIcon);

		return (article);
	}
	return { getViewCardDOM };
}