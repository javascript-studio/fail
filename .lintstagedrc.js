'use strict';

module.exports = {
  '*.js': ['eslint --fix', 'mocha'],
  '*.{js,json,md}': 'prettier --write'
};
