//its a little bit laggy in the begining because of the size of the images i picked
var slideShowContainer = document.getElementById("slideshow-container");
var slideShowImages = document.getElementsByTagName("img");
var closeButton = document.getElementById("close");
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  var selectedImage = slides[slideIndex - 1];
  selectedImage.style.display = "block";
}

//function for mouseover event
function allowArrows(e) {
  switch (e.key) {
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      plusSlides(-1);
      break;

    case "Right": // IE/Edge specific value
    case "ArrowRight":
      plusSlides(1);
      break;
  }
}
//adding all the needed event listeners
function inContainer() {
  document.addEventListener("keydown", allowArrows);
}

function removeEvent() {
  document.removeEventListener("keydown", allowArrows);
}
slideShowContainer.addEventListener("mouseenter", inContainer);
slideShowContainer.addEventListener("mouseleave", removeEvent);

function clickedContainer() {
  slideShowContainer.style.width = "90vw";
  slideShowContainer.style.height = "90vh";
  closeButton.style.display = "block";
}

function addEventsToImages() {
  for (var i = 0, max = slideShowImages.length; i < max; i++) {
    slideShowImages[i].addEventListener("click", clickedContainer);
  }
}
addEventsToImages();

function closeButtonClicked() {
  slideShowContainer.style.width = "50vw";
  slideShowContainer.style.height = "50vh";
  closeButton.style.display = "none";
}
closeButton.addEventListener("click", closeButtonClicked);