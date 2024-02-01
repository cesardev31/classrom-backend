/**
 * Enrutador para las rutas relacionadas con los mensajes en una aplicación educativa.
 * Utiliza Express para manejar las solicitudes HTTP y define rutas para obtener los mensajes
 * asociados con un classId específico. Aplica middleware de verificación de token para asegurar
 * que solo los usuarios autenticados puedan acceder a los mensajes.
 */

const { Router } = require("express");
const verificarToken = require("../middleware/verifyToken");
const messageController = require("../controllers/messajeController"); // Asegúrate de que el nombre del archivo sea correcto
const router = Router();

// Ruta GET para obtener mensajes por classId.
// Se aplica el middleware verificarToken para asegurar que solo los usuarios autenticados puedan ver los mensajes.
router.get("/:classId", verificarToken, messageController.getMessagesByClassId);

// Exportación del enrutador configurado para ser usado en la aplicación principal.
module.exports = router;
