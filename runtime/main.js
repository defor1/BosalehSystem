const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

function downloadFile(url, destination, callback) {
  const file = fs.createWriteStream(destination);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(callback);
    });
  }).on('error', (err) => {
    fs.unlink(destination, () => {});
    console.error("Download failed:", err.message);
  });
}

function createWindow() {
  const tempDir = app.getPath("userData");
  const tempHtmlPath = path.join(tempDir, "index.html");
  const url = "https://raw.githubusercontent.com/defor1/BosalehSystem/main/ui/index.html";

  downloadFile(url, tempHtmlPath, () => {
    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false
      }
    });

    mainWindow.loadFile(tempHtmlPath);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});