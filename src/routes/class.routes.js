/**
 * Enrutador para las rutas relacionadas con las clases en una aplicación educativa.
 * Utiliza Express para manejar las solicitudes HTTP y define rutas para crear clases
 * y obtener todas las clases, aplicando middleware de verificación de token donde sea necesario.
 */

const { Router } = require("express");
const classController = require("../controllers/classController");
const verificarToken = require("../middleware/verifyToken");

// Creación de una instancia de Router.
const router = Router();

// Ruta POST para crear una nueva clase.
// No se aplica el middleware verificarToken aquí suponiendo que solo usuarios autenticados pueden crear clases.
router.post("/createClass", verificarToken, classController.createClass);

// Ruta GET para obtener todas las clases.
// Se aplica el middleware verificarToken para asegurar que solo los usuarios autenticados pueden ver las clases.
router.get('/classes', verificarToken, classController.getAllClasses);

// Exportación del enrutador configurado para ser usado en la aplicación principal.
module.exports = router;
