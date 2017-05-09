# JavaScript Studio Fail

Fail with an `Error` object and a conventional `code` property.

## Usage

```js
const { fail, INVALID } = require('@studio/fail');

function analyze(script, callback) {
  if (!script) {
    fail(callback, 'Missing script', INVALID);
    return;
  }

  // ...

  callback(null);
}
```

## Conventions

Errors should always have a `code` property with an uppercase error code. To
simplify error handling, use the provided `fail` utility function and code
constants.

Error codes follow these conventions:

- Fatal errors should have an error code starting with `E_`. This is the
  asynchronous equivalent to `throw`. The provided `message` is not supposed to
  be shown to the user.
- Other error codes have no prefix and are not considered fatal, for example a
  validation error. The provided `message` may be shown to the user.
- If no `code` property is provided, assume `E_FAILED`.

The provided error codes can be handled generically. You may define additional
error codes as needed.

## API

- `fail(callback, message[, code])`: Create an `Error` with the given message
  and `code` property. If no `code` is provided it defaults to `E_FAILED`.
- `isFatal(error)`: Whether the given error has a `code` property the starts
  with `E_` or has no `code` property.

### Error codes

- `E_FAILED`: Fatal error.
- `INVALID`: Invalid or missing argument or parameter.
- `FORBIDDEN`: User is not allowed to access.
- `NOT_FOUND`: Resource does not exist.
