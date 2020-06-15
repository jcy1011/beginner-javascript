// console.log('ksdjhfaljdsnf');

const baseEndpoint = 'http://www.recipepuppy.com/api/';

async function fetchRecipes(query) {
  const response = await fetch(`${baseEndpoint}?q=${query}`);
  const data = await response.json();
}

fetchRecipes('pizza');
