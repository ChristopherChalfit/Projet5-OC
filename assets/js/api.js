import { loginError } from "./login.js";
import { loginUrlBtn } from "./navBar.js";
import { generateWorks, generatethumbnail } from "./galery.js";
import { toggleModal } from "./modal.js";
import { textErrorLogin } from "./const.js";
import { errorAddWork } from "./works.js";
export async function fetchWorksData() {
  try {
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const work = await response.json();
    if (work != JSON.parse(window.localStorage.getItem("works"))) {
      window.localStorage.setItem("works", JSON.stringify(work));
    }
    return work;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCategoriesData() {
  try {
    const url = "http://localhost:5678/api/categories";
    const response = await fetch(url);
    const category = await response.json();
    window.localStorage.setItem("category", JSON.stringify(category));
    return await category;
  } catch (error) {
    console.error(error);
  }
}

export async function postLogin(data) {
  const url = "http://localhost:5678/api/users/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  if (response.status == "401" || response.status == "404") {
    displayMessageError(textErrorLogin, loginError);
  } else {
    tokenAuth(dataResponse.userId, dataResponse.token, response.status);
    return dataResponse;
  }
}
export async function postWork(data) {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getUserInfo().token}`,
    },
    body: data,
  });
  await fetchWorksData();
  const work = localStorage.getItem("works");
  generateWorks(work);
  generatethumbnail(work);
  toggleModal("modalThumb");
}
export async function deleteWork(workId) {
  try {
    const url = `http://localhost:5678/api/works/${workId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserInfo().token}`,
      },
    });
    if (!response.ok) {
      throw new Error("La suppression a échoué");
    } else {
      await fetchWorksData();
      const work = localStorage.getItem("works");
      if (work.length === 2) {
        localStorage.removeItem("works");
      }
      generateWorks(work);
      generatethumbnail(work);
    }
  } catch (error) {
    console.error(error);
  }
}
export async function deleteAllWork(works) {
  const work = JSON.parse(works);
  for (let i = 0; i < work.length; i++) {
    const id = work[i].id;
    deleteWork(id);
    window.localStorage.removeItem("works");
  }
}

export function getUserInfo() {
  const userInfoJSON = localStorage.getItem("tokenAuth");
  if (!userInfoJSON) {
    return {};
  }
  return JSON.parse(userInfoJSON);
}
async function tokenAuth(userId, token, status) {
  const stock = {
    userId: userId,
    token: token,
    status: status,
  };
  localStorage.setItem("tokenAuth", JSON.stringify(stock));
  checkLocalStorage();
}
function checkLocalStorage() {
  const token = window.localStorage.getItem("tokenAuth");
  if (token === "undefined") {
    loginError.innerHTML = textError;
    displayMessageError("Erreur token", loginError);
  } else {
    const message = "Connexion réussie !";
    const url = `../index.html?message=${encodeURIComponent(message)}`;
    document.location = url;
  }
}
export function displayMessageError(msg, element) {
  element.innerHTML = msg;
}
export function disconnect() {
  localStorage.removeItem("tokenAuth");
  location.reload();
}

export function isConnected() {
  const savedUserInfo = getUserInfo();
  const blackhead = document.getElementById("blackheader");
  const editionMode = document.getElementById("edition--mode");
  const buttonsCategories = document.querySelectorAll("#portfolio button");
  const loginBtn = document.getElementById(loginUrlBtn);
  const editProfil = document.getElementById("editProfil--mode");

  if (savedUserInfo.status === 200) {
    blackhead.style.display = "flex";
    buttonsCategories.forEach((bouton) => {
      bouton.style.display = "none";
    });
    editionMode.style.display = "flex";
    loginBtn.innerHTML = "Logout";
    editProfil.style.display = "flex";
  }
}
export function checkFile(fileInput) {
  const file = fileInput.files[0];
  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    return false;
  }
  errorAddWork.textContent = "";
  return true;
}
