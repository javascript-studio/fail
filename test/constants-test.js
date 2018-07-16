/*eslint-env mocha*/
'use strict';

const { assert } = require('@sinonjs/referee');
const { E_FAILED, INVALID, FORBIDDEN, NOT_FOUND } = require('..');

describe('constants', () => {

  it('exposes E_FAILED', () => {
    assert.equals(E_FAILED, 'E_FAILED');
  });

  it('exposes INVALID', () => {
    assert.equals(INVALID, 'INVALID');
  });

  it('exposes FORBIDDEN', () => {
    assert.equals(FORBIDDEN, 'FORBIDDEN');
  });

  it('exposes NOT_FOUND', () => {
    assert.equals(NOT_FOUND, 'NOT_FOUND');
  });

});
