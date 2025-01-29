/* Vivek@28/01 on VSCode  */

// utility to convert object keys from snake to camelcase
const snakeToCamelCase = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    acc[camelKey] = obj[key];
    return acc;
  }, {});

const undefinedOrValue = (o, n) => {
  return n === undefined ? o : n;
};

module.exports = {
  snakeToCamelCase,
  undefinedOrValue,
};
