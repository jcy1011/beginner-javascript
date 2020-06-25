import wait from 'waait';
import faker from 'faker';
// below is the old syntax for importing. You'll see it sometimes in node projects
// it works just like the above import... from syntax
// var faker = require('faker');

// Alternatively, you can import just a part of a package
import { name } from 'faker';

import { formatDistance } from 'date-fns';

console.log(`Hello, ${name.lastName()}!`);

console.log(faker);
console.log(`Hello, ${faker.name.firstName()}!`);

// create an array with 10 fake names
const fakeNames = Array.from(
  { length: 10 },
  () => `${name.firstName()} ${name.lastName()}`
);
console.log(fakeNames);

async function go() {
  console.log('Going!');
  await wait(200);
  console.log('ending.');
}

go();

const diff = formatDistance(
  new Date(1986, 3, 4, 11, 32, 0),
  new Date(1986, 3, 4, 10, 32, 0),
  { addSuffix: true }
); //= > 'in about 1 hour'
console.log(diff);
