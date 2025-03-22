# App en electron para limpiar el cache de la tarjeta gráfica

Borra los archivos contenidos en las carpetas de DXCache y GLCache de NVIDIA en la ruta "C:\Users\NombreUsuario\AppData\Local\NVIDIA" para que la gráfica pueda volver a crear cachés de los juegos y aplicaciones en uso.

## 📥 [Descargar la herramienta - Grafica Cache Clear](https://github.com/Danielbp019/Grafica-cacheClear/raw/main/ejecutable/Grafica-cacheClear-win32-x64.exe)

## Imágenes del proyecto

- **Vista del proyecto:**
  ![vista](./assets/img/readme/vista.jpg)

## Empaquetado

Se usa https://github.com/electron/packager para realizar el empaquetado.

Comando de empaquetado:

```sh
npx electron-packager . Grafica-cacheClear --platform=win32 --arch=x64 --icon=assets/img/favicon.ico --overwrite

```

1.  `.` indica el directorio actual como la ruta de tu aplicación.
2.  `Grafica-cacheClear` es el nombre de la aplicación.
3.  `--platform=win32` especifica que estás empaquetando para Windows.
4.  `--arch=x64` define la arquitectura de 64 bits.
5.  `--icon=assets/img/favicon.ico` establece el ícono de tu aplicación.
6.  `--overwrite` sobrescribe cualquier paquete existente con el mismo nombre.
