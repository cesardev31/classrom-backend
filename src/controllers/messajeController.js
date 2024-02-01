/**
 * Controlador para gestionar mensajes dentro de una clase específica.
 */

// Importación de los modelos necesarios.
const Message = require("../models/messaje");
const User = require("../models/user");

/**
 * Recupera todos los mensajes asociados con un classId específico y reemplaza senderId por el nombre completo del usuario.
 *
 * @param {Object} req - El objeto de solicitud HTTP, incluyendo los parámetros de la ruta.
 * @param {Object} res - El objeto de respuesta HTTP utilizado para enviar respuestas al cliente.
 */
exports.getMessagesByClassId = async (req, res) => {
  // Extracción del classId de los parámetros de la solicitud.
  const classId = req.params.classId;

  try {
    // Busca mensajes filtrados por classId.
    let messages = await Message.find({ classId: classId }).lean();

    // Itera sobre cada mensaje encontrado.
    for (let message of messages) {
      // Busca el usuario emisor del mensaje utilizando el senderId.
      let user = await User.findById(message.senderId).lean();
      if (user) {
        // Si se encuentra el usuario, reemplaza el senderId por el nombre completo del usuario en el mensaje.
        message.senderId = user.fullName;
      }
    }

    // Envía los mensajes modificados como respuesta.
    res.json(messages);
  } catch (err) {
    // Maneja cualquier error que ocurra durante el proceso.
    console.error("Error al recuperar los mensajes:", err);
    res.status(500).send(err);
  }
};
