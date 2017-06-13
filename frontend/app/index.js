// If we're building for SSR then use a different entry file
if (process.env.NODE_ENV === 'ssr') {
  module.exports = require('./ssr');
} else {
  require('./client');
}
