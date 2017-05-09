/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const { E_FAILED, INVALID, FORBIDDEN, NOT_FOUND } = require('..');

describe('constants', () => {

  it('exposes E_FAILED', () => {
    assert.equal(E_FAILED, 'E_FAILED');
  });

  it('exposes INVALID', () => {
    assert.equal(INVALID, 'INVALID');
  });

  it('exposes FORBIDDEN', () => {
    assert.equal(FORBIDDEN, 'FORBIDDEN');
  });

  it('exposes NOT_FOUND', () => {
    assert.equal(NOT_FOUND, 'NOT_FOUND');
  });

});
