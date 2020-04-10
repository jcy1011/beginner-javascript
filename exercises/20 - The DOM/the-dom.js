// const p = document.querySelector('p');
// const imgs = document.querySelectorAll('.item img');
// const heading = document.querySelector('h2');
// heading.textContent = 'Jon is cool';
// console.dir(heading.textContent);

// console.log(heading.innerHTML);
// console.log(heading.outerHTML);

// const pizzaList = document.querySelector('.pizza');
// console.log(pizzaList.textContent);

// // but this can be slow in some applications with lost of text
// // beacuse the browser rerenders all the text
// // pizzaList.textContent = `${pizzaList.textContent} 🍕`;

// // instead we can tack text on with following
// pizzaList.insertAdjacentText('afterbegin', '🍕');
// pizzaList.insertAdjacentText('beforeend', '🍕');

// Classes!
const pic = document.querySelector('.nice');
pic.classList.add('open');
pic.classList.toggle('cool');
pic.classList.toggle('round');
// console.log(pic.classList);

pic.alt = 'awesome stuff'; // setter
console.log(pic.alt); // getter
console.log(pic.naturalWidth); // if run from here console shows 0 but if
// copy and paste this console.log into browser console gives width (500). Why?
// It takes page time to load. Solve with eventListner
window.addEventListener('load', function() {
  console.log(pic.naturalWidth);
}); // this shows image width in console (500)
// or just what for the pic to load rather then whole window
pic.addEventListener('load', function() {
  console.log(pic.naturalWidth);
});
