const form = document.getElementById("form");
const forms_inputs = form.querySelectorAll("input");

const nameValid = (name) => {
  //trim to remove whitespaces
  name = name.trim();
  if (name.length == 0 || name == "") {
    return false;
  }
  return true;
};

const emailValid = (email) => {
  const regex = /[A-Za-z][A-Za-z0-9][A-Za-z0-9]+@[A-Za-z]+\.(com|org)/;

  return regex.test(email);
};

const passwordValid = (password) => {
  password = password.trim();
  const numRegex = /.*\d.*/; //states that the digit can have 0 or 1 more character in front or behind
  if (password.length < 8 || !numRegex.test(password)) {
    return false;
  }
  return true;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = 0;
  for (let i = 0; i < forms_inputs.length; i++) {
    const input = forms_inputs[i];
    const name = input.name;
    const error_message = form.querySelector("." + name);
    if (name == "fname" || name == "lname") {
      if (!nameValid(input.value)) {
        error_message.style.display = "block";
        input.classList.add("error");
        errors += 1;
      } else {
        error_message.style.display = "none";
        input.classList.remove("error");
      }
    }
    if (name == "password") {
      if (input.value.trim() == "") {
        error_message.style.display = "block";
        error_message.textContent = "Password can not be empty";
        errors += 1;
        input.classList.add("error");
      } else if (!passwordValid(input.value)) {
        input.classList.add("error");
        error_message.style.display = "block";
        error_message.textContent =
          "Password needs at least 8 characters and at least 1 number";
        errors += 1;
      } else {
        error_message.style.display = "none";
        input.classList.remove("error");
      }
    }
    if (name == "email") {
      if (input.value.trim() == "") {
        input.classList.add("error");
        error_message.style.display = "block";
        error_message.textContent = "Email can not be empty";
        errors += 1;
      } else if (!emailValid(input.value)) {
        input.classList.add("error");
        error_message.style.display = "block";
        error_message.textContent = "Looks like this is not an email";
        errors += 1;
      } else {
        error_message.style.display = "none";
        input.classList.remove("error");
      }
    }
  }
  if (!errors) {
    alert("Successfully signed up");
  }
});
