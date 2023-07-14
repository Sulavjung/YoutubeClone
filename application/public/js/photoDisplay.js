/* Pseudocode 
	
1. Fetch the json from the given link. 
2. Create div for each image and display them. 
3. Change the css for div as well. 
*/

const url = "https://jsonplaceholder.typicode.com/albums/2/photos";

//Main Page.
const mainPage = document.getElementById("photo-display");

//Variable to hold the value of the number of divs show.
var numberOfDivs = 0;

fetch(url)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    var htmlString = "";
    data.forEach((element) => {
      htmlString += buildCard(element);
    });
    mainPage.innerHTML = htmlString;

    const removableDivs = document.getElementsByClassName("individualDiv");

    divCounter();

    [...removableDivs].forEach(function (div) {
      div.addEventListener("click", function (event) {
        deleteDiv(event);
      });
    });
  });

//Card Building Function
function buildCard(element) {
  numberOfDivs += 1;
  console.log(numberOfDivs);
  return `	<div class="individualDiv" id = "${element.id}">
	<img src="${element.url}" alt="${element.title}">
	<p class="title">
		${element.title}
	</p>
</div>`;
}

//Delete Div.
function deleteDiv(event) {
  const divElement = event.currentTarget;
  var counter = 1;

  var timer = setInterval(function () {
    counter -= 0.2;
    divElement.style.opacity = counter;
    if (counter < 0) {
      divElement.remove();
      divCounter();
      clearInterval(timer);
    }
  }, 200);
}

//Counter
function divCounter() {
  const counterDiv = document.getElementById("counterDiv");

  const currentNumberOfDivs =
    document.getElementsByClassName("individualDiv").length;
  console.log(currentNumberOfDivs);

  const counterInfo = `<p> The total number of Photo Displayed: ${currentNumberOfDivs}.</p>`;
  counterDiv.innerHTML = counterInfo;
}
