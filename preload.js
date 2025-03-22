// Se utiliza para exponer información del entorno (versiones de Node.js, Electron, etc.) al renderer. Es un lugar seguro para manejar APIs restringidas.

// Versiones de node y electron
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
