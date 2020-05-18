// console.log('stymie - to present an obstacle to : stand in the way of');

// First we need to create a closure to create scope for each gallery
// so that they don't interfere with each other but can resue the same code
function Gallery(gallery) {
  // console.log(gallery);
  if (!gallery) {
    throw new Error('No gallery found!'); // displays error in console
  }

  // select elements we need (images) inside Gallery function so the galleries
  // don't clash. Do this by calling querySelector on gallery not document
  const images = Array.from(gallery.querySelectorAll('img'));
  console.log(images);
  // Ok to use document bc HTML is shared and only possible to have one modal
  // open at any time
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  // keep track of the currently opened image so prev and nextButtons work
  let currentImage;

  function openModal() {
    console.info('Opening modal...');
    // First check if modal is already open so we don't retrigger opening animations
    if (modal.matches('.open')) {
      console.info('Modal already open');
      return; // stops function from running
    }
    modal.classList.add('open');

    // Event listeners bound when open modal. If we add them outside the function
    // we'll get an error bc more than one listener on one thing
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // when user clicks on image, we update modal with associated images and
  // open the modal
  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    // otherwise update the modal with this info: src, h2, p
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  // refactored this below passing e => showImage
  // function handleImageClick(event) {
  //   showImage(event.currentTarget);
  // }

  // EVENT LISTENERS
  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );
  images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    })
  );
  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
