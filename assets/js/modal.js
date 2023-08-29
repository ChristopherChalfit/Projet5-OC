import { deleteWork } from "./api.js";
const modals = document.getElementById("myModal");
const btnAdd = document.getElementById("add--btn");
const returnBack = document.getElementById("arrow--left");
const closeButton = document.getElementById("closeBtn");
const modifBtn = document.getElementById("modificationBtn");
export function openModal() {
  modals.style.display = "block";
}

export function closeModal() {
  modals.style.display = "none";
  toggleModal("modal1");
}

function toggleModal(modalId) {
  var allModals = document.querySelectorAll(".modal");
  for (var i = 0; i < allModals.length; i++) {
    allModals[i].style.display = "none";
  }

  var modalToShow = document.getElementById(modalId);
  if (modalToShow) {
    modalToShow.style.display = "flex";
  }
}
btnAdd.addEventListener("click", function () {
  toggleModal("modal2");
});
returnBack.addEventListener("click", function () {
  toggleModal("modal1");
});
closeButton.addEventListener("click", closeModal);
modifBtn.addEventListener("click", function () {
  openModal();
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
