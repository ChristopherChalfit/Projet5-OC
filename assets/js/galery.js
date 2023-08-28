export function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    const sectionGalery = document.getElementById("gallery");
    if (sectionGalery) {
      const workElement = document.createElement("figure");
      workElement.dataset.id = works[i].id;
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      imageElement.alt = article.title;
      const nameElement = document.createElement("figcaption");
      nameElement.innerText = article.title;
      workElement.setAttribute("data-category", article.category.name);
      sectionGalery.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(nameElement);
    } else {
      console.log("L'élément parent avec la classe 'gallery' n'existe pas");
    }
  }
}
