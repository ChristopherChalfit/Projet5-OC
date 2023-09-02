import { postWork } from "./api.js";
export function addPostListener() {
  const addWorkForm = document.getElementById("addworkform");
  const btnInput = document.getElementById("confirmAddWork");
  addWorkForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (addWorkForm.checkValidity()) {
      btnInput.disabled = false;
      const addWorkForm = document.getElementById("addworkform");
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
  addWorkForm.addEventListener("change", function (event) {
    if (addWorkForm.checkValidity && addChoiceType.value != "") {
      btnInput.disabled = false;
    } else {
      btnInput.disabled = true;
    }
  });
}
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
    }
  });
}
function checkFile(fileInput) {
  const resultDiv = document.querySelector(".error--import");
  const file = fileInput.files[0];
  const maxSize = 4 * 1024 * 1024; 
  if (file.size > maxSize) {
    resultDiv.textContent = "Le fichier dépasse la taille maximale de 4 Mo.";
    return false;
  }
  resultDiv.textContent = "";
  return true;
}
function resetForm(form){
  form.reset();
  const imageDiv = document.getElementById("dropzone");
  const imgFtA = imageDiv.querySelector(".fa");
  const imgDivLabel = imageDiv.querySelector("label");
  const imgDivLabelP = document.querySelector(".extentionAutorise");
  const imgDivLabelPreviousImg = imgDivLabel.querySelector("img");
  const imgDivText = imageDiv.querySelector("span");
  imgFtA.style.display = "";
  imgDivLabelP.style.display = "";
  imgDivLabelPreviousImg.style.display = "";
  imgDivLabel.setAttribute("class", "addImgBtn");
  imgDivText.style.display = "";
  const newImgDisplay = document.querySelector(".imgDisplay");
  newImgDisplay.remove();
}

