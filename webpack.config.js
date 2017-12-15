const commonConfig = require('./webpack-builder/webpack.common');
const webpackMerge = require('webpack-merge');

const addons = addonsArg => {
  const concAddons = [].concat.apply([], [addonsArg]).filter(Boolean);

  return concAddons.map(addonName => require(`./webpack-builder/addons/webpack.${addonName}.js`)); // eslint-disable-line
};

module.exports = (env = { env: 'dev' }) => {
  const envConfig = require(`./webpack-builder/webpack.${env.env}.js`); // eslint-disable-line
  const mergedConfig = webpackMerge(commonConfig, envConfig, ...addons(env.addons));
  return mergedConfig;
};
