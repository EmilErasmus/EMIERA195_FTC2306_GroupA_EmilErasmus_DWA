/* eslint-disable no-console */
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

/*
Use forEach to console log each name to the console. You are allowed to call
console.log seven times.

Use forEach to console log each name with a matching province (for example
Ashwin (Western Cape). Note that you are only allowed to call console.log seven
times.

Using map loop over all province names and turn the string to all uppercase. Log
the new array to the console.

Create a new array with map that has the amount of characters in each name. The
result should be: [6, 9, 11, 5, 7, 7]

Using toSorted to sort all provinces alphabetically.

Use filter to remove all provinces that have the word Cape in them.

After filtering the array, return the amount of provinces left. The final value
should be 3.

Create a boolean array by using map and some to determine whether a name
contains an S character. The result should be [true, true, false, true, true,
false].

Using only reduce, turn the above into an object that indicates the province of
an individual.
*/

names.forEach((val) => {
  console.log(val);
});

names.forEach((val, index) => {
  console.log(`${val} (${provinces[index]})`);
});

const results = {
  provincesUpper: provinces.map((val) => val.toLocaleUpperCase()),
  charNames: names.map((val) => val.length),
  sortedProvinces: provinces.toSorted(),
  noCapeArr: (provinces.filter((val) => !val.toLowerCase().includes('cape'))).length,
  containsS: names.map((name) => name.toLowerCase().split('').some((char) => char === 's')),
};

console.log(
  results.provincesUpper,
  results.charNames,
  results.sortedProvinces,
  results.noCapeArr,
  results.containsS,
);

const residence = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});

console.log(residence);
