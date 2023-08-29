import { loginError, textError } from "./login.js";
export async function fetchWorksData() {
  try {
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);
    const work = await response.json();
    window.localStorage.setItem("works", JSON.stringify(work));
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
  const rps = await response.json();
  if (response.status == "401" || response.status == "404") {
    sendMessageError(textError);
  } else {
    tokenAuth(rps.userId, rps.token, response.status);
    return rps;
  }
}

export async function deleteWork(workId) {
  try {
    const url = `http://localhost:5678/api/works/${workId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getUserInfo().token}`,
      },
    });
    if (!response.ok) {
      throw new Error("La suppression a échoué");
    } else {
      console.log(fetchWorksData());
    }
  } catch (error) {
    console.error(error);
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
  await checkLocalStorage();
}
async function checkLocalStorage() {
  const token = await localStorage.getItem("tokenAuth");
  if (token === "undefined") {
    loginError.innerHTML = textError;
  } else {
    const message = "Connexion réussie !";
    const url = `/FrontEnd/index.html?message=${encodeURIComponent(message)}`;
    document.location = url;
  }
}
function sendMessageError(msg) {
  loginError.innerHTML = msg;
}
export function disconnect() {
  localStorage.removeItem("tokenAuth");
  location.reload();
}
