/*eslint-env mocha*/
'use strict';

const { assert } = require('@sinonjs/referee-sinon');
const { failure, E_FAILED, INVALID } = require('..');

describe('failure', () => {

  it('creates an error using the message', () => {
    const error = failure('Oups!');

    assert.isError(error);
    assert.equals(error.message, 'Oups!');
  });

  it('defaults the error code to E_FAILED', () => {
    const error = failure('Oups!');

    assert.equals(error.code, E_FAILED);
  });

  it('adds the given error code on the error object', () => {
    const error = failure('Oups!', INVALID);

    assert.equals(error.code, INVALID);
  });

  it('adds the given cause on the error object', () => {
    const cause = new TypeError();

    const error = failure('Oups!', cause);

    assert.equals(error.cause, cause);
  });

  it('adds the given cause and error code on the error object', () => {
    const cause = new TypeError();

    const error = failure('Oups!', cause, INVALID);

    assert.equals(error.cause, cause);
    assert.equals(error.code, INVALID);
  });

  it('adds the given properties on the error object', () => {
    const error = failure('Oups!', INVALID, { some: 42 });

    assert.equals(error.properties, { some: 42 });
    assert.equals(error.code, INVALID);
    assert.isUndefined(error.cause);
  });

  it('does not allow to change the error code', () => {
    const error = failure('Oups!', INVALID);

    assert.exception(() => {
      error.code = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the cause', () => {
    const error = failure('Oups!', new TypeError());

    assert.exception(() => {
      error.cause = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties', () => {
    const error = failure('Oups!', INVALID, { some: 42 });

    assert.exception(() => {
      error.properties = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties content', () => {
    const error = failure('Oups!', INVALID, { some: 42 });

    assert.exception(() => {
      error.properties.some = 'X';
    }, /TypeError/);
  });

});
