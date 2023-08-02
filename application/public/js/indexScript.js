document.getElementById("menuHam").addEventListener('click', function() {
	const hiddenDiv = document.getElementById('hiddenDiv');
  
	if (hiddenDiv.classList.contains("show")) {
	  hiddenDiv.classList.remove("show"); // Hide the hiddenDiv by removing "show" class
	} else {
	  hiddenDiv.classList.add("show"); // Show the hiddenDiv by adding "show" class
	}
  });