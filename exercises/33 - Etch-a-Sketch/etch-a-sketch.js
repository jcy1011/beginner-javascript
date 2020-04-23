// Always test to make sure your js and html files are linked
// console.log('it works');

// Select elements on the page: canvas, shake button
const canvas = document.querySelector('#etch-a-sketch'); // the element
const ctx = canvas.getContext('2d'); // where we draw
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 80; // when something is a true constant ALLCAPS with _

// Set up cavnas for drawing

// these can be simplified with destructiring below
// const width = canvas.width;
// const height = canvas.height;
// make varabiles width and height from the equivalently named canvas properties
const { width, height } = canvas;

// create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing (i.e. put pencil to paper)
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function

// function draw(options) {
//   // we're going to have many arguments, some optional
//   // it's better to pass a single argument with properties that we can access
//   console.log(options);
// }

// destructuring object that gets passed into draw function to allow us
// to use shorter variables names
// function draw(options) {
//   console.log(options.key);
// }
// equivalent to... (using object destructuring)
function draw({ key }) {
  hue += 3; // increment hue so line changes color
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  //   move our x and y values depending on user input
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Write handler for keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
    console.log(e.key);
    console.log('HANDLING KEY');
  }
}

// Write clear / shake function
function clearCanvas() {
  canvas.classList.add('shake');
  // Note: at this point the shake button only works first time
  ctx.clearRect(0, 0, width, height); // clear canvas
  // Must remove 'shake' class after animation finishes. Use eventListener
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('Done the shake');
      canvas.classList.remove('shake');
    },
    // this prevents multiple eventlisteners piling up on element
    // also could use removeEventListener
    { once: true }
  );
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);

// Hook clearCanvas function shake button
shakeButton.addEventListener('click', clearCanvas);
