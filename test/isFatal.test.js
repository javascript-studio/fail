'use strict';

const { assert } = require('@sinonjs/referee-sinon');
const { isFatal, failure, E_FAILED, INVALID } = require('..');

describe('isFatal', () => {
  it('returns true for error with no code property', () => {
    const err = new Error();

    assert.isTrue(isFatal(err));
  });

  it('returns false for code INVALID', () => {
    const err = failure('Test', INVALID);

    assert.isFalse(isFatal(err));
  });

  it('returns true for code E_FAILED', () => {
    const err = failure('Test', E_FAILED);

    assert.isTrue(isFatal(err));
  });

  it('returns false for custom non-fatal', () => {
    const err = failure('Test', 'THIS_IS_NOT_NORMAL');

    assert.isFalse(isFatal(err));
  });

  it('returns true for custom fatal', () => {
    const err = failure('Test', 'E_THIS_IS_NOT_NORMAL');

    assert.isTrue(isFatal(err));
  });

  it('returns true for non-string code', () => {
    // @ts-expect-error
    const err = failure('Test', 404);

    assert.isTrue(isFatal(err));
  });
});
