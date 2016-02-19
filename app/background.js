// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, BrowserWindow, Menu } from 'electron';
import devHelper from './vendor/electron_boilerplate/dev_helper';
import windowStateKeeper from './vendor/electron_boilerplate/window_state';

const path = require('path');
const showdown  = require('showdown');
const converter = new showdown.Converter();

var port = process.env.PORT || 8779;
const express = require('express');
const expressApp = express();

var http = require('http').Server(expressApp);
var port = process.env.PORT || 8779;
var io = require('socket.io')(http);

// expressApp.use(express.static(path.join(__dirname)));

expressApp.use('/vendor', express.static(path.join(__dirname, 'vendor')));
expressApp.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
expressApp.use('/build', express.static(path.join(__dirname)));

/*\ Main route:
  - If the request URI does not start with `api`, serve `index.html`.
\*/
expressApp.all(/^\/(?!api).*/, function(req, res){
  res.sendFile('app.html', {root: path.join(__dirname) });
});

/*\ Api route example
\*/
expressApp.get('/api', function(req, res){
  res.json({
    "name": "amin"
  })
});

/* client handle 404 */
// expressApp.all("/404", function(req, res, next) {
//   res.sendFile("index.html", {root: serverSettings.client });
// });

// /* catch invalid requests */
// expressApp.get('*', function(req, res, next) {
//  console.log("404: " + req.originalUrl + " was not found")
//  res.status(404).redirect("/404");
// });

// expressApp.listen(port);

http.listen(port, function() {
  console.log('Server running at port:', port);
});
// ====================
// Socket
// ====================

io.on('connection', function(socket) {
  console.log('user connected');

  // On receiving new Markdown Options
  socket.on('options', function(data) {
    // updateOptions(data); // Update Markdown options
    console.log(data);
    console.log('options updated');
  });

  // On receiving Markdown input
  socket.on('convert', function(data) {
    socket.emit('convert', converter.makeHtml(data)); // Send converted markdown to client
    console.log('Markdown converted');
  });
});

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    if (env.name === 'test') {
        mainWindow.loadURL('file://' + __dirname + '/spec.html');
    } else {
        mainWindow.loadURL('http://localhost:8779');
        // mainWindow.loadURL('file://' + __dirname + '/app.html');
    }

    if (env.name !== 'production') {
        // devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});

/*
Putting data on the window instance:

browser side:

mainWindow.rendererSideName = somethingIWantToShare;
renderer side:

remote.getCurrentWindow().rendererSideName.myFunction();

## note for __dirname

https://github.com/atom/electron/issues/2414
*/
