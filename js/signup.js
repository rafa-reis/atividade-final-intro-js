const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const button = document.querySelector("#btn-signup");

form.addEventListener("keyup", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordConfirmationValue = passwordConfirmation.value.trim();

  if (usernameValue === "") {
    errorValidation(username, "O nome do usúario é obrigatório.");
  } else {
    successValidation(username);
  }

  if (emailValue === "") {
    errorValidation(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    errorValidation(email, "Por favor, insira um email válido.");
  } else {
    successValidation(email);
  }

  if (passwordValue === "") {
    errorValidation(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    errorValidation(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    successValidation(password);
  }

  if (passwordConfirmationValue === "") {
    errorValidation(
      passwordConfirmation,
      "A confirmação de senha é obrigatória."
    );
  } else if (passwordConfirmationValue !== passwordValue) {
    errorValidation(passwordConfirmation, "As senhas não conferem.");
  } else {
    successValidation(passwordConfirmation);
  }
}

function errorValidation(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function successValidation(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
}

button.addEventListener("click", () => {
  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    let listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

    listUser.push({
      nameCad: username.value,
      emailCad: email.value,
      passwordCad: password.value
    });

    localStorage.setItem("listUser", JSON.stringify(listUser));
    alert("Parabéns! Cadastro realizado com sucesso.");
  } else {
    alert("Valores inválidos. Tente novamente.");
  }
});
