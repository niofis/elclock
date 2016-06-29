const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

function createWindow () {
  win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/index.html`);
  //win.webContents.openDevTools();
  //win.maximise();
  if (process.platform !== 'darwin') {
    win.setFullScreen(true);
    win.setMenuBarVisibility(false);
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  //will not completly close if macOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  //on macOS app might not be completly closed and can be reopened
  if (win === null) {
    createWindow();
  }
});
