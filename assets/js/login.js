import { postLogin, displayMessageError } from "./api.js";
import { textErrorPswdEmail } from "./const.js";
import { loginUrlBtn } from "./navBar.js";
export const loginError = document.getElementById("login--error");
const loginlink = document.getElementById(loginUrlBtn);
const loginBtn = document.getElementById("login--btn");
const emailInput = document.getElementById("email");
const pwdInput = document.getElementById("password");
const eye = document.querySelector(".toggle-password");
export function checkIsLoginPage() {
  if (window.location.pathname.endsWith("/pages/login.html")) {
    loginlink.style.fontWeight = "bold";
    return true;
  } else {
    loginlink.style.fontWeight = "";
    return false;
  }
}

checkIsLoginPage();
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.innerHTML = '<i class="fa fa-eye-slash fa-xl"></i>';
  } else {
    passwordInput.type = "password";
    togglePassword.innerHTML = '<i class="fa fa-eye fa-xl"></i>';
  }
}
async function handleSubmit(event) {
  event.preventDefault();
  const email = emailInput.value;
  const pwd = pwdInput.value;
  if (!email || !pwd) {
    displayMessageError(textErrorPswdEmail, loginError);
    return;
  }
  await loginUser(email, pwd);
}

async function loginUser(email, password) {
  const body = {
    email: email,
    password: password,
  };
  await postLogin(body);
}

if (loginBtn) {
  loginBtn.addEventListener("click", handleSubmit);
}
if (eye) {
  eye.addEventListener("click", function () {
    togglePasswordVisibility();
  });
}
