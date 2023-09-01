import { postWork } from "./api.js";
export function addPostListener() {
  const addWorkForm = document.getElementById("addworkform");
  addWorkForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const addWorkForm = document.getElementById("addworkform");
    const formData = new FormData(addWorkForm);
    await postWork(formData);
  });
  addImgChangeListener();
}
export function addImgChangeListener() {
  const imgInput = document.querySelector('input[name="image"]');
  imgInput.addEventListener("change", function (event) {
    event.preventDefault();
    const imageDiv = document.getElementById("dropzone");
    const imgFtA = imageDiv.querySelector(".fa");
    imgFtA.style.display = "none";
    const imgDivLabel = imageDiv.querySelector("label");
    const imgDivLabelP = imgDivLabel.querySelector("span");
    const imgDivLabelPreviousImg = imgDivLabel.querySelector("img");
    if (imgDivLabelP != null) {
      imgDivLabelP.remove();
    }
    if (imgDivLabelPreviousImg != null) {
      imgDivLabelPreviousImg.remove();
    }
    imgDivLabel.setAttribute("class", "imgPreview");
    const imgDivText = imageDiv.querySelector("span");

    imgDivText.style.display = "none";
    const newImgDisplay = document.createElement("img");
    const imgUrl = imgInput.files[0];
    newImgDisplay.src = URL.createObjectURL(imgUrl);
    newImgDisplay.className = "imgDisplay";
    imgDivLabel.appendChild(newImgDisplay);
  });
}
