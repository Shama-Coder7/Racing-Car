var blueCar = document.getElementById('bluecar');
var raceCar = document.getElementById('racecar');
var result = document.getElementById('result');
var score = document.getElementById('score');
var game = document.getElementById('game');
var counter = 0;
var jumpsound = document.getElementById('jumpsound');
var gameoversound = document.getElementById('gameoversound');

// Function to move the race car
function moveRaceCar(direction) {
  var raceCarLeft = parseInt(
    window.getComputedStyle(raceCar).getPropertyValue('left')
  );
  var screenWidth = window.innerWidth;

  if (direction === 'right' && raceCarLeft < screenWidth - 150) {
    raceCar.style.left = raceCarLeft + 130 + 'px';
  } else if (direction === 'left' && raceCarLeft > 0) {
    raceCar.style.left = raceCarLeft - 130 + 'px';
  }
  jumpsound.play();
}

document.getElementById('game').addEventListener('touchstart', function (e) {
  e.preventDefault();
  var touchX = e.touches[0].clientX;
  var screenWidth = window.innerWidth;
  var raceCarLeft = parseInt(
    window.getComputedStyle(raceCar).getPropertyValue('left')
  );

  if (touchX < screenWidth / 2) {
    moveRaceCar('left');
  } else {
    moveRaceCar('right');
  }
});

// Add keydown event listener for race car movement on desktop
window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    moveRaceCar('right');
  }

  if (e.key === 'ArrowLeft') {
    moveRaceCar('left');
  }
});

// bluecar move
blueCar.addEventListener('animationiteration', function () {
  var random = Math.floor(Math.random() * 3) * 130;
  blueCar.style.left = random + 'px';
  counter++;
});

function checkCollision() {
  var blueCarRect = blueCar.getBoundingClientRect();
  var raceCarRect = raceCar.getBoundingClientRect();

  if (
    blueCarRect.left < raceCarRect.right &&
    blueCarRect.right > raceCarRect.left &&
    blueCarRect.top < raceCarRect.bottom &&
    blueCarRect.bottom > raceCarRect.top
  ) {
    result.style.display = 'block';
    game.style.display = 'none';
    score.innerHTML = `Score: ${counter}`;
    counter = 0;
    gameoversound.play();
  }
}

setInterval(checkCollision, 100);

function restartGame() {
  result.style.display = 'none';
  game.style.display = 'block';
  counter = 0;
}
