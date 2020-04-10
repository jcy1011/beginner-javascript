const wes = document.querySelector('.wes');

console.log(wes);
console.log(wes.children);
console.log(wes.childNodes);
console.log(wes.firstElementChild);
console.log(wes.lastElementChild);
console.log(wes.previousElementSibling);
console.log(wes.nextElementSibling);
console.log(wes.parentElement);

// firstElementChild
// lastElementChild
// previousElementSibling
// nextElementSibling
// parentElement

const p = document.createElement('p');
p.textContent = 'I will be removed';
document.body.appendChild(p);

p.remove();

console.log(p); // not on page anymore but still in JS memory
