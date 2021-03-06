// console.log('ksdjhfaljdsnf');

const baseEndpoint = 'http://www.recipepuppy.com/api/';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
  const response = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await response.json();
  return data;
}

async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  console.log(form.query.value);
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // disable button in form
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
  console.log('Creating HTML');
  console.log(recipes);
  const html = recipes.map(
    // You can nest template tags as many levels deep as you want
    // Note the && hack below is the same as a conditional if then, ? :
    recipe => `<div class="recipe">
      <h2>${recipe.title}</h2>
      <p>${recipe.ingredients}</p>
      ${recipe.thumbnail &&
        `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
      <a href="${recipe.href}">View recipe</a>
    </div>`
  );
  // join on nothing so there's no comma between elements
  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);

// on page load run it with pizza
fetchAndDisplay('pizza');
