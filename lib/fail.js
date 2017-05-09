/*
 * Copyright (c) Maximilian Antoni <max@javascript.studio>
 */
'use strict';

exports.fail = function (callback, message, code) {
  const err = new Error(message);
  Object.defineProperty(err, 'code', {
    value: code || exports.E_FAILED
  });
  callback(err);
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
