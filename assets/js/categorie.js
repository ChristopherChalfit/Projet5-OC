let btnActive;
export function genererCategories(categories) {
  const sectionFiltre = document.getElementById("btn-filtre");
  if (sectionFiltre) {
    for (let i = 0; i < categories.length; i++) {
      const filtre = categories[i];
      const btnElement = document.createElement("button");
      btnElement.innerText = filtre.name;
      sectionFiltre.appendChild(btnElement);
    }
  } else {
    console.log(`L'élément parent avec la classe '${categories}' n'existe pas`);
  }
}
export function filtrerProjets() {
  const buttonsCategories = document.querySelectorAll("#portfolio button");
  buttonsCategories.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.innerText.trim();
      if (category === "Tous") {
        btnActive.classList.remove("isActive");
        button.classList.add("isActive");
        btnActive = button;
        const allWorksElements = document.querySelectorAll("[data-category]");
        allWorksElements.forEach((worksElement) => {
          worksElement.style.display = "block";
        });
      } else {
        btnActive.classList.remove("isActive");
        button.classList.add("isActive");
        btnActive = button;
        const worksElements = document.querySelectorAll(
          `[data-category="${category}"]`
        );
        worksElements.forEach((worksElement) => {
          worksElement.style.display = "block";
        });
        const otherWorksElements = document.querySelectorAll(
          `[data-category]:not([data-category="${category}"])`
        );
        otherWorksElements.forEach((worksElement) => {
          worksElement.style.display = "none";
        });
      }
    });
  });
}

export function initialiseFiltreActif() {
  const buttonsCategories = document.querySelectorAll("#portfolio button");
  buttonsCategories.forEach((button) => {
    const category = button.innerText.trim();
    if (category === "Tous") {
      button.classList.add("isActive");
      btnActive = button;
    }
  });
}

export async function genererCategoriesThumb(categories) {
  const cate = JSON.parse(categories);
  const sectionFiltre = document.getElementById("selectCategory");
  if (sectionFiltre) {
    for (let i = 0; i < cate.length; i++) {
      const filtre = cate[i];
      const btnElement = document.createElement("option");
      btnElement.classList.add("selectCategoryElement");
      btnElement.value = cate[i].id;
      btnElement.id = cate[i].name;
      btnElement.textContent = cate[i].name;
      sectionFiltre.appendChild(btnElement);
    }
  } else {
    console.log(`L'élément parent avec la classe '${categories}' n'existe pas`);
  }
}
