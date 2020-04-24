// console.log('HIIII');

const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  // grab the image source
  const imgSrc = card.querySelector('img').src;
  //   console.log(imgSrc);
  const desc = card.dataset.description;
  const name = card.querySelector('h2').textContent;
  // populate the modal with the new info
  // image takes a sec to load so it janks up and down when coming on screen
  // workaround: add width and height to img
  modalInner.innerHTML = `
    <img width="600" height="600" src="${imgSrc.replace(
      '200',
      '600'
    )}" alt="${name}"/>
    <p>${desc}</p>
  `;
  // show the modal
  modalOuter.classList.add('open');
}

cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function(event) {
  // Use ! to give us an wasy-to-work-with Boolean
  const isOutside = !event.target.closest('.modal-inner');
  //   console.log(isOutside);
  //   console.log(event);
  //   console.log(event.target);
  //   console.log(event.currentTarget);
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Notice how the image
