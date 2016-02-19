// Simple module exposes environment variables to rest of the code.

// import { remote } from 'electron'; // native electron module
// const jetpack = remote.require('fs-jetpack');
import jetpack from 'fs-jetpack';

var app;

if (process.type === 'renderer') {
    app = require('electron').remote.app;
    console.log('process: ',process.type, app.getAppPath());
} else {
    app = require('electron').app;
}
var appDir = jetpack.cwd(app.getAppPath());


var manifest = appDir.read('package.json', 'json');
export default manifest.env;
