/*eslint-env mocha*/
'use strict';

const assert = require('assert');
const { fail, E_FAILED, INVALID } = require('..');

describe('fail', () => {

  it('invokes the given callback with an error using the message', () => {
    let error;

    fail((err) => { error = err; }, 'Oups!');

    assert.equal(error instanceof Error, true);
    assert.equal(error.message, 'Oups!');
  });

  it('defaults the error code to E_FAILED', () => {
    let error;

    fail((err) => { error = err; }, 'Oups!');

    assert.equal(error.code, E_FAILED);
  });

  it('adds the given error code on the error object', () => {
    let error;

    fail((err) => { error = err; }, 'Oups!', INVALID);

    assert.equal(error.code, INVALID);
  });

  it('adds the given cause on the error object', () => {
    const cause = new TypeError();
    let error;

    fail((err) => { error = err; }, 'Oups!', cause);

    assert.equal(error.cause, cause);
  });

  it('adds the given cause and error code on the error object', () => {
    const cause = new TypeError();
    let error;

    fail((err) => { error = err; }, 'Oups!', cause, INVALID);

    assert.equal(error.cause, cause);
    assert.equal(error.code, INVALID);
  });

  it('does not allow to change the error code', () => {
    let error;
    fail((err) => { error = err; }, 'Oups!', INVALID);

    assert.throws(() => {
      error.code = 'X';
    }, TypeError);
  });

  it('does not allow to change the cause', () => {
    let error;
    fail((err) => { error = err; }, 'Oups!', new TypeError());

    assert.throws(() => {
      error.cause = 'X';
    }, TypeError);
  });

});
