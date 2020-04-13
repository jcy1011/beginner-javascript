// Make a div
const myDiv = document.createElement('div');

// add a class of wrapper to it
myDiv.classList = 'wrapper';

// put it into the body
document.body.appendChild(myDiv);

// make an unordered list
const list = document.createElement('ul');

// add three list items with the words "one, two three" in them
const li1 = document.createElement('li');
li1.textContent = 'one';
list.appendChild(li1);

const li2 = document.createElement('li');
li2.textContent = 'two';
list.appendChild(li2);

const li3 = document.createElement('li');
li3.textContent = 'three';
list.appendChild(li3);

// put that list into the above wrapper
myDiv.appendChild(list);

// create an image
const img = document.createElement('img');

// set the source to an image
img.src = 'https://picsum.photos/500';
// set the width to 250
img.width = 250;
img.height = 250;
// add a class of cute
img.classList.add('cute');
// add an alt of Cute Puppy
img.alt = 'Cute Puppy';
// Append that image to the wrapper
myDiv.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
const myHTML = `
  <div class="inject">
    <p>Hi I'm a paragraph.</p>
    <p>Me too!</p>
  </div>
`;
// console.log(myHTML);
// put this div before the unordered list from above
// console.log(list);
list.insertAdjacentHTML('beforebegin', myHTML);

// const myFragment = document.createRange().createContextualFragment(myHTML);
// console.log(myFragment);
// this won't work. insertAdjacentElement only takes element not fragment as
// second parameter
// list.insertAdjacentElement('beforebegin', myFragment);
// document.body.appendChild(myFragment);

// add a class to the second paragraph called warning
// const div = myDiv.firstElementChild; // this not optimal bc breaks if change ordering
const div = myDiv.querySelector('.inject');
console.log(div);
secondParagraph = div.lastElementChild;
// console.log(secondParagraph);
secondParagraph.classList.add('warning');

// remove the first paragraph
div.firstElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height

// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

// make a new div with a class of cards

// Have that function make 4 cards

// append those cards to the div
// put the div into the DOM just before the wrapper element
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener
