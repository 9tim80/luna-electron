# About

Forked from the [gfn-electron](https://github.com/hmlendea/gfn-electron/) Project, the intention of this repository is to create an unofficial client for Amaazon's Luna game streaming service, providing a native Linux desktop experince and some additional features such as Discord rich presence.

Because this is a fork of an existing project, there may be references to GeForceNOW left in the repo as I continue to work on a first version. This is mainly because **I have no idea what I'm doing.**

## Disclaimer

This project and its contributors are not affiliated with Amazon, nor any of its partners. This repository does not contain any Amazon software. It is simply an Electron wrapper that loads the official Luna web application page, just as it would in a regular web browser.

# Building from source

## Requirements

You will need to install [npm](https://www.npmjs.com/), the Node.js package manager. On most distributions, the package is simply called `npm`.

## Cloning the source code

Once you have npm, clone the wrapper to a convenient location:

```bash
git clone https://github.com/9tim80/luna-electron.git
```

## Building

```bash
npm install
npm start
```

On subsequent runs, `npm start` will be all that's required.

## Updating the source code

Simply pull the latest version of master and install any changed dependencies:

```bash
git checkout master
git pull
npm install
```
