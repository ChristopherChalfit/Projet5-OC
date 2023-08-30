import { postWork } from "./api.js";
export function addPostListener() {
  const addWorkForm = document.getElementById("addworkform");
  addWorkForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const addWorkForm = document.getElementById("addworkform");
    const formData = new FormData(addWorkForm);
    await postWork(formData);
  });
}
