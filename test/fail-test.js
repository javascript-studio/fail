/*eslint-env mocha*/
'use strict';

const { assert } = require('@sinonjs/referee-sinon');
const { fail, E_FAILED, INVALID } = require('..');

describe('fail', () => {
  it('invokes the given callback with an error using the message', () => {
    let error;

    fail((err) => {
      error = err;
    }, 'Oups!');

    assert.isError(error);
    assert.equals(error.message, 'Oups!');
  });

  it('defaults the error code to E_FAILED', () => {
    let error;

    fail((err) => {
      error = err;
    }, 'Oups!');

    assert.equals(error.code, E_FAILED);
  });

  it('adds the given error code on the error object', () => {
    let error;

    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      INVALID
    );

    assert.equals(error.code, INVALID);
  });

  it('adds the given cause on the error object', () => {
    const cause = new TypeError();
    let error;

    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      cause
    );

    assert.equals(error.cause, cause);
  });

  it('adds the given cause and error code on the error object', () => {
    const cause = new TypeError();
    let error;

    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      cause,
      INVALID
    );

    assert.equals(error.cause, cause);
    assert.equals(error.code, INVALID);
  });

  it('adds the given properties on the error object', () => {
    let error;

    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      INVALID,
      { some: 42 }
    );

    assert.equals(error.properties, { some: 42 });
    assert.equals(error.code, INVALID);
    assert.isUndefined(error.cause);
  });

  it('does not allow to change the error code', () => {
    let error;
    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      INVALID
    );

    assert.exception(() => {
      error.code = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the cause', () => {
    let error;
    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      new TypeError()
    );

    assert.exception(() => {
      error.cause = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties', () => {
    let error;
    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      INVALID,
      { some: 42 }
    );

    assert.exception(() => {
      error.properties = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties content', () => {
    let error;
    fail(
      (err) => {
        error = err;
      },
      'Oups!',
      INVALID,
      { some: 42 }
    );

    assert.exception(() => {
      error.properties.some = 'X';
    }, /TypeError/);
  });
});
