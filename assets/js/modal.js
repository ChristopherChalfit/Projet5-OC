import { deleteAllWork } from "./api.js";
import { addWorkForm, resetForm } from "./works.js";
const modals = document.getElementById("modalEdit");
const btnAdd = document.getElementById("add--btn");
const returnBack = document.querySelectorAll(".arrow--left");
const closeButton = document.getElementById("closeBtn");
const modifBtn = document.getElementById("modificationBtn");
const delAllGalery = document.getElementById("destructionGalerie");
const delAllGaleryValide = document.getElementById("delAllBtn");
const notdelAllGalery = document.getElementById("notdelAllBtn");
export function openModal() {
  modals.style.display = "block";
}

export function closeModal() {
  modals.style.display = "none";
  toggleModal("modalThumb");
  resetForm(addWorkForm);
}

export function toggleModal(modalId) {
  var allModals = document.querySelectorAll(".modal");
  for (var i = 0; i < allModals.length; i++) {
    allModals[i].style.display = "none";
  }

  var modalToShow = document.getElementById(modalId);
  if (modalToShow) {
    modalToShow.style.display = "flex";
  }
}
export function addEventModal() {
  btnAdd.addEventListener("click", function () {
    toggleModal("modalAdd");
  });
  returnBack.forEach((returns) => {
    returns.addEventListener("click", function () {
      toggleModal("modalThumb");
    });
  });

  closeButton.addEventListener("click", closeModal);
  modifBtn.addEventListener("click", function () {
    openModal();
  });
  delAllGalery.addEventListener("click", function () {
    toggleModal("modalDellAll");
  });
  notdelAllGalery.addEventListener("click", function () {
    toggleModal("modalThumb");
  });
  delAllGaleryValide.addEventListener("click", function (event) {
    event.preventDefault();
    const works = window.localStorage.getItem("works");
    deleteAllWork(works);
    window.localStorage.removeItem("works");
    toggleModal("modalThumb");
  });
  window.addEventListener("click", function (event) {
    if (event.target === modals) {
      closeModal();
    }
  });
}
