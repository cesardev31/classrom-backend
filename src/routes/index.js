/**
 * Función para centralizar y organizar todas las rutas de la API.
 * Agrupa las rutas relacionadas con usuarios, clases y mensajes bajo un prefijo común `/api`.
 * Utiliza Express para manejar las solicitudes HTTP y facilita la modularidad y el mantenimiento de las rutas.
 */

const { Router } = require("express");
// Importación de los enrutadores específicos para cada dominio de la aplicación.
const userRouter = require("./user.routes");
const classRouter = require("./class.routes");
const messageRouter = require("./messaje.routes"); // Asegúrate de que el nombre del archivo sea correcto.

/**
 * Integra todos los enrutadores de la aplicación bajo un único prefijo `/api`.
 *
 * @param {Object} app - La instancia de la aplicación Express.
 */
function routerApi(app) {
  const router = Router();
  // Prefijo global para todas las rutas.
  app.use("/api", router);

  // Integración de los enrutadores específicos con sus respectivos prefijos.
  router.use("/users", userRouter); 
  router.use("/classes", classRouter); 
  router.use("/messages", messageRouter); 
}

module.exports = routerApi;
