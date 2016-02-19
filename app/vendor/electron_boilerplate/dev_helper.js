import { app, Menu, BrowserWindow } from 'electron';

var setDevMenu = function () {
    var devMenu = Menu.buildFromTemplate([
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
          },
          {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
          },
          {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
          },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
          },
        ]
      },
      {
        label: 'Development',
        submenu: [{
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function () {
            BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
          }
        },{
          label: 'Toggle DevTools',
          accelerator: 'Alt+CmdOrCtrl+I',
          click: function () {
            BrowserWindow.getFocusedWindow().toggleDevTools();
          }
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: function () {
            app.quit();
          }
        }]
      }
      ]);
    Menu.setApplicationMenu(devMenu);
};

export default {
    setDevMenu: setDevMenu,
}
