# Typey Type for Stenographers

**Typey Type** is a free typing app designed for steno students to practise and master stenography.

## What's stenography?

The process of writing shorthand is called stenography. Using a stenotype machine or a fancy keyboard, you can write over 200 words per minute. Typically, steno is used for courtroom reporting, closed captioning, and real-time translation. As a means of entering text, it’s also an excellent ergonomic alternative to typing with a QWERTY keyboard.

## Aim

The aim of Typey Type is to fast-track learning and mastering steno skills. Typey Type helps novice stenographers by giving them:

- immediate feedback on typing speed and accuracy
- progress updates, including progress on brief vocabulary
- a course to follow, including material to type
- links to more information

## Development

### Pre-requisites

Install [yarn](https://yarnpkg.com/lang/en/docs/install/).

### Installation

This project includes a Git submodule for [Typey Type data](https://github.com/didoesdigital/typey-type-data), which includes a Git submodule for [steno dictionaries](https://github.com/didoesdigital/steno-dictionaries). If you want to clone this repository as well as its submodules, you can use the `--recursive` parameter:

```sh
git clone --recursive git@github.com:didoesdigital/typey-type.git
```

Alternatively, if you've already cloned the repository without the `--recursive` parameter, you can load its submodules using `submodule update`:

```sh
git submodule update --init --recursive
```

Once you've cloned the repository and updated its submodules, yarn install packages from `package.json`:

```sh
yarn install
```

### Run the app in development mode

Run the Typey Type app:

```sh
yarn start
```

Open <http://localhost:3000> to view it in the browser.

### Testing

Run the test runner during development:

```sh
yarn run test
```

### Create React App

For reference, Typey Type is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# License

See [LICENSE](./LICENSE).

