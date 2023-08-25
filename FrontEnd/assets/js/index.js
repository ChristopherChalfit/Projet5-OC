import { generateWorks } from './galery.js';
import { genererCategories, filtrerProjets, initialiseFiltreActif } from './categorie.js';
const apiUrlWorks = "http://localhost:5678/api/works"
const apiUrlCategories = "http://localhost:5678/api/categories"
const apiUrlDeleteWork = "http://localhost:5678/api/works/"

let works = window.localStorage.getItem('works');

async function afficherCategories() {
    const reponseCategories = await fetch(apiUrlCategories);
    const categories = await reponseCategories.json();
    genererCategories(categories);
}
async function afficherProjets() {
    if (works === null){
        const reponseWorks = await fetch(apiUrlWorks);
        const works = await reponseWorks.json();
        const valeurWorks = JSON.stringify(works);
        window.localStorage.setItem("works", valeurWorks);
    }else{
        works = JSON.parse(works);
    }
    generateWorks(works);
}
async function initialiseProjet(){
    await afficherProjets();
    await afficherCategories();
    filtrerProjets();
    initialiseFiltreActif();
}
initialiseProjet();