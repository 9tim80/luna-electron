const { app, globalShortcut, BrowserWindow } = require('electron');
const path = require('path');

const { DiscordRPC } = require('./rpc.js');
const { switchFullscreenState } = require('./windowManager.js');

const homePage = 'https://play.geforcenow.com';

var userAgent =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'; // Linux

if (process.argv.includes('--spoof-chromeos')) {
  userAgent =
    'Mozilla/5.0 (X11; CrOS x86_64 14588.98.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.59 Safari/537.36'; // ChromeOS
  app.commandLine.appendSwitch('disable-features', 'UserAgentClientHint');
}

if (process.argv.includes('--spoof-windows')) {
  userAgent =
    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4951.41 Safari/537.36'; // Windows
  app.commandLine.appendSwitch('disable-features', 'UserAgentClientHint');
}

console.log('Using user agent: ' + userAgent);

app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch(
  'disable-features',
  'UseChromeOSDirectVideoDecoder'
);
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-gpu-rasterization');

async function createWindow() {
  const mainWindow = new BrowserWindow({
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      userAgent: userAgent,
    },
  });

  mainWindow.loadURL(homePage);

  globalShortcut.register('F12', async () => {
    mainWindow.webContents.toggleDevTools();
  });

  /*
  uncomment this to debug any errors with loading GFN landing page

  mainWindow.webContents.on("will-navigate", (event, url) => {
    console.log("will-navigate", url);
    event.preventDefault();
  });
  */
}

app.whenReady().then(async () => {
  createWindow();

  DiscordRPC('GeForce NOW');

  app.on('activate', async function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  globalShortcut.register('Super+F', async () => {
    switchFullscreenState();
  });

  globalShortcut.register('F11', async () => {
    switchFullscreenState();
  });

  globalShortcut.register('Alt+F4', async () => {
    app.quit();
  });

  globalShortcut.register('Alt+Home', async () => {
    BrowserWindow.getAllWindows()[0].loadURL(homePage);
  });

  globalShortcut.register('F4', async () => {
    app.quit();
  });

  globalShortcut.register('Esc', async () => {
    var window = BrowserWindow.getAllWindows()[0];

    window.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Esc' });
    window.webContents.sendInputEvent({ type: 'char', keyCode: 'Esc' });
    window.webContents.sendInputEvent({ type: 'keyUp', keyCode: 'Esc' });

    window.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Esc' });
    window.webContents.sendInputEvent({ type: 'char', keyCode: 'Esc' });
    window.webContents.sendInputEvent({ type: 'keyUp', keyCode: 'Esc' });
  });
});

app.on('browser-window-created', async function (e, window) {
  window.setBackgroundColor('#1A1D1F');
  window.setMenu(null);

  window.webContents.setUserAgent(userAgent);

  window.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    BrowserWindow.getAllWindows()[0].loadURL(url);
  });

  window.on('page-title-updated', async function (e, title) {
    DiscordRPC(title);
  });
});

app.on('will-quit', async () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', async function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
