// Se utiliza para exponer información del entorno (versiones de Node.js, Electron, etc.) al renderer. Es un lugar seguro para manejar APIs restringidas.

const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

// Importamos getNvidiaCachePaths
const { getNvidiaCachePaths } = require(path.join(__dirname, "assets", "marcas", "nvidia.js"));

contextBridge.exposeInMainWorld("api", {
  getNvidiaCachePaths: () => getNvidiaCachePaths(),
  send: (channel, data) => {
    const validChannels = ["clear-nvidia-cache"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, callback) => {
    const validChannels = ["update-process"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
});

// Mostrar versiones en la interfaz de Node.js y Electron
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
