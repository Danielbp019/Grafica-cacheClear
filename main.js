const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { clearNvidiaCache } = require("./assets/marcas/nvidia");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 720, //Ancho
    height: 740, // Alto
    resizable: false, // Desactiva el redimensionamiento
    maximizable: false, // Desactiva maximizar
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "./assets/img/favicon.ico"), // Ruta al ícono
      nodeIntegration: true, // Habilita el uso de require
      contextIsolation: false, // Permite usar Node.js directamente
    },
  });

  // Quita la barra de menú
  mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Debemos escuchar el evento y pasar event a clearNvidiaCache()
ipcMain.on("clear-nvidia-cache", async (event) => {
  event.reply("update-process", "🧹 Iniciando limpieza de caché...");
  await clearNvidiaCache(event);
});

// Limpiar la caché al iniciar la aplicación
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
