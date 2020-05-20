const electron = require('electron');
const logger = require('./logger');
const url = require('url');
const { app, BrowserWindow } = electron;
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function stopServer() {
  logger.info('Stopping server...');
  app.quit(); // quit again
}

// The server url and process
let baseUrl;
const IMG_URL = __dirname + '/assets/icons/128x128.png';

function createWindow(callback) {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 950,
    show: false, // hide until ready-to-show
    darkTheme: true,
    autoHideMenuBar: true,
    icon: IMG_URL,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      zoomFactor: 5.0 // this by default is 1.0 = 100% but idk why is taking this size. is like 80% on webpage
    }
  });

  console.log('this is the icon route \n', IMG_URL, '\n\n');

  loadHomePage();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (callback) callback();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function stopServer() {
  logger.info('Stopping server...');
  app.quit(); // quit again
}

function loadHomePage() {
  logger.info(`logHomePage: Loading home page at ${baseUrl}`);
  // check server health and switch to main page

  mainWindow.loadURL(`${baseUrl}?_=${Date.now()}`);
  checkCount = 0;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  baseUrl = `https://cyber-manager-latest.now.sh/`;
  //baseUrl = `https://cyber-manager-pg-v3-0-6.now.sh`;
  //baseUrl = `https://cyber-manager-pg-v3-0-5.now.sh`;
  //baseUrl = `https://cyber-manager-pg-v3-0-4.now.sh`;
  //baseUrl = `https://cyber-manager-pg-v3-0-3.now.sh`;
  //baseUrl = `https://cyber-manager-pg-v3-0-2.now.sh`;
  //baseUrl = `https://cyber-manager-pg-v3-0-1.now.sh/#/`;
  //baseUrl = `http://localhost:9000/ `;
  console.log('');
  console.log('══════════════════════════');
  console.log('');
  console.log(' ╦══╦      ╦═╦   ╦══╦');
  console.log(' ╠═╝╠═╦═╦═╗║░╩╦╦╗║╔╗╠═╦═╗ ');
  console.log(' ║╔═╣╩╣╠╣║║║░░║║║║╚╝║║║╩╣ ');
  console.log(' ╚══╩═╩╝╚═╝╚══╬╗║╚══╩╩╩═╝ ');
  console.log('              ╩═╩');

  console.log(` CyberManager Electron is ready `);
  console.log('');
  console.log('══════════════════════════');
  console.log('');
  createWindow();
});

//Solo MacOS
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', e => {
  if (!isDev && baseUrl != null) {
    stopServer();
    e.preventDefault(); // will quite later after stopped the server
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//codigo que funca
//const {app, BrowserWindow, url} = require('electron')
//
//function createWindow () {
//  // Crear la ventana de navegador
//  win = new BrowserWindow({width: 800, height: 600})
//  var url = 'http://localhost:9000';
//  // abrir el html de nuestra app
//  win.loadURL(url)
//}
//// Asociar al evento 'ready'
//app.on('ready', createWindows)
