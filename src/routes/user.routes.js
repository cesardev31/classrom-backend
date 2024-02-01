/**
 * Enrutador para las rutas relacionadas con la gestión de usuarios en una aplicación.
 * Utiliza Express para manejar las solicitudes HTTP y define rutas para la creación de usuarios
 * y el inicio de sesión de usuarios, facilitando la autenticación y el registro en el sistema.
 */

const { Router } = require("express");
const userController = require("../controllers/userController"); // Asegura la correcta importación del controlador de usuarios.
const router = Router();

// Ruta POST para crear un nuevo usuario.
// Esta ruta invoca el método createUser del userController para manejar la lógica de creación de usuarios.
router.post("/createUser", userController.createUser);

// Ruta POST para el inicio de sesión de un usuario.
// Esta ruta invoca el método loginUser del userController, el cual maneja la autenticación de usuarios.
router.post("/loginUser", userController.loginUser);

// Exportación del enrutador para permitir su uso en el archivo principal de la aplicación.
module.exports = router;
