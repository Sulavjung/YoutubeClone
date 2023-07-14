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
  //Getting the form.
  const form = document.getElementById("registration");

  

  //Adding an event listener ofr form submission.
  form.addEventListener("submit", function (event) {

	event.preventDefault();

	//Remove all the error message if exists. 
	removeErrorMessages();


    //Validate the form inputs.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

	//Everything Okay. 
	var canSend = true;

    //Validate username
    if(!isUsernameValid(username)){
		canSend = false;
	};

    //Validate password
    if(!isPasswordValid(password)){
		canSend = false;
	}

    //Validate password match.
    if (password != confirm) {
      //display error message.
      displayErrorMessage("confirm", "This doesn't match with above password.");
	  canSend = false;
      return;
    }

	/* Still Need to to Show the Success Message.  */

    //Reset the form. 
	if(canSend){
		form.reset(); 
	}
  });
});

// Function to validate the username, password
function isUsernameValid(value){
	const usernameRegex = /^[a-zA-Z]/;

	if(!usernameRegex.test(value)){
		displayErrorMessage("username", "Use first character A-Z or a-z")
		return false;
	} else if(value.length < 3) {
		displayErrorMessage("username", "Use more than 3 characters.");
		return false;
	} else {
		return true;
	}
	
}

function isPasswordValid(value){

	const passwordRegex = /^(?=.*[A-Z])(?=.*[/*+\-!@#$^&~[\]])(?=.*\d).+$/;

	if(value.length < 8) {
		displayErrorMessage("password", "Use 8 or more characters.");
		return false;
	} else if(!passwordRegex.test(value)){
		displayErrorMessage("password", "Use at least one captial letter, one special symbol and one number.");
		return false;
	} else {
		return true;
	}


}


//Function to display error message and success message.
function displayErrorMessage(id, message){
	const errorDiv = document.createElement("div");
	errorDiv.classList.add("error-message");
	errorDiv.textContent = message;


	const inputField = document.getElementById(`${id}Div`);
	inputField.classList.add("error-border");
	inputField.appendChild(errorDiv);

}

//Function to remove all the error message. 
function removeErrorMessages() {
	const errorDivs = document.getElementsByClassName("error-message");
	for (let i = errorDivs.length - 1; i >= 0; i--) {
	  errorDivs[i].remove();
	}
  
	const inputFields = document.getElementsByClassName("error-border");
	for (let i = inputFields.length - 1; i >= 0; i--) {
	  inputFields[i].classList.remove("error-border");
	}
  }