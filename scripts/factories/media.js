function mediaFactory(data) {

	const { id, photographerId, title, image, video, date, price, likes } = data;

	function getViewCardDOM() {
	//création de l'élément DOM en fonction du type de media
		let view;
		if (data.hasOwnProperty("image")) {
			view = document.createElement('img');
			view.setAttribute("src", `assets/portfolio/${photographerId}/${image}`);
			view.setAttribute("alt", "");
			view.classList.add("media__view");

		} else if (data.hasOwnProperty("video")) {
			view = document.createElement("video");
			view.removeAttribute("controls");
			view.setAttribute("src", `assets/portfolio/${photographerId}/${video}`);
			view.setAttribute("alt", "");
			view.setAttribute("preload", "metadata");
			view.classList.add("media__view");
		}

		const article = document.createElement('article');
		article.classList.add("media");
		article.setAttribute("id", `media-${id}`);

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
};
