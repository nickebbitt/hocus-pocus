# Changelog

All notable changes to the **Hocus Pocus** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2020-04-04

### Fixed

- "Create Variable" now works well from variable declarations & JSX syntax

## [1.2.0] - 2020-04-04 - I handle async functions 🔮

### Added

- "Create Function" now adds `async` keyword if used with `await`, thanks to @automatensalat

So this code:

```js
const result = await doSomething();
```

Will generate:

```js
async function doSomething() {}
```

## [1.1.0] - 2019-12-22 - I can create variables 🔮

### Added

- **(New Feature)** Create Variable

## [1.0.0] - 2019-12-16 - I can create functions 🔮

### Added

- **(New Feature)** Create Function

<!-- Links -->

[unreleased]: https://github.com/nicoespeon/hocus-pocus/compare/1.2.1...HEAD
[1.2.1]: https://github.com/nicoespeon/hocus-pocus/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/nicoespeon/hocus-pocus/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/nicoespeon/hocus-pocus/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/nicoespeon/hocus-pocus/compare/5b3d351042d09ea26486598158069bce37b474b7...1.0.0
