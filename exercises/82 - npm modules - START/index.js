// We don't include .js extensions or a path in our imports bc they are
// modules that have been npm installed. THis is the advantage to using
// a bundler like Parcel over just a browser
import wait from 'waait';
import faker from 'faker';
// below is the old syntax for importing. You'll see it sometimes in node projects
// it works just like the above import... from syntax
// var faker = require('faker');
// Alternatively, you can import just a part of a package
import { name } from 'faker';
import { formatDistance, format } from 'date-fns';
import axios from 'axios';
import { intersection, isEqual } from 'lodash';
import to from 'await-to-js';

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

// format a date
const date = new Date();
const formatted = format(date, `LLLL 'the' do',' yyyy`);
console.log(formatted);

async function getJoke() {
  const { data } = await axios.get('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  });
  console.log(data);
}

getJoke();

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [4, 2, 6, 24, 5, 7, 8, 234, 63, 2];

const sameValues = intersection(a, b);
console.log(sameValues);

const person1 = { name: 'joe' };
const person2 = { name: 'joe' };
console.log(person1 === person2);
console.log(isEqual(person1, person2));

checkIfNameIsCool(name) {
  return new Promise(function(resolve, reject) {
    if (name === 'Wes') {
      resolve('Cool name');
      return;
    }
    reject(new Error('not a cool name'));
  })
}