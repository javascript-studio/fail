'use strict';

/**
 * @typedef {Object} FailureProps
 * @property {string} code - The error code
 * @property {Error} [cause] - The cause of the error
 * @property {Record<string, *>} [properties] - The error properties
 */
/**
 * @typedef {Error & FailureProps} Failure
 */

/**
 * @param {string} message - The error message
 * @param {string | Error | null} [cause] - The cause of the error or the error code
 * @param {string | Error | Record<string, *>} [code] - The error code or the error properties
 * @returns {Failure} - The error
 */
function failure(message, cause, code) {
  const err = /** @type {Failure} */ (new Error(message));
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

/**
 * @template {Object} V
 * @callback Callback
 * @param {Failure | Error | null} [err]
 * @param {V} [value]
 */

/**
 * @param {Callback<Object>} callback - The callback
 * @param {string} message - The error message
 * @param {string | Error} [cause] - The cause of the error or the error code
 * @param {string | Error | Record<string, *>} [code] - The error code or the error properties
 */
exports.fail = function (callback, message, cause, code) {
  callback(failure(message, cause, code));
};

/**
 * @param {Failure | Error} err - The error
 * @returns {boolean} - Whether the error is fatal
 */
exports.isFatal = function (err) {
  return (
    !('code' in err) || typeof err.code !== 'string' || /^E_/.test(err.code)
  );
};

// Error codes causing status 400
exports.INVALID = 'INVALID';
exports.FORBIDDEN = 'FORBIDDEN';
exports.NOT_FOUND = 'NOT_FOUND';

// Error codes causing status 500
exports.E_FAILED = 'E_FAILED';

/**
 * @template {Object} V
 * @template {Object} R
 * @callback Next
 * @param {V} [value]
 * @returns {R}
 */

/**
 * @template {Object} V
 * @template {Object} R
 * @param {Callback<R>} callback
 * @param {Next<V, R>} [next]
 * @returns {Callback<V>}
 */
exports.then = function (callback, next) {
  return (err, value) => {
    if (!next) {
      throw failure('Callback invoked twice', err);
    }
    const fn = next;
    next = undefined;
    if (err) {
      callback(err);
      return;
    }
    const result = fn(value);
    if (result !== undefined) {
      callback(null, result);
    }
  };
};
