<h1 align="center">
  Studio Fail
</h1>
<p align="center">
  🚨 Fail with an `Error` object and a conventional `code` property.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@studio/fail">
    <img src="https://img.shields.io/npm/v/@studio/fail.svg" alt="npm Version">
  </a>
  <a href="https://semver.org">
    <img src="https://img.shields.io/:semver-%E2%9C%93-blue.svg" alt="SemVer">
  </a>
  <a href="https://github.com/javascript-studio/fail/actions">
    <img src="https://github.com/javascript-studio/studio-fail/workflows/Build/badge.svg" alt="Build Status">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="License">
  </a>
</p>

## Usage (async / await)

```js
const { failure, INVALID } = require('@studio/fail');

function read(filename, callback) {
  if (!filename) {
    // Easily fail with a conventional error:
    throw failure('Missing filename', INVALID);
  }

  // ...
}
```

## Usage (callback)

```js
const fs = require('fs');
const { fail, then, INVALID } = require('@studio/fail');

function read(filename, callback) {
  if (!filename) {
    // Easily fail with a conventional error:
    fail(callback, 'Missing filename', INVALID);
    return;
  }

  // Wrap callbacks with and error handling, guarding from multiple invocations:
  fs.readFile(
    filename,
    'utf8',
    then(callback, (content) => {
      // Non-undefined return value is passed to callback:
      return content.trim();
    })
  );
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
- If no `code` property is provided, it defaults to `E_FAILED`.

The provided error codes can be handled generically. You may define additional
error codes as needed.

## Install

```bash
❯ npm i @studio/fail
```

## API

- `failure(message[, cause][, code[, properties]])`: Create an `Error`
  with the given message and `cause` and `code` and `properties`. If no `code`
  is provided it defaults to `E_FAILED`. The `cause` must be an error object.
- `fail(callback, message[, cause][, code[, properties]])`: Creates a failure
  and invoked the given `callback` with it.
- `isFatal(error)`: Whether the given error has a `code` property the starts
  with `E_` or has no `code` property.
- `then(callback, next)`: Create a callback function that invokes
  `callback(err)` if an error occurred and `next(result)` on success. Throws if
  the function is invoked more than once with error code `E_FAILED` and `err`
  as the cause. If `next` returns a non-undefined value, the `callback` is
  invoked with that result.

### Error codes

- `E_FAILED`: Fatal error.
- `INVALID`: Invalid or missing argument or parameter.
- `FORBIDDEN`: User is not allowed to access.
- `NOT_FOUND`: Resource does not exist.

## Examples

Throwing errors:

```js
const { failure, INVALID } = require('@studio/fail');

// Fail with a message:
throw failure('Oups!');

// The previous is the same as this:
throw failure('Oups!', E_FAILED);

// Fail with `code` INVALID:
throw failure('Oups!', INVALID);

// Fail with a `cause`:
const cause = new Error();
throw failure('Oups!', cause);

// Fail with a `cause` and `code` INVALID:
throw failure('Oups!', cause, INVALID);

// Fail with `properties` and `code` INVALID:
throw failure('Oups!', INVALID, { some: 42 });
```

Invoking callbacks with errors:

```js
const { fail, FORBIDDEN } = require('@studio/fail');

fail(callback, 'Oups!', FORBIDDEN);
```

## Related modules

- 👻 [Studio Log][1] is a tiny ndjson logger that is `code` and `cause` aware.
- 📦 [Studio Changes][2] is used to create the changelog for this module.

## License

MIT

<p align="center">Made with ❤️ on 🌍<p>

[1]: https://github.com/javascript-studio/studio-log
[2]: https://github.com/javascript-studio/studio-changes
