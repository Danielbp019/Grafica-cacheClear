// Aquí se manejará la lógica de interacción entre la UI y el backend.

// Se muestran las rutas en el index actualizando el contenido de id="nvidiaPaths">
const { getNvidiaCachePaths } = require("./assets/marcas/nvidia");
document.addEventListener("DOMContentLoaded", () => {
  const nvidiaPathsElement = document.getElementById("nvidiaPaths");
  const cachePaths = getNvidiaCachePaths();

  // Actualiza el contenido HTML para mostrar las rutas
  nvidiaPathsElement.innerHTML = cachePaths.map((path) => `<p>${path}</p>`).join("");
});

// Funcion de modal de confirmacion
const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  const deleteCacheButton = document.getElementById("deleteCacheButton");
  const modal = document.getElementById("confirmModal");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const closeModalElements = modal.querySelectorAll(".delete, .cancelButton");
  const procesoElement = document.getElementById("proceso");

  // Mostrar el modal cuando el usuario haga clic en el botón
  deleteCacheButton.addEventListener("click", () => {
    modal.classList.add("is-active");
  });

  // Cerrar el modal si se cancela la acción
  closeModalElements.forEach((el) => {
    el.addEventListener("click", () => {
      modal.classList.remove("is-active");
    });
  });

  // Solo ejecutar la limpieza cuando el usuario confirme en el modal
  confirmDeleteButton.addEventListener("click", () => {
    modal.classList.remove("is-active"); // Oculta el modal
    procesoElement.innerHTML = "⏳ Iniciando limpieza..."; // Muestra mensaje de inicio
    ipcRenderer.send("clear-nvidia-cache"); // Envía el evento para limpiar
  });

  // Recibe las actualizaciones del proceso de limpieza y las muestra en el HTML
  ipcRenderer.on("update-process", (_, message) => {
    const procesoElement = document.getElementById("proceso");
    procesoElement.innerHTML += `<p>${message}</p>`;

    // Desplaza automáticamente al final para ver el último mensaje
    const container = procesoElement.closest(".card-content-proceso");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
});
