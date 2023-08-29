import { generatethumbnail } from "./galery.js";
import { deleteWork } from "./api.js";
var openModalBtn = document.getElementById("openModalBtn");
var modal = document.getElementById("myModal");
var closeButton = document.querySelector("#myModal .close");
var secondbutton = document.querySelector(".close");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  toggleModal("modal1");
}

secondbutton.addEventListener("click", openModal);
openModalBtn.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
const btnAdd = document.getElementById("add--btn");
const returnBack = document.getElementById("arrow--left");
btnAdd.addEventListener("click", function () {
  toggleModal("modal2");
});
returnBack.addEventListener("click", function () {
  toggleModal("modal1");
});
let works = window.localStorage.getItem("works");
works = JSON.parse(works);
generatethumbnail(works);
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
addImgChangeListener();
function addImgChangeListener() {
  const imgInput = document.querySelector('input[name="image"]');
  imgInput.addEventListener("change", function (event) {
    event.preventDefault();
    const imageDiv = document.getElementById("dropzone");
    const imgFontAwesome = imageDiv.querySelector(".fa");
    imgFontAwesome.style.display = "none";

    const imgDivLabel = imageDiv.querySelector("label");
    const imgDivLabelP = imgDivLabel.querySelector("p");
    const imgDivLabelPreviousImg = imgDivLabel.querySelector("img");
    if (imgDivLabelP != null) {
      imgDivLabelP.remove();
    }
    if (imgDivLabelPreviousImg != null) {
      imgDivLabelPreviousImg.remove();
    }
    imgDivLabel.setAttribute("class", "imgDivLabel");
    const imgDivText = imageDiv.querySelector("p");
    imgDivText.style.display = "none";
    const newImgDisplay = document.createElement("img");
    const imgUrl = imgInput.files[0];

    newImgDisplay.src = URL.createObjectURL(imgUrl);
    newImgDisplay.className = "newImgDisplay";

    addImgChangeListener();
    imgDivLabel.appendChild(newImgDisplay);
  });
}
function addPostListener() {
  const addWorkForm = document.getElementById("addworkForm");
  addWorkForm.addEventListener("submit", postWork);
}
function postWork(event) {
  event.preventDefault();
}
const trashs = document.querySelectorAll(".trash");
trashs.forEach((trash) => {
  trash.addEventListener("click", function (event) {
    event.preventDefault();
    let trashId = trash.getAttribute("data-id");
    deleteWork(trashId);
    sessionStorage.setItem("showModalAfterReload", "true");
  });
});
window.addEventListener("load", function () {
  if (sessionStorage.getItem("showModalAfterReload")) {
    openModal();
    sessionStorage.removeItem("showModalAfterReload");
  }
});
