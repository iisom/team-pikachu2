let objectID = "";

document.querySelector('#searchForm').addEventListener("submit", function(i) {
  
  i.preventDefault();

  //  get data from the searchForm fields from the search.html page
  let searchKeyWord = document.querySelector('#searchKeyWord').value;
  let searchArtist = document.querySelector('#searchArtist').value;
  let searchCountry = document.querySelector('#searchCountry').value;

  console.log('q = ' + searchKeyWord);
  console.log('artiest = ' + searchArtist);
  console.log('artiest ' + searchArtist.replace(/\s/g, '+'));
  console.log('country = ' + searchCountry);

  //https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=french

  let fetchURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true"
  if (searchKeyWord.length > 0){
    fetchURL += "&q=" + searchKeyWord;
  } else if (searchArtist.length > 0){
    fetchURL += ("&artistOrCulture=true&q=" + searchArtist.replace(/\s/g, '+'));
    console.log(fetchURL);
  } else if (searchCountry.length > 0){
    fetchURL += ("&artistOrCulture=true&q=" + searchCountry.replace(/\s/g, '+')); 
  }

    // call the MetAPI
  fetch(fetchURL)
  .then(response => {	
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
  
    let total = data.total;

    // Clear previous displayed items
    let list = document.getElementById("resultSection");
  
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

    // Process each individual object that was returned from the original search
    for (let j = 0; j < total; j++)
      {
        fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + data.objectIDs[j])
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("ObjectID: " + data.objectIDs);
          console.log("Artist Name: " + data.artistDisplayName);
          console.log("Date Created: " + data.objectDate);
          console.log('Primary Image: ' + data.primaryImage);
          console.log('title: ' + data.title);
          console.log('country: '+ data.country);

          console.log("");

          if (searchArtist.length > 0 && searchArtist === data.artistDisplayName && searchCountry.length === 0) {
              createResultImage(data);
          } else if (searchArtist.length === 0 && searchCountry.length === 0){
              createResultImage(data);
          } else if (searchCountry.length > 0 && searchCountry === data.country){
              createResultImage(data);
          }        
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
})


function createResultImage(objectData){
  
  // adds the return Object to the searchResult form of the search.html page  
  const $figure = document.createElement("figure");
  $figure.classList.add("figure");
  $figure.id = "resultFigure";
  $figure.name = "resultFigure";
  
  const $div = document.createElement("p");
  // const $div = document.createElement("div");
  $div.id = "resultDiv";
  $div.name = "resultDiv";
  $div.classList.add("figure");

  const $image = document.createElement("img");
  $image.id = "resultImage";
  $image.classList.add("figure");
  if (objectData.primaryImage === ''){
    $image.innerText = "NO PICTURE";
    $image.alt="NO PICTURE TO DISPLAY"
  } else {
    $image.src = objectData.primaryImage;
  }
  $image.style="max-height: 350px; max-width: 100%";


  const $a = document.createElement("a");
  $a.id = "resultA";
  $a.classList.add("figure");
  $a.href = objectData.objectURL;
  $a.title = objectData.title;
  $a.target = "_blank";
  $a.innerText = objectData.title;

  const $artist = document.createElement("p");
  $artist.id = "artist";
  $artist.name = "artist";
  $artist.classList.add("figure");
  if (objectData.artistDisplayName === ''){
    $artist.innerText = 'UNKNOWN ARTIST';
  } else {
    $artist.innerText = objectData.artistDisplayName;
  }
  
  const $divA = document.createElement("p");
  // const $divA = document.createElement("div");  
  $divA.id = "resultDivA";
  $divA.name = "resultDivA";
  $divA.classList.add("figure");

  //  add the newly created Nodes to the page
  document.querySelector('#resultSection').append($figure);
  $figure.append($div, $image, $divA, $a, $artist);
  //$div.append($image, $divA, $a, $artist);

}
