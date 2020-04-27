console.log('IT WORKS... BRO!');

const terms = document.querySelector('.terms-and-conditions');
const button = document.querySelector('.accept');

function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    // stop observing button so not running in background. Free up CPUs
    ob.unobserve(terms.lastElementChild);
  }
  //   this along with removing unobserve above would make button appear
  //   and reappear every time you scroll to and from it
  //   could be useful for images but not here
  //   else {button.disabled = true;}
}

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1,
});

ob.observe(terms.lastElementChild);

// using scroll events is the old way of doing it. Not going into detail
// terms.addEventListener('scroll', function(e) {
//   console.log(e.currentTarget);
// });
