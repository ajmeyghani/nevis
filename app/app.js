// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
// const jetpack = remote.require('fs-jetpack');
import { greet } from './hello_world/hello_world'; // code authored by you in this project
// import env from './env';

// console.log('Loaded environment variables:', JSON.stringify(env));

var app = remote.app;
// var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
// console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {

  // New Socket.io client
  var socket = io();
  var path = require('path');
  // var $ = require(path.join(process.cwd(), 'build/node_modules/jquery/dist/jquery.js'));
  var padArea = $('#pad');
  var mdArea = $('#markdown');


    // document.getElementById('greet').innerHTML = greet();
    // document.getElementById('platform-info').innerHTML = os.platform();
    // document.getElementById('env-name').innerHTML = env.name;
    document.getElementById('pad').innerHTML = '';
    const sideBarNavContent = document.getElementById('js-sidebar-content');
    const sidebar = document.getElementById('js-sidebar');
    sideBarNavContent.style.display = 'none';
    const flyoutMenu = document.getElementById('js-flyout-menu');
    let isSidebarOpen = false;
    flyoutMenu.addEventListener('click', function () {
      // debugger
      if (isSidebarOpen) {
        sidebar.classList.remove('sidebar-open');
        setTimeout(()=>{sideBarNavContent.style.display = 'none';},200);
      } else {
        sideBarNavContent.style.display = 'block';
        sidebar.classList.add('sidebar-open');
      }
      isSidebarOpen = !isSidebarOpen;
    });


    // On connecting to server
    socket.on('connect', function() {
      // updateOptions(); // Update option checkboxes
      socket.emit('options', 'optoins are here'); // Send options to server
    });


    // On new input
    padArea.on('input', function() {
      socket.emit('convert', padArea.val()); // Send Markdown input to server
    });

    // On recieving HTML output
    socket.on('convert', function(data) {
      mdArea.html(data); // Display HTML output
    });
});
