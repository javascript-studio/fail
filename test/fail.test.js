'use strict';

const { assert, match, sinon } = require('@sinonjs/referee-sinon');
const { fail, E_FAILED, INVALID } = require('..');

/**
 * @typedef {import('..').Failure} Failure
 */

describe('fail', () => {
  it('invokes the given callback with an error using the message', () => {
    const callback = sinon.fake();

    fail(callback, 'Oups!');

    assert.calledOnceWith(callback, match({ message: 'Oups!' }));
  });

  it('defaults the error code to E_FAILED', () => {
    const callback = sinon.fake();

    fail(callback, 'Oups!');

    assert.calledOnceWith(callback, match({ code: E_FAILED }));
  });

  it('adds the given error code on the error object', () => {
    const callback = sinon.fake();

    fail(callback, 'Oups!', INVALID);

    assert.calledOnceWith(callback, match({ code: INVALID }));
  });

  it('adds the given cause on the error object', () => {
    const cause = new TypeError();
    const callback = sinon.fake();

    fail(callback, 'Oups!', cause);

    assert.calledOnceWith(callback, match({ cause }));
  });

  it('adds the given cause and error code on the error object', () => {
    const cause = new TypeError();
    const callback = sinon.fake();

    fail(callback, 'Oups!', cause, INVALID);

    assert.calledOnceWith(callback, match({ cause, code: INVALID }));
  });

  it('adds the given properties on the error object', () => {
    const callback = sinon.fake();

    fail(callback, 'Oups!', INVALID, { some: 42 });

    assert.calledOnceWith(
      callback,
      match({ code: INVALID, properties: { some: 42 } })
    );
    const error = callback.firstCall.args[0];
    assert.isUndefined(error.cause);
  });

  it('does not allow to change the error code', () => {
    const callback = sinon.fake();
    fail(callback, 'Oups!', INVALID);
    const error = callback.firstCall.args[0];

    assert.exception(() => {
      error.code = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the cause', () => {
    const callback = sinon.fake();
    fail(callback, 'Oups!', new TypeError());
    const error = callback.firstCall.args[0];

    assert.exception(() => {
      error.cause = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties', () => {
    const callback = sinon.fake();
    fail(callback, 'Oups!', INVALID, { some: 42 });
    const error = callback.firstCall.args[0];

    assert.exception(() => {
      error.properties = 'X';
    }, /TypeError/);
  });

  it('does not allow to change the properties content', () => {
    const callback = sinon.fake();
    fail(callback, 'Oups!', INVALID, { some: 42 });
    const error = callback.firstCall.args[0];

    assert.exception(() => {
      error.properties.some = 'X';
    }, /TypeError/);
  });
});
