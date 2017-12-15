// circularJSONStringify
// https://gist.github.com/DenisIzmaylov/98019ab12051e59601dc
export default obj => {
  const cache = [];
  const result = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value; // eslint-disable-line
  });
  cache.length = 0;
  return result;
};
