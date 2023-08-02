/* Pseudocode. 
Wait for the DOM to be fully loaded
Add an event listener for form submission
Validate the form inputs
Validate username
Validate password
Validate password confirmation
Form validation successful, display success message
Function to validate the username, password
Function to display error message and success message. */

document.addEventListener("DOMContentLoaded", function () {
  // Getting the form.
  const form = document.getElementById("registration");

  // Get the register button
  const registerButton = document.getElementById("registerButton");

  // Adding event listeners for input fields.
  document
    .getElementById("username")
    .addEventListener("input", validateUsername);
  document
    .getElementById("password")
    .addEventListener("input", validatePassword);
  document
    .getElementById("confirm")
    .addEventListener("input", validatePasswordMatch);

  // Function to handle form validation on input.
  function validateUsername() {
    // Remove all the error messages if they exist.
    removeErrorMessages("username");

    // Validate the form inputs.
    const username = document.getElementById("username").value;

    // Everything Okay.
    var canSend = true;

    // Validate username
    if (!isUsernameValid(username)) {
      canSend = false;
    }

    // Enable the register button only if all fields are valid.
    registerButton.disabled = !canSend;
  }

  function validatePassword() {
    // Remove all the error messages if they exist.
    removeErrorMessages("password");

    // Validate the form inputs.
    const password = document.getElementById("password").value;

    // Everything Okay.
    var canSend = true;

    if (!isPasswordValid(password)) {
      canSend = false;
    }

    // Enable the register button only if all fields are valid.
    registerButton.disabled = !canSend;
  }

  function validatePasswordMatch() {
    // Remove all the error messages if they exist.
    removeErrorMessages("confirm");

    // Validate the form inputs.
    const confirm = document.getElementById("confirm").value;
    const password = document.getElementById("password").value;

    // Everything Okay.
    var canSend = true;

    // Validate password match.
    if (password !== confirm) {
      // Display error message.
      displayErrorMessage(
        "confirm",
        "This doesn't match with the above password."
      );
      canSend = false;
    }

    // Enable the register button only if all fields are valid.
    registerButton.disabled = !canSend;
  }
});

// Function to validate the username, password
function isUsernameValid(value) {
  const usernameRegex = /^[a-zA-Z]/;

  if (!usernameRegex.test(value)) {
    displayErrorMessage("username", "Use first character A-Z or a-z");
    return false;
  } else if (value.length < 3) {
    displayErrorMessage("username", "Use more than 3 characters.");
    return false;
  } else {
    return true;
  }
}

function isPasswordValid(value) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[/*+\-!@#$^&~[\]])(?=.*\d).+$/;

  if (value.length < 8) {
    displayErrorMessage("password", "Use 8 or more characters.");
    return false;
  } else if (!passwordRegex.test(value)) {
    displayErrorMessage(
      "password",
      "Use at least one captial letter, one special symbol and one number."
    );
    return false;
  } else {
    return true;
  }
}

//Function to display error message and success message.
function displayErrorMessage(id, message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-message", id);
  errorDiv.textContent = message;

  const inputField = document.getElementById(`${id}Div`);
  inputField.classList.add("error-border", id);
  inputField.appendChild(errorDiv);
}

//Function to remove all the error message.
function removeErrorMessages(id) {
	const errorDiv = document.querySelector(`.${id}.error-message`);
  if (errorDiv) {
    errorDiv.remove();
  }

  const inputField = document.getElementById(`${id}Div`);
  inputField.classList.remove("error-border", id);
  }
