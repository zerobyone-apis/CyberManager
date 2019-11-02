const electron = require('electron');
const path = require('path');
const url = require('url');
var findPort = require("find-free-port");
const isDev = require('electron-is-dev');
const logger = require('./logger');
const axios = require('axios');

const { app, BrowserWindow, dialog } = electron;
const JAR = 'spring-1.0.0.jar'; // how to avoid manual update of this?
const MAX_CHECK_COUNT = 10;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// The server url and process
let serverProcess;
let baseUrl;

function createWindow(callback) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // hide until ready-to-show
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
      // nodeIntegration: true
    }
  });

function stopServer() {
  logger.info('Stopping server...')
  app.quit(); // quit again
}

  loadHomePage();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (callback) callback()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

function loadHomePage() {
  logger.info(`logHomePage: Loading home page at ${baseUrl}`);
  // check server health and switch to main page

  mainWindow.loadURL(`${baseUrl}?_=${Date.now()}`)
  checkCount = 0;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  baseUrl = `http://localhost:9000`;

  logger.info('###################################################')
  logger.info('#  Application Starting              #')
  logger.info('###################################################')

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
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