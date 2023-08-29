import { generateWorks, generatethumbnail, trash } from "./galery.js";
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
  deleteWork,
} from "./api.js";
import { loginUrlBtn } from "./login.js";
import { openModal } from "./modal.js";

// serveur enligne : https://nodeserver-3vfm.onrender.com/api/
// serveur local : http://localhost:5678/api/
document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
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
    if (loginBtns.innerText === "Login") {
      const url = `./pages/login.html`;
      document.location = url;
    } else {
      console.log("deconnection");
      disconnect();
    }
  });
  async function initialiseProjet() {
    afficherProjets();
    afficherCategories();
    category = window.localStorage.getItem("category");
    genererCategoriesThumb(category);
    generatethumbnail(works);
    trash();
    filtrerProjets();
    initialiseFiltreActif();
    isConnected();
  }
  initialiseProjet();
});
