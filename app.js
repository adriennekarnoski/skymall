'use strict';
var clicks = [];
//object sonstructor
function Image(name) {
  this.name = name;
  this.source = './img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
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
Image.imageContainer = document.getElementById('image_container');

//temporary array holding previous three index numbers
var previousImages = [];
var totalClicks = 25;

//random image function that also makes sure no three images are same
//also makes sure sure previous three images are repeated
function randomImage() {
  //array that holds three indexes
  Image.productsDisplayed = [];
  console.log('previous three images were ' + previousImages);
  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * Image.all.length);
    if (Image.productsDisplayed.includes(randomIndex) || previousImages.includes(randomIndex)) {
      console.log('dupe fixed');
      i--;
    } else {
      previousImages.push(randomIndex);
      Image.productsDisplayed.push(randomIndex);
      Image.all[Image.productsDisplayed[i]].timesShown++;
    }
  }
  document.getElementById('click_countdown').innerHTML = totalClicks + ' clicks left';
  Image.firstImgEl.src = Image.all[Image.productsDisplayed[0]].source;
  Image.secondImgEl.src = Image.all[Image.productsDisplayed[1]].source;
  Image.thirdImgEl.src = Image.all[Image.productsDisplayed[2]].source;
  Image.firstImgEl.alt = Image.all[Image.productsDisplayed[0]].name;
  Image.secondImgEl.alt = Image.all[Image.productsDisplayed[1]].name;
  Image.thirdImgEl.alt = Image.all[Image.productsDisplayed[2]].name;

  //reverse string before cutting length to three
  //newest numbers appear first
  previousImages.reverse();
  previousImages.length = 3;
  console.log('images displayed are ' + [Image.productsDisplayed]);
}



var labelsForClicks = [];
var totalClicksPerImage = [];
var clickChart;

function showList() {
    for (var i = 0; i < Image.all.length; i++) {
      totalClicksPerImage.push(Image.all[i].timesClicked);
      labelsForClicks.push(Image.all[i].name);
    }
  }

  function handleClick(e) {
    totalClicks--;
    for (var i = 0; i < Image.all.length; i++) {
      if (e.target.alt === Image.all[i].name) {
        Image.all[i].timesClicked++;
      }
    }
    if (totalClicks === 0) {
      localStorage.storedClickValues = JSON.stringify(Image.all);
      showList();
      drawChart();
      Image.firstImgEl.removeEventListener('click', handleClick);
      Image.imageContainer.style.display = 'none';
    }
    randomImage();
  }

var data = {
  labels: labelsForClicks,
  datasets: [
    {
      data: totalClicksPerImage,
      backgroundColor: [
        'lightgray',
        'silver',
        'gray',
        'dimgray',
        'black',
        'lightgray',
        'silver',
        'gray',
        'dimgray',
        'black',
        'lightgray',
        'silver',
        'gray',
        'dimgray',
        'black',
        'lightgray',
        'silver',
        'gray',
        'dimgray',
        'black',

      ],
      hoverBackgroundColor: [
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple',
        'purple'
      ]
    }]
};

function drawChart() {
  var ctx = document.getElementById('list').getContext('2d');
  clickChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
}
if (localStorage.storedClickValues) {
  Image.all = JSON.parse(localStorage.storedClickValues);
} else {
  console.log('FUCK MY LIFE');
}

// event listener
Image.imageContainer.addEventListener('click', handleClick);

randomImage();
