// This module is the "entry point"
// Wes likes his selectors and addEventListeners here
// We moved selectors to solve errors

import { handleClick } from './lib/handlers.js';
import { jokeButton } from './lib/elements.js';

jokeButton.addEventListener('click', handleClick);
