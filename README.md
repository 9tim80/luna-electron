# About

GeForce Now application written in Electron, wrapping around the web browser GFN implementation for ChromeBooks

# Installation

## Manual

 - Go to the [latest release](https://github.com/hmlendea/geforcenow-electron/releases/latest).
 - Download the specific file that best fits your disto

## Using a package manager

On Arch Linux you can use [this PKGBUILD](https://github.com/hmlendea/PKGBUILDs/blob/master/pkg/geforcenow-electron/PKGBUILD) for a system-wide installation.

For other distributions, you will have to check if someone included this package into the package manager's repository.

# Building from source

## Requirements

You will need to install [npm](https://www.npmjs.com/), the Node.js package manager. On most distributions, the package is simply called `npm`.

## Cloning the source code

Once you have npm, clone the wrapper to a convenient location:

```
git clone https://github.com/hmlendea/geforcenow-electron.git
```

## Building

```
cd geforcenow-electron
npm install
npm start
```

On subsequent runs, `npm start` will be all that's required.

## Updating

Simply pull the latest version of master and install any changed dependencies:

```
cd geforcenow-electron
git checkout master
git pull
npm install
npm start
```
