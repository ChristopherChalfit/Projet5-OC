import { postLogin } from "./api.js";
export const loginUrlBtn = "loginlink";
export const loginError = document.getElementById("login--error");
export const textError = "Email ou mot de passe incorrect";

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login--btn");
  const emailInput = document.getElementById("email");
  const pwdInput = document.getElementById("password");
  const eye = document.querySelector(".toggle-password");

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
      sendMessageError("Veuillez entrer un email et un mot de passe valide");
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

  function sendMessageError(msg) {
    loginError.innerHTML = msg;
  }
  if (loginBtn) {
    loginBtn.addEventListener("click", handleSubmit);
  }
  if (eye) {
    eye.addEventListener("click", function () {
      togglePasswordVisibility();
    });
  }
});
