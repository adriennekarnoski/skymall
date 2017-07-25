'use strict';

//object sonstructor
function Image(name) {
  this.name = name;
  this.source = '/Users/adriennekarnoski/codefellows/201/skymall/img/' + this.name + '.jpg';
  this.timesShown = 0;
  Image.all.push(this);
};

Image.all = [];

Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//loop through image names
for (var i = 0; i < Image.allNames.length; i++) {
  new Image(Image.allNames[i]);
}

//html id for each image
Image.firstImgEl = document.getElementById('first_image');
Image.secondImgEl = document.getElementById('second_image');
Image.thirdImgEl = document.getElementById('third_image');

//temporary array holding previous three index numbers
var thing = [];

//random image function that also makes sure no three images are same
//also makes sure sure previous three images are repeated
function randomImage() {
  //array that holds three indexes
  Image.productsDisplayed = [];
  console.log('previous three images were ' + thing);
  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * Image.all.length);
      if (Image.productsDisplayed.includes(randomIndex) || thing.includes(randomIndex)) {
        i--;
      } else {
        thing.push(randomIndex);
        Image.productsDisplayed.push(randomIndex);
    }
  }
  var indexZero = Image.productsDisplayed[0];
  var indexOne = Image.productsDisplayed[1];
  var indexTwo = Image.productsDisplayed[2];

  Image.firstImgEl.src = Image.all[indexZero].source;
  Image.secondImgEl.src = Image.all[indexOne].source;
  Image.thirdImgEl.src = Image.all[indexTwo].source;

  //reverse string before cutting length to three
  //newest numbers appear first
  thing.reverse();
  thing.length = 3;
  console.log('images displayed are ' + [Image.productsDisplayed]);
}

//each image has event listener
Image.firstImgEl.addEventListener('click', randomImage);
Image.secondImgEl.addEventListener('click', randomImage);
Image.thirdImgEl.addEventListener('click', randomImage);

randomImage();
