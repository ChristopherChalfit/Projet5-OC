import { deleteWork } from "./api.js";
export function generateWorks(work) {
  const works = JSON.parse(work);
  regen("gallery");
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
export function generatethumbnail(work) {
  const works = JSON.parse(work);
  regen("containerThumb");
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    const sectionThumb = document.getElementById("containerThumb");

    if (sectionThumb) {
      const workElement = document.createElement("figure");
      workElement.dataset.id = works[i].id;
      workElement.classList.add("image-card");
      const imageElement = document.createElement("img");
      imageElement.classList.add("testImg");
      imageElement.src = article.imageUrl;
      imageElement.alt = article.title;
      const nameElement = document.createElement("figcaption");
      nameElement.innerText = article.title;
      workElement.setAttribute("data-category", article.category.name);
      sectionThumb.appendChild(workElement);

      workElement.appendChild(imageElement);
      workElement.appendChild(nameElement);
      workElement.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="trash" data-id=${article.id}>
        <button id="trashButtonNb1"
          ><i class="fa fa-light fa-trash-can" aria-hidden="true"></i
        ></button>
      </div>`
      );
      trash();
    }
  }
}
export function trash() {
  const trashs = document.querySelectorAll(".trash");
  trashs.forEach((trash) => {
    trash.addEventListener("click", async function (event) {
      event.preventDefault();
      let trashId = trash.getAttribute("data-id");
      await deleteWork(trashId);
    });
  });
}
export function regen(nameParent) {
  const parentElement = document.getElementById(nameParent); // Remplacez 'votre_parent_id' par l'ID de l'élément parent
  parentElement.innerHTML = "";
}
