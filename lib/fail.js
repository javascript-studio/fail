/*
 * Copyright (c) Maximilian Antoni <max@javascript.studio>
 */
'use strict';

function failure(message, cause, code) {
  const err = new Error(message);
  if (typeof cause === 'string') {
    if (code) {
      Object.defineProperty(err, 'properties', {
        value: Object.freeze(code)
      });
    }
    code = cause;
    cause = null;
  }
  if (cause) {
    Object.defineProperty(err, 'cause', {
      value: cause
    });
  }
  Object.defineProperty(err, 'code', {
    value: code || exports.E_FAILED
  });
  return err;
}

exports.failure = failure;

exports.fail = function (callback, message, cause, code) {
  callback(failure(message, cause, code));
};

exports.isFatal = function (err) {
  return typeof err.code !== 'string' || /^E_/.test(err.code);
};

// Error codes causing status 400
exports.INVALID = 'INVALID';
exports.FORBIDDEN = 'FORBIDDEN';
exports.NOT_FOUND = 'NOT_FOUND';

// Error codes causing status 500
exports.E_FAILED = 'E_FAILED';

exports.then = function (callback, next) {
  return (err, value) => {
    if (next === null) {
      throw failure('Callback invoked twice', err);
    }
    const fn = next;
    next = null;
    if (err) {
      callback(err);
      return;
    }
    fn(value);
  };
};
