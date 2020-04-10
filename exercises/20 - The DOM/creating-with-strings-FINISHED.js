// console.log('it works');

const item = document.querySelector('.item');

const width = 500;
const src = `https://picsum.photos/${width}`;
const desc = 'Cute Pup';
const myHTML = `
  <div class="wrapper">
    <h2>${desc}</h2>
    <img src="${src}" alt="${desc}"/>
  </div>
`;

// this won't work. You can't run Document methods on a string
// console.log(myHTML.querySelector('img'));

// Turn a string into a DOM element/node so we can call methods on it (e.g. classList)
const myFragment = document.createRange().createContextualFragment(myHTML);

console.log(myFragment.querySelector('img'));
console.log(myFragment);

// the fragment still isn't on the page
// use append, appendChild, insertAdjacentHTML, etc.
document.body.appendChild(myFragment);

// item.innerHTML = `
//   <div>
//    <h1>Hey How are ya?!</h1>
//   </div>
// `;
// item.innerHTML = myHTML;

// console.log(item.innerHTML);

// const item = document.querySelector('.item');

// const width = 500;
// const src = `https://picsum.photos/${width}`;
// const desc = `Cute Pup <img onload="alert('HACKED')" src="https://picsum.photos/50"/>`;
// const myHTML = `
//   <div class="wrapper">
//     <h2>Cute ${desc}</h2>
//     <img src="${src}" alt="${desc}"/>
//   </div>
// `;

// // turn a string into a DOM element
// const myFragment = document.createRange().createContextualFragment(myHTML);

// document.body.appendChild(myFragment);
