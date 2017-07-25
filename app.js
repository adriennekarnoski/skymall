'use strict';

function Image(name) {
  this.name = name;
  this.source = '/Users/adriennekarnoski/codefellows/201/skymall/img/' + this.name + '.jpg';
  this.timesShown = 0;
  Image.all.push(this);
};

Image.all = [];

Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

for (var i = 0; i < Image.allNames.length; i++) {
  new Image(Image.allNames[i]);
}

Image.firstImgEl = document.getElementById('first_image');
Image.secondImgEl = document.getElementById('second_image');
Image.thirdImgEl = document.getElementById('third_image');


var other = [];
function randomImage() {

  Image.productsDisplayed = [];
  for (var i = 0; i < 3; i++) {
    other.push(randomIndex);
    var randomIndex = Math.floor(Math.random() * Image.all.length);
    if (Image.productsDisplayed.includes(randomIndex)) {
      i--;
    } else {
      Image.productsDisplayed.push(randomIndex);
    }
  }

  var indexZero = Image.productsDisplayed[0];
  var indexOne = Image.productsDisplayed[1];
  var indexTwo = Image.productsDisplayed[2];

  Image.firstImgEl.src = Image.all[indexZero].source;
  Image.secondImgEl.src = Image.all[indexOne].source;
  Image.thirdImgEl.src = Image.all[indexTwo].source;

console.log('these images are ' + [Image.productsDisplayed]);
}


Image.firstImgEl.addEventListener('click', randomImage);
Image.secondImgEl.addEventListener('click', randomImage);
Image.thirdImgEl.addEventListener('click', randomImage);

randomImage();
