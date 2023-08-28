import { generateWorks } from "./galery.js";
import {
  genererCategories,
  filtrerProjets,
  initialiseFiltreActif,
} from "./categorie.js";

// serveur enligne : https://nodeserver-3vfm.onrender.com/api/
// serveur local : http://localhost:5678/api/
const apiUrlWorks = "https://nodeserver-3vfm.onrender.com/api/works";
const apiUrlCategories = "https://nodeserver-3vfm.onrender.com/api/categories";
const apiUrlDeleteWork = "https://nodeserver-3vfm.onrender.com/api/works/";

let works = window.localStorage.getItem("works");

async function afficherCategories() {
  const reponseCategories = await fetch(apiUrlCategories);
  const categories = await reponseCategories.json();
  genererCategories(categories);
}
async function afficherProjets() {
  if (works === null) {
    const reponseWorks = await fetch(apiUrlWorks);
    const works = await reponseWorks.json();
    const valeurWorks = JSON.stringify(works);
    window.localStorage.setItem("works", valeurWorks);
  } else {
    works = JSON.parse(works);
  }
  generateWorks(works);
}

function getUserInfo() {
  const userInfoJSON = localStorage.getItem("tokenAuth");
  if (!userInfoJSON) {
    return {};
  }
  return JSON.parse(userInfoJSON);
}
function isConnected() {
  const savedUserInfo = getUserInfo();
  const blackhead = document.getElementById("blackhead");
  const btnFiltres = document.getElementById("btn-filtre");
  const allBtnFiltre = btnFiltres.querySelectorAll("button");
  const editionMode = document.getElementById("edition--mode");
  if (savedUserInfo.status === 200) {
    blackhead.style.display = "flex";
    allBtnFiltre.forEach((bouton) => {
      bouton.style.display = "none";
    });
    editionMode.style.display = "flex";
  }
}
const btnDct = document.getElementById("btn--deconnection");
btnDct.addEventListener("click", disconnect);
function disconnect() {
  localStorage.removeItem("tokenAuth");
  location.reload();
}
async function initialiseProjet() {
  await afficherProjets();
  await afficherCategories();
  filtrerProjets();
  initialiseFiltreActif();
  isConnected();
}
initialiseProjet();
