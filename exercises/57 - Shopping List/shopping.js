// console.log('pelagic: of, relating to, or living or occurring in the open sea');

// First, listen for when someone types into input and clicks submit
// Keep track of list items and whether they are complete
// Render out a list of those items

// select our items
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// we need an array to hold our state
let items = [];

// Listen for a submit event
function handleSubmit(e) {
  e.preventDefault();
  console.log('subimitted!!');
  // pull data from submit form
  // console.log(e.currentTarget);
  const name = e.currentTarget.item.value;
  // console.log(name);
  // if the field is empty, don't submit
  // This is instead of adding required attribute to <input required>
  // if the user types "null", "undefined" it still works bc they are strings
  // not types so they're truthy
  if (!name) return;
  // store info about item: completed? id?
  // anytime you have a list of unique items good to have unique id for each
  const item = {
    name,
    // Using Date.now() for id  is ok since we're not creating more than one id
    // every millisecond. This may not be the case for databases.
    id: Date.now(),
    complete: false,
  };
  // Push items into our state
  items.push(item);
  console.log(`There are now ${items.length} items in your state`);
  // Clear the form
  //   e.currentTarget.item.value = '';
  // Clears all the inputs in a particular form
  e.target.reset(); // could use currentTarget as well
  // form events only fire on form, they don't bubble like clicks and hovers

  // calling displayItems here inside handleSubmit isn't ideal bc we also need
  // to call displayItems when items are restored from local storage, when we
  // mark them as complete, when we delete an item, etc. all need to run displayItems
  // Solution: use JavaScript's event system to fire our own events
  // displayItems();

  // fire a custom event that says that the items have been updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  // loop over each item and return a list item for each
  console.log(items);
  // shopping-item class is so CSS picks it up
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input type="checkbox">
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}">&times;</button>
    </li>`
    )
    .join('');
  console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info('Saving items to local storage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restoring from local storage');
  // pull items from local storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items.push(...lsItems); // alternative way
    items = lsItems;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(e) {
  console.log('DELETING ITEM');
}

// we don't use 'click', 'enter', etc on forms bc submit is more flexible
// submit includes if submit happened from click, pressed enter, etc.
shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
// list.addEventListener('itemsUpdated', e => {
//   console.log(e);
// });
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

list.addEventListener('click', function(e) {
  console.log(e.target, e.currentTarget);
});

restoreFromLocalStorage();
