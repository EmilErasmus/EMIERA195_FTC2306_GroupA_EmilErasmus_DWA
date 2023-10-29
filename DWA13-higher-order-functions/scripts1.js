/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

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
  residence: names.reduce((result, current, index) => {
    result[current] = provinces[index];
    return result;
  }, {}),
};

console.log(
  results.provincesUpper,
  results.charNames,
  results.sortedProvinces,
  results.noCapeArr,
  results.containsS,
  results.residence,
);
