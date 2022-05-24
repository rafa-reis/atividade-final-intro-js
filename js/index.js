const btnEnter = document.querySelector("#button-enter");
btnEnter.addEventListener("click", buttonEnter);

function buttonEnter(e) {
  e.preventDefault();

  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let msgError = document.querySelector("#msgError");
  let userValid = {
    nome: "",
    email: "",
    senha: "",
  };

  let listaUser = [];
  listaUser = JSON.parse(localStorage.getItem("listUser"));

  listaUser.forEach((element) => {
    if (
      emailInput.value === element.emailCad &&
      passwordInput.value === element.passwordCad
    ) {
      userValid = {
        nome: element.nameCad,
        email: element.emailCad,
        senha: element.passwordCad
      };
    }
  });

  if (
    emailInput.value === userValid.email &&
    passwordInput.value === userValid.senha
  ) {
    window.location.href = "home.html";

    let token =
      Math.random().toString(16).substring(2) +
      Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);

    localStorage.setItem("userLogado", JSON.stringify(userValid));
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos.";
    passwordInput.value = "";
    emailInput.focus();
  }
}
