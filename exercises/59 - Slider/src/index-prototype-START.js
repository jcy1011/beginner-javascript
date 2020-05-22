// Wes refers to Slider as the constructor
function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  // select the elements needed for the slider
  this.slides = slider.querySelector('.slides');
  // slider that gets passed in needs to be saved on the instance so we can
  // reference it when using querySelector
  this.slider = slider;
  // we don't refactor the below from variables to this.prevButton bc we don't need
  // these outside of this constructor function, Slider. Regular variables ok
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // when this slider is created, run the start slider function
  this.startSlider();
  this.applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  // add anon arrow function for nextButton so this.move has access to the instance
  nextButton.addEventListener('click', () => this.move());
  // also could have left the 2nd arg of above listener as this.move and added
  // this line of code
  // this.move = this.move.bind(this);
  // or you could have passed the below as the second arg
  // this.move.bind(this)
}

// Here we add methods to the prototype
Slider.prototype.startSlider = function() {
  // debugger; // found out that when startSlider runs this.slider doesn't exist yet
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function(direction) {
  // console.log(this); // this = button
  // first strip all the classes off the current slides
  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    // make an new array of the new values, and destructure them over and into the prev, current and next variables
    [this.prev, this.current, this.next] = [
      // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      // get the next slide, or if it's at the end, loop around and grab the first slide
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

window.dogSlider = dogSlider;
