# Typey Type for Stenographers

[Typey Type](https://didoesdigital.com/typey-type/) is a free typing app designed for steno students to practise and master stenography.

## Sponsor

You can support [Di’s efforts on Patreon](https://www.patreon.com/didoesdigital). A monthly donation helps [Di](https://didoesdigital.com) build more lessons and features to help you fast-track your steno progress.

## What's stenography?

The process of writing shorthand is called stenography. Using a stenotype machine or a fancy keyboard, you can write over 200 words per minute. Typically, steno is used for courtroom reporting, closed captioning, and real-time translation. As a means of entering text, it’s also an excellent ergonomic alternative to typing with a QWERTY keyboard.

## Aim

The aim of Typey Type is to fast-track learning and mastering steno skills. Typey Type helps novice stenographers by giving them:

- immediate feedback on typing speed and accuracy
- progress updates, including progress on brief vocabulary
- a course to follow, including material to type
- links to more information

Typey Type concentrates on practical skills, such as physical drilling and memorisation of briefs.

## What Typey Type is not

Typey Type is **not** a generic typing app. Plenty of typing apps already exist for regular text input without stenography.

Instead, Typey Type concentrates on teaching people how to type using stenography. That means it includes features like steno diagrams showing steno briefs as hints for how to write words and using steno-specific data, such as lessons for “single-stroke briefs”.

Typey Type avoids generic typing features, such as competing for speed and accuracy against other typists, which any typing app might do, such as [Typeracer](http://play.typeracer.com).

## Development

### Requirements

Install [yarn](https://yarnpkg.com/lang/en/docs/install/). Note: the project is currently built with the version of Node shown in the `.nvmrc` file in the root of the project.

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

### Updates

When you pull the latest code, you may need to update submodules too:

```
git submodule update
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

## Contributing

See the [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [typeytype@didoesdigital.com](mailto:typeytype@didoesdigital.com).

## License

See [LICENSE](./LICENSE).

## Author

Typey Type was created by [Di](https://didoesdigital.com).

