# MIDIMaker-Web
This repository includes the Node.js code for the MIDIMaker project webpage. This webpage allows the clients to upload an audio file (.wav, .m4a, .mp3 supported) and get the corresponding MIDI file for that audio.

## Before starting
The webpage includes a call to a Python library for the conversion from audio files to MIDI files.
This Python library is essential for the webpage to work, so be sure to install it in your device and include the main file midimaker.py on the scripts folder of this project.
The MIDIMaker Pyhton library can be found at: (insert link here)

## Installation
For this project to work is necessary to have Node.js installed on your device. For further reference on Node.js [click here](https://nodejs.org/en/).
It is also recommended to install NPM (Node.js Package Manager). For further reference on NPM [click here](https://www.npmjs.com/).

Once Node.js and NPM are both installed, we can proceed with the installation of the libraries needed for this project. All project dependencies are listed on *package.json* file, so the easiest way to install all of them is to execute `npm install` on the project directory.

In order to start Node.js, we can simply execute `npm start` or `node app.js` on the project directory.
