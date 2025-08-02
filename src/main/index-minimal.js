const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('🚀 ULTRA-MINIMAL Velvet test');

let mainWindow;

function createWindow() {
  console.log('Creating minimal window...');
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load a simple HTML file
  mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  console.log('✅ Minimal window created');
}

app.whenReady().then(() => {
  console.log('App ready, creating window...');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

console.log('✅ Minimal setup complete');