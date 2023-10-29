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

Typey Type avoids generic typing features, such as competing for speed and accuracy against other typists, which any typing app might do, such as [Typeracer](https://play.typeracer.com/?universe=steno).

## Development

### Requirements

Install [yarn](https://yarnpkg.com/lang/en/docs/install/). Note: the project is currently built with Node version 18.

### Installation

This project includes a Git submodule for [Typey Type data](https://github.com/didoesdigital/typey-type-data). If you want to clone this repository as well as its submodules, you can use the `--recursive` parameter:

```sh
git clone --recursive https://github.com/didoesdigital/typey-type.git
```

Alternatively, if you've already cloned the repository without the `--recursive` parameter, you can load its submodules using `submodule update`:

```sh
cd typey-type
git submodule update --init --recursive
```

If you haven't already, change directory into the cloned repository:

```sh
cd typey-type
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

### Offline

To use Typey Type offline, you can follow the steps in this README to install and start the app in development mode, and copy your progress words from [the Progress page online](https://didoesdigital.com/typey-type/progress) to your local progress page <http://localhost:3000/typey-type/progress> before going offline.

### Testing

Run the test runner during development:

```sh
yarn test
```

### Storybook

Run Storybook to develop and test components in isolation:

```sh
yarn storybook
```

### Create React App

For reference, Typey Type is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steno dictionaries

For Typey Type’s dictionaries, see [Di's steno dictionaries](https://github.com/didoesdigital/steno-dictionaries) repo.

Historically the [Typey Type data](https://github.com/didoesdigital/typey-type-data) repo has contained the [steno-dictionaries](https://github.com/didoesdigital/steno-dictionaries) submodule but it has moved to [Typey Type CLI](https://github.com/didoesdigital/typey-type-cli). If you've been using the paths to these dictionaries in Plover, for example, you may need to update them to look in the CLI or somewhere standalone.

## Contributing

See the [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [typeytype@didoesdigital.com](mailto:typeytype@didoesdigital.com).

## License

See [LICENSE](./LICENSE).

The metronome sound, “digi_plink”, comes from Dev_Tones by [RCP Tones](https://rcptones.com/dev_tones/) under a [Creative Commons license (CC BY 3.0 US)](https://creativecommons.org/licenses/by/3.0/us/legalcode) and was adapted to include silence at the end for a slower metronome tempo.

## Author

Typey Type was created by [Di](https://didoesdigital.com).

## Related repos

- [Typey Type data](https://github.com/didoesdigital/typey-type-data)
- [Typey Type CLI](https://github.com/didoesdigital/typey-type-cli)
- [Di's steno dictionaries](https://github.com/didoesdigital/steno-dictionaries)
- [Stenoboard diagram SVG to React](https://github.com/didoesdigital/typey-type-stenoboard-diagram-svg-to-react)

