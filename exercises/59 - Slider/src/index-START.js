// console.log('disabuse: to free from error, misconception, or fallacy');

function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider element passed');
  }
  // declare variables for working with the slider. Will initialize when the
  // slider starts, user navigates with prev/next buttons. These variables
  // live inside the closure of the Slider function
  let prev;
  let current;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');
  // console.log(prevButton);
  // console.log(nextButton);

  function startSlider() {
    // if we had declared current here instead of above, then we would not
    // be able to use the variable outside of this function, but we need to
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // first strip the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    // hotshot alternative to the above, Wes thinks it's less readable though
    // [prev, current, next].forEach(el =>
    //   el.classList.remove(...classesToRemove)
    // );

    // Use destructuring to switch varibles easily
    if (direction === 'back') {
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild, // OR wraps
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild, // OR wraps
      ];
    }

    applyClasses();
  }

  startSlider();
  applyClasses();

  // Event listeners
  // if you need to pass an argument to a callback function then you need to
  // run an arrow function or use call/apply. If you don't need to pass args
  // then you can simply pass a reference to the function
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));

// Additional features to consider adding:
// key bindings: get arrow keys to move slides when user is focused on div
