const products = [
  { product: 'banana', price: '2' },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: '8' },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// const convertedPrices = (products
//   .filter((product) => product.price !== '' && !Number.isNaN(Number(product.price)))
//   .map((product) => ({ ...product, price: Number(product.price) })))
//   .reduce((total, product) => total + product.price, 0);

console.log(
  products.forEach((val) => {
    console.log(val.product);
  }),

  products.filter((val) => val.product.length > 5),

  (products
    .filter((product) => product.price !== '' && !Number.isNaN(Number(product.price)))
    .map((product) => ({ ...product, price: Number(product.price) })))
    .reduce((total, product) => total + product.price, 0),

  products.reduce((result, val, index) => {
    if (index === 0) {
      return val.product;
    }
    if (index === products.length - 1) {
      return `${result} and ${val.product}`;
    }
    return `${result}, ${val.product}`;
  }, ''),

  products.reduce(
    (result, { product, price }) => {
      const numericPrice = parseFloat(price);

      if (!isNaN(numericPrice)) {
        if (numericPrice > result.highest.price) {
          result.highest = { product, price: numericPrice };
        }

        if (numericPrice < result.lowest.price) {
          result.lowest = { product, price: numericPrice };
        }
      }

      return result;
    },
    {
      highest: { price: -Infinity },
      lowest: { price: Infinity },
    },
  ),
  (resultString = `Highest: ${result.highest.product}. Lowest: ${result.lowest.product}.`),
);

// console.log(convertedPrices);
