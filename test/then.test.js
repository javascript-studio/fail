'use strict';

const { assert, refute, sinon } = require('@sinonjs/referee-sinon');
const { then } = require('..');

describe('then', () => {
  it('invokes callback with error', () => {
    const callback = sinon.fake();
    const next = sinon.fake();
    const err = new Error();

    then(callback, next)(err);

    assert.calledOnceWith(callback, err);
    refute.called(next);
  });

  it('invokes next with result', () => {
    const callback = sinon.fake();
    const next = sinon.fake();

    then(callback, next)(null, 42);

    assert.calledOnceWith(next, 42);
    refute.called(callback);
  });

  it('throws if called twice with error, adding the error as the cause', () => {
    const callback = sinon.fake();
    const next = sinon.fake();
    const err = new Error();

    const cb = then(callback, next);
    cb(err);

    assert.exception(
      () => {
        cb(err);
      },
      {
        name: 'Error',
        code: 'E_FAILED',
        message: 'Callback invoked twice',
        cause: err
      }
    );
  });

  it('throws if called twice with result', () => {
    const callback = sinon.fake();
    const next = sinon.fake();

    const cb = then(callback, next);
    cb(null, 42);

    assert.exception(
      () => {
        cb(null, 42);
      },
      {
        name: 'Error',
        code: 'E_FAILED',
        message: 'Callback invoked twice'
      }
    );
  });

  it(`throws if called once with result and then with error, adding the error
      as the cause`, () => {
    const callback = sinon.fake();
    const next = sinon.fake();
    const err = new Error();

    const cb = then(callback, next);
    cb(null, 42);

    assert.exception(
      () => {
        cb(err);
      },
      {
        name: 'Error',
        code: 'E_FAILED',
        message: 'Callback invoked twice',
        cause: err
      }
    );
  });

  it('invokes callback with `next` return value', () => {
    const callback = sinon.fake();
    const next = sinon.fake.returns(42);

    then(callback, next)();

    assert.calledOnce(next);
    assert.calledOnceWith(callback, null, 42);
  });

  it('invokes callback with `next` returned `null`', () => {
    const callback = sinon.fake();
    const next = sinon.fake.returns(null);

    then(callback, next)();

    assert.calledOnce(next);
    assert.calledOnceWith(callback, null, null);
  });

  it('throws if invoked again after return', () => {
    const callback = sinon.fake();
    const next = sinon.fake.returns(7);

    const cb = then(callback, next);
    cb();

    assert.exception(
      () => {
        cb(null, 666);
      },
      {
        name: 'Error',
        code: 'E_FAILED',
        message: 'Callback invoked twice'
      }
    );
  });
});
