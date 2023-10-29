const products = [
  { product: 'banana', price: '2' },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: '8' },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

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

  products.reduce((total, current, index, arr) => {
    if (index === arr.length - 2) {
      total += `${current.product} and `;
    } else if (index === arr.length - 1) {
      total += current.product;
    } else {
      total += `${current.product}, `;
    }
    return total;
  }, ''),

  (() => {
    const res = products.reduce(
      (result, current) => {
        const numPrice = parseFloat(current.price);

        if (!isNaN(numPrice)) {
          if (numPrice > result.highest) {
            result.highest = numPrice;
            result.highProd = current.product;
          }

          if (numPrice < result.lowest) {
            result.lowest = numPrice;
            result.lowProd = current.product;
          }
        }

        return result;
      },
      {
        highest: 0,
        lowest: 100,
        highProd: '',
        lowProd: '',
      },
    );

    return `Highest: ${res.highProd}. Lowest: ${res.lowProd}`;
  })(),

  products.reduce((acc, product) => {
    const transformedProduct = Object.entries(product).reduce((obj, [key, value]) => {
      if (key === 'product') {
        obj.name = value;
      } else if (key === 'price') {
        obj.cost = value;
      } else {
        obj[key] = value;
      }
      return obj;
    }, {});

    acc.push(transformedProduct);
    return acc;
  }, []),
);
