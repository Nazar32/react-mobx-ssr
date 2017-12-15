require('babel-core/register');
require('babel-polyfill');

const dev = process.env.NODE_ENV === 'development' ? '.dev' : '';
const path = `./index${dev}`;
require(path); // eslint-disable-line
