import { deleteWork } from "./api.js";
export function generateWorks(work) {
  generateWork("galery", work);
}
export function generatethumbnail(work) {
  generateWork("containerThumb", work, true);
}

function generateWork(parent, work, modal = false) {
  const works = JSON.parse(work);
  const sectionGalery = document.getElementById(parent);
  regen(parent);
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    if (sectionGalery) {
      const workElement = document.createElement("figure");
      workElement.dataset.id = works[i].id;
      const imageElement = document.createElement("img");
      if (modal) {
        workElement.classList.add("image-card");
      }
      imageElement.src = article.imageUrl;
      imageElement.alt = article.title;
      const nameElement = document.createElement("figcaption");
      nameElement.innerText = article.title;
      workElement.setAttribute("data-category", article.category.name);
      sectionGalery.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(nameElement);
      if (modal) {
        if (i == 0) {
          workElement.insertAdjacentHTML(
            "afterbegin",
            `
              </div>
              <div class="move" data-id=${article.id}>
                <button id="moveButton"
                  ><i class="fa fa-solid fa-up-down-left-right" aria-hidden="true"></i
                ></button>
              </div>`
          );
        }
        workElement.insertAdjacentHTML(
          "afterbegin",
          `
            </div>
            <div class="trash" data-id=${article.id}>
              <button id="trashButton"
                ><i class="fa fa-light fa-trash-can" aria-hidden="true"></i
              ></button>
            </div>`
        );
        trash();
      }
    } else {
      console.log(`L'élément parent avec la classe ${parent} n'existe pas`);
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
  const parentElement = document.getElementById(nameParent);
  parentElement.innerHTML = "";
}
