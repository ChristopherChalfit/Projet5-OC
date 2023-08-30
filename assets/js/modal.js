import { deleteAllWork } from "./api.js";
const modals = document.getElementById("myModal");
const btnAdd = document.getElementById("add--btn");
const returnBack = document.querySelectorAll(".arrow--left");
const closeButton = document.getElementById("closeBtn");
const modifBtn = document.getElementById("modificationBtn");
const delAllGal = document.getElementById("destructionGalerie");
const delAllGalVal = document.getElementById("delAllBtn");
const notdelAllGal = document.getElementById("notdelAllBtn");
export function openModal() {
  modals.style.display = "block";
}

export function closeModal() {
  modals.style.display = "none";
  toggleModal("modal1");
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
    toggleModal("modal2");
  });
  returnBack.forEach((returns) => {
    returns.addEventListener("click", function () {
      toggleModal("modal1");
    });
  });

  closeButton.addEventListener("click", closeModal);
  modifBtn.addEventListener("click", function () {
    openModal();
  });
  delAllGal.addEventListener("click", function () {
    toggleModal("modal3");
  });
  notdelAllGal.addEventListener("click", function () {
    toggleModal("modal1");
  });
  delAllGalVal.addEventListener("click", function () {
    const works = window.localStorage.getItem("works");
    deleteAllWork(works);
    window.localStorage.removeItem("works");
  });
  window.addEventListener("click", function (event) {
    if (event.target === modals) {
      closeModal();
    }
  });
  window.addEventListener("load", function () {
    if (sessionStorage.getItem("showModalAfterReload")) {
      openModal();
      sessionStorage.removeItem("showModalAfterReload");
    }
  });
}
