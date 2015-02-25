# launchpunk
Have fun with babylonjs, a virtual novation launchpad, and some daftpunk sounds !

![launchpunk screenshot](https://raw.githubusercontent.com/oYo-fr/launchpunk/master/screenshot.png)

# setup
Clone the repository, and run npm install

# run
node app.js

browse http://localhost:3000

# controls
Click on the buttons on the virtual launchpad to launch a sound. Note : Try clicking on the "Mixer" button to launch the instrumental music

If you have a real launchpad (it should also work with other midi instruments), install the Jazz-Pluggin to enable communication between your webbrowser and your midi instrument.
Plugin is available here : http://jazz-soft.net/download/Jazz-Plugin/
Warning : You may have a security alert running the pluggin, so configure your browser to accept running it.

# 3D model
The 3D model originaly comes frome here : http://www.turbosquid.com/3d-models/3d-model-of-launchpad-novation/723020
Note : it has been converted and heavily simplified as it has been designed for 3D rendering in the first place (not for web content). All buttons have been modified/renamed for the purpose of this demo. 

# Tech stack :
- nodejs
- babylonjs
- WebMidi API
