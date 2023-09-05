import { disconnect } from "./api.js";
import { checkIsLoginPage } from "./login.js";
export const loginUrlBtn = "loginlink";
export const ListNavLink = ["loginlink", "projectslink", "contactlink"];
ListNavLink.forEach((link) => {
  const element = document.getElementById(link);
  element.addEventListener("click", function () {
    const txt = element.innerText;
    switch (txt) {
      case "projets":
        if (checkIsLoginPage()) {
          redirect(`./../index.html#projects`);
        } else {
          redirect(`./index.html#projects`);
        }
        break;
      case "contact":
        if (checkIsLoginPage()) {
          redirect(`./../index.html#contact`);
        } else {
          redirect(`./index.html#contact`);
        }
        break;
      case "Login":
        console.log(checkIsLoginPage());
        if (!checkIsLoginPage()) {
          redirect(`./pages/login.html`);
        }
        break;
      case "Logout":
        disconnect();
        break;
    }
  });
});
function redirect(url) {
  document.location.href = url;
}
