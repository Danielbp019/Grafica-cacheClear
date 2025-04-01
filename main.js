const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { clearNvidiaCache } = require("./assets/marcas/nvidia");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 720, //Ancho
    height: 730, // Alto
    resizable: false, // Desactiva el redimensionamiento
    maximizable: false, // Desactiva maximizar
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "./assets/img/favicon.ico"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  // Quita la barra de menú
  //mainWindow.setMenu(null);
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Escuchar el evento y pasar event a clearNvidiaCache()
ipcMain.on("clear-nvidia-cache", async (event) => {
  event.reply("update-process", "🧹 Iniciando limpieza de caché...");
  await clearNvidiaCache(event);
});

// Limpiar caché del navegador al iniciar la aplicación
app.on("ready", async () => {
  const session = require("electron").session;
  const mainSession = session.defaultSession;
  try {
    await mainSession.clearCache();
    console.log("Cache limpia exitosamente");
  } catch (error) {
    console.error("Error al limpiar caché:", error);
  }
});
