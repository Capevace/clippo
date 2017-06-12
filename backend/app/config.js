const path = require('path');

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  buildPath: process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '../../frontend/dist/production')
    : path.resolve(__dirname, '../../frontend/dist/dev')
};

module.exports = config;
