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
  getUserInfo,
} from "./api.js";
import { openModal } from "./modal.js";
// serveur enligne : https://nodeserver-3vfm.onrender.com/api/
// serveur local : http://localhost:5678/api/
document.addEventListener("DOMContentLoaded", function () {
  const apiUrlWorks = "http://localhost:5678/api/works";
  const apiUrlCategories = "http://localhost:5678/api/categories";
  const apiUrlDeleteWork = "http://localhost:5678/api/works/";
  const loginUrlBtn = "loginlink";

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

  function isConnected() {
    const savedUserInfo = getUserInfo();
    const blackhead = document.getElementById("blackhead");
    const btnFiltres = document.getElementById("btn-filtre");
    const allBtnFiltre = btnFiltres.querySelectorAll("button");
    const editionMode = document.getElementById("edition--mode");
    const loginBtn = document.getElementById(loginUrlBtn);
    if (savedUserInfo.status === 200) {
      blackhead.style.display = "flex";
      allBtnFiltre.forEach((bouton) => {
        bouton.style.display = "none";
      });
      editionMode.style.display = "flex";
      loginBtn.innerHTML = "Logout";
    }
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
  const modifBtn = document.getElementById("modificationBtn");
  modifBtn.addEventListener("click", function () {
    openModal();
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
