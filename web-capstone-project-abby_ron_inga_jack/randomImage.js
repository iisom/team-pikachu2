//slide show formatting code

let slideIndex = 1;

function slideshow() {
    showSlides(slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}


function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
 
 

//get photos from API and add to the slideshow

 let featuredPieces = [436532, 11417, 436105, 437986, 438817, 437397, 202614, 11122, 436530, 204812, 547802, 322609]
 for(var i =0; i < featuredPieces.length; i++) {
    const imgId = `#img${i + 1}`;
    const textId = `#text${i + 1}`;
    const artistId = `#artist${i + 1}`;
    console.log('Selector:', imgId);
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + featuredPieces[i] )
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                            let imgTag= '#img' + (i + 1); 
                            let img = document.querySelector(imgId);
                            img.src = data.primaryImage
                            let caption = document.body.querySelector(textId)
                            caption.innerText = data.title
                            let artist = document.body.querySelector(artistId)
                            let artistName=data.artistDisplayName
                            if (data.artistDisplayName === "") {
                                artistName='Unknown'
                            }
                            artist.innerText = artistName+ ', ' + data.objectDate
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
 }

 // Start the slideshow when the DOM content is fully loaded
 document.addEventListener('DOMContentLoaded', function() {
    slideshow(); 
});


//Transitions:

//fade in for the welcome text when page is loaded
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelector('#Welcome').classList.add('loaded');
    }, 500); 
  });

//fade in for gateway text when page is loaded
  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelector('#Gateway').classList.add('loaded');
    }, 500); 
  });

//fade in for about us
  document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var content = document.querySelector('.content');
        var contentPosition = content.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        if (contentPosition < screenHeight * 0.85 && contentPosition > -screenHeight * 0.25) {
            content.classList.add('visible');
        } else {
            content.classList.remove('visible');
        }
    });
});

//fade in for slideshow
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var content = document.querySelector('.slideBox');
        var contentPosition = content.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        if (contentPosition < screenHeight * 0.85 && contentPosition > -screenHeight * 0.25 ) {
            content.classList.add('visible');
        } else {
            content.classList.remove('visible');
        }
    });
});

//fade in for gateway text after scroll
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var content = document.querySelector('#Gateway');
        var contentPosition = content.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        if (contentPosition < screenHeight * 0.85 && contentPosition > -screenHeight * 0.25) {
            content.classList.add('loaded');
        } else {
            content.classList.remove('loaded');
        }
    });
});

//fade in for welcome text after scroll
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var content = document.querySelector('#Welcome');
        var contentPosition = content.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        if (contentPosition < screenHeight * 0.85 && contentPosition > -screenHeight * 0.25) {
            content.classList.add('loaded');
        } else {
            content.classList.remove('loaded');
        }
    });
});