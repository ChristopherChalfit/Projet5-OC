import { generateWorks, generatethumbnail } from "./galery.js";
import {
  genererCategories,
  filtrerProjets,
  initialiseFiltreActif,
  genererCategoriesThumb,
} from "./categorie.js";
import {
  fetchWorksData,
  fetchCategoriesData,
  disconnect,
  isConnected,
} from "./api.js";
import { loginUrlBtn } from "./login.js";
import { openModal } from "./modal.js";

// serveur enligne : https://nodeserver-3vfm.onrender.com/api/
// serveur local : http://localhost:5678/api/
document.addEventListener("DOMContentLoaded", function () {
  const apiUrlWorks = "http://localhost:5678/api/works";
  const apiUrlCategories = "http://localhost:5678/api/categories";
  const apiUrlDeleteWork = "http://localhost:5678/api/works/";

  let works = window.localStorage.getItem("works");
  let category = window.localStorage.getItem("category");
  async function afficherCategories() {
    const fetch = await fetchCategoriesData();
    genererCategories(fetch);
  }
  async function afficherProjets() {
    if (works === null) {
      const fetch = await fetchWorksData();
    }
    works = window.localStorage.getItem("works");
    generateWorks(works);
  }

  const loginBtns = document.getElementById(loginUrlBtn);
  loginBtns.addEventListener("click", function () {
    const text = loginBtns.innerText;
    console.log(text);
    if (loginBtns.innerText === "login") {
      const url = `./pages/login.html`;
      document.location = url;
    } else {
      disconnect();
    }
  });
  async function initialiseProjet() {
    await afficherProjets();
    await afficherCategories();
    category = window.localStorage.getItem("category");
    await genererCategoriesThumb(category);
    await generatethumbnail(works);
    filtrerProjets();
    initialiseFiltreActif();
    isConnected();
  }
  initialiseProjet();
});
