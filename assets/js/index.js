import { generateWorks, generatethumbnail } from "./galery.js";
import {  genererCategories,  filtrerProjets,  initialiseFiltreActif,  genererCategoriesThumb} from "./categorie.js";
import {  fetchWorksData,  fetchCategoriesData,   isConnected,} from "./api.js";
import { addPostListener, checkFormIsValide } from "./works.js";
import { addEventModal } from "./modal.js";
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
    category = window.localStorage.getItem("category");
    genererCategories(fetch);
  }
  async function afficherProjets() {
    const fetch = await fetchWorksData();
    works = window.localStorage.getItem("works");
    generateWorks(works);
  }

  async function initialiseProjet() {
    await afficherProjets();
    await afficherCategories();
    genererCategoriesThumb(category);
    generatethumbnail(works);
    filtrerProjets();
    initialiseFiltreActif();
    isConnected();
    addEventModal();
    addPostListener();
    checkFormIsValide();
  }
  initialiseProjet();
});
