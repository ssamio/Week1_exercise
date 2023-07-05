import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
  console.log("Phase!")
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  let wikiDiv = document.createElement("div");
  wikiDiv.id = "wiki";
  wikiDiv.className = "container";
  document.getElementsByTagName("body")[0].appendChild(wikiDiv);

  //Specify the breeds here
  let breeds = ["Beagle", "Akita", "Norwegian Elkhound", "Medium Poodle", "Havanese"];

  for(let i = 0; i < breeds.length; i++){
    initializeContent(breeds[i]);
  }
}
//Function to generate the HTML and populate with content
async function initializeContent(breed){
  let imageSource = await fetchImageSource(breed);
  let infoText = await fetchInfo(breed);
  let wikiContent = '<h1 class="wiki-header">'+ breed +'</h1><div class="wiki-content"><p class="wiki-text">' + infoText + '</p><div class="img-container"><img class="wiki-img" src="'+ imageSource +'"></div></div>';
  let newContent = document.createElement("div");
  newContent.className = "wiki-item";
  newContent.innerHTML = wikiContent;
  document.getElementById("wiki").appendChild(newContent);
}
//Fetch dog images
async function fetchImageSource(breed){
  fetchInfo(breed);
  breed = breed.toLowerCase();
  if (breed.includes(" ")){
    breed = editName(breed);
  }
  let url = "https://dog.ceo/api/breed/" + breed +"/images/random";
  let response = await fetch(url).then(response => response.json()).then(data => data.message);
  return response;
}
//Edit names for the image API
function editName(breed){
  let spaceLocation = breed.indexOf(" ");
  let firstName = breed.slice(0, spaceLocation);
  let secondName = breed.slice(spaceLocation+1, breed.length);
  let result = secondName + "/" + firstName;
  return result;
}
//Fetch summary text from Wikipedia
async function fetchInfo(breed){
  if (breed.includes(" ")){
    breed = breed.replace(" ", "_");
  }
  else{
    breed = breed + "_dog";
  }
  
  let url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + breed;
  let response = await fetch (url).then(response => response.json());
  return response.extract;
}
