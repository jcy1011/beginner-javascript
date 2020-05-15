console.log('stymie - to present an obstacle to : stand in the way of');

// First we need to create a closure to create scope for each gallery
// so that they don't interfere with each other but can resue the same code
function Gallery(gallery) {
  // console.log(gallery);
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  // select elements we need (images) inside this function so the galleries don't clash
  const images = Array.from(gallery.querySelectorAll('img'));
  console.log(images);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
