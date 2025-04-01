// Aquí se manejará la lógica de interacción entre la UI y el backend.

document.addEventListener("DOMContentLoaded", () => {
  const nvidiaPathsElement = document.getElementById("nvidiaPaths");
  const deleteCacheButton = document.getElementById("deleteCacheButton");
  const modal = document.getElementById("confirmModal");
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const closeModalElements = modal.querySelectorAll(".delete, .cancelButton");
  const procesoElement = document.getElementById("proceso");

  // Obtener rutas de caché desde el preload
  const cachePaths = window.api.getNvidiaCachePaths();

  // Actualiza el contenido HTML para mostrar las rutas
  nvidiaPathsElement.innerHTML = cachePaths.map((texto) => `<li>${texto}</li>`).join("");

  // Mostrar el modal al hacer clic en el botón
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
    window.api.send("clear-nvidia-cache", {});
  });

  // Recibir actualizaciones del proceso y mostrarlas en la interfaz
  window.api.on("update-process", (message) => {
    procesoElement.innerHTML += `<li>${message}</li>`;

    // Desplaza automáticamente al final para ver el último mensaje
    const container = procesoElement.closest(".card-content-proceso");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
});
