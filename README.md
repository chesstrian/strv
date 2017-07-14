# STRV
[![Build Status](https://travis-ci.com/chesstrian/strv.svg?token=rzW7Ckt4qZzx3cW2JUxP&branch=master)](https://travis-ci.com/chesstrian/strv)
> STRV NodeJS Backend Test Project

Test project to apply to NodeJS Backend Developer position on STRV. Please refer to [Test project.md](./Test project.md) to check details.

## Installation

In order to run the project locally:

* Install NodeJS 8
* Install MongoDB
* Clone the repository
* Install dependencies:

```bash
cd strv
npm install
```

## Run

Using the following way to run the project does not require installing `gulp` globally:

```bash
npm start
```

Using gulp directly does require installing gulp globally:

```bash
npm install --global gulp  # Run this once
gulp
```

## Development

The project uses es6 syntax. Use `gulp` to help you extend the code:

### Build

Transpile javascript from es6 to es5:

```bash
gulp build
```

### Clean

Delete es5 directory:

```bash
gulp clean
```

### Code style

Check code style:

```bash
gulp jscs
```

### Lint

Check for errors and potential issues:

```bash
gulp jshint
```

### Run

Run project on development mode, it watches for code changes, check code, transpile and reload:

```bash
gulp server
```

### Test

Run tests, it transpiles and run unit tests:

```bash
gulp test
```

### Default

Default task, same than `server`:

```bash
gulp
```

## Configuration

The `config` directory contains project parameters, `default.json` file is used, but any other file related to `NODE_ENV` environment variable will be loaded as well. For example, if `process.env.NODE_ENV` is `test`, `test.json` file will replace values, or use default values from `default.json` if key is not defined in the `test.json` file or it does not exist.

## Test

Write new tests in `src/tests` directory using es6 syntax, any test inside directory will run with:

```bash
gulp test
```

## API Reference

> TODO

## Database

This project uses MongoDB, please check `config/default.json` file to fit database setup to your needs.

## License

MIT
