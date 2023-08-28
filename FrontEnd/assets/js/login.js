document.addEventListener("DOMContentLoaded", function () {
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

  const eye = document.querySelector(".toggle-password");
  eye.addEventListener("click", function () {
    togglePasswordVisibility();
  });

  const loginform = document.querySelector(".login--form");
  const loginError = document.getElementById("login--error");
  const loginBtn = document.getElementById("login--btn");
  const emailInput = document.getElementById("email");
  const pwdInput = document.getElementById("password");
  const textError = "Email ou mot de passe incorrect";
  const apiUrlLogin = "http://localhost:5678/api/users/login";

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

  loginBtn.addEventListener("click", handleSubmit);

  async function loginUser(email, password) {
    const body = {
      email: email,
      password: password,
    };
    const fetchHandler = async () => {
      try {
        const reponse = await fetch(apiUrlLogin, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await reponse.json();
        if (reponse.status === 404) {
          sendMessageError("Email ou mot de passe incorrect !");
        } else {
          tokenAuth(data.userId, data.token, reponse.status);
          await checkLocalStorage();
        }
      } catch (error) {
        console.error(error);
      }
    };
    await fetchHandler();
  }
  function tokenAuth(userId, token, status) {
    const stock = {
      userId: userId,
      token: token,
      status: status,
    };
    localStorage.setItem("tokenAuth", JSON.stringify(stock));
  }
  async function checkLocalStorage() {
    const token = await localStorage.getItem("token");
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
});
