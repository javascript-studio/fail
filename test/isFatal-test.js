/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const { isFatal, E_FAILED, INVALID } = require('..');

describe('isFatal', () => {

  it('returns true for error with no code property', () => {
    const err = new Error();

    assert.equal(isFatal(err), true);
  });

  it('returns false for code INVALID', () => {
    const err = new Error();
    err.code = INVALID;

    assert.equal(isFatal(err), false);
  });

  it('returns true for code E_FAILED', () => {
    const err = new Error();
    err.code = E_FAILED;

    assert.equal(isFatal(err), true);
  });

  it('returns false for custom non-fatal', () => {
    const err = new Error();
    err.code = 'THIS_IS_NOT_NORMAL';

    assert.equal(isFatal(err), false);
  });

  it('returns true for custom fatal', () => {
    const err = new Error();
    err.code = 'E_THIS_IS_NOT_NORMAL';

    assert.equal(isFatal(err), true);
  });

  it('returns true for non-string code', () => {
    const err = new Error();
    err.code = 404;

    assert.equal(isFatal(err), true);
  });

});
