import { postWork, displayMessageError, checkFile } from "./api.js";
import { textErrorFileWeight } from "./const.js";
export const addWorkForm = document.getElementById("addworkform");
export function addPostListener() {
  const btnInput = document.getElementById("confirmAddWork");
  addWorkForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (addWorkForm.checkValidity()) {
      const formData = new FormData(addWorkForm);
      await postWork(formData);
      resetForm(addWorkForm);
    }
  });
  addImgChangeListener();
}
export function checkFormIsValide() {
  const addWorkForm = document.getElementById("addworkform");
  const addChoiceType = document.getElementById("selectCategory");
  const btnInput = document.getElementById("confirmAddWork");
  const inputFile = document.getElementById("imageInput");
  btnInput.disabled = true;
  addWorkForm.addEventListener("change", function () {
    if (
      addWorkForm.checkValidity() &&
      addChoiceType.value != "" &&
      inputFile.files.length > 0
    ) {
      btnInput.disabled = false;
    } else {
      btnInput.disabled = true;
    }
  });
}
export const errorAddWork = document.getElementById("error--import");
export function addImgChangeListener() {
  const imgInput = document.querySelector('input[name="image"]');
  imgInput.addEventListener("change", function (event) {
    event.preventDefault();
    if (checkFile(imgInput)) {
      const imageDiv = document.getElementById("dropzone");
      const imgFtA = imageDiv.querySelector(".fa");
      imgFtA.style.display = "none";
      const imgDivLabel = imageDiv.querySelector("label");
      const imgDivLabelP = document.querySelector(".extentionAutorise");
      const imgDivLabelPreviousImg = imgDivLabel.querySelector("img");
      if (imgDivLabelP != null) {
        imgDivLabelP.style.display = "none";
      }
      if (imgDivLabelPreviousImg != null) {
        imgDivLabelPreviousImg.style.display = "none";
      }
      imgDivLabel.setAttribute("class", "imgPreview");
      const imgDivText = imageDiv.querySelector("span");

      imgDivText.style.display = "none";
      const newImgDisplay = document.createElement("img");
      const imgUrl = imgInput.files[0];
      newImgDisplay.src = URL.createObjectURL(imgUrl);
      newImgDisplay.className = "imgDisplay";
      imgDivLabel.appendChild(newImgDisplay);
    } else {
      displayMessageError(textErrorFileWeight, errorAddWork);
    }
  });
}
export function resetForm(form) {
  form.reset();
  const imageDiv = document.getElementById("dropzone");
  const imgFtA = imageDiv.querySelector(".fa");
  const imgDivLabel = imageDiv.querySelector("label");
  const imgDivLabelP = document.querySelector(".extentionAutorise");
  const imgDivLabelPreviousImg = imgDivLabel.querySelector("img");
  const imgDivText = imageDiv.querySelector("span");
  imgFtA.style.display = "";
  imgDivLabelP.style.display = "";
  if (imgDivLabelPreviousImg) {
    imgDivLabelPreviousImg.style.display = "";
  }
  imgDivLabel.setAttribute("class", "addImgBtn");
  imgDivText.style.display = "";
  const newImgDisplay = document.querySelector(".imgDisplay");
  errorAddWork.textContent = "";
  if (newImgDisplay) {
    newImgDisplay.remove();
  }
}
