/**
 * Modelo de esquema para representar un mensaje en una plataforma educativa.
 * Este esquema utiliza Mongoose para definir la estructura del documento de mensaje
 * que se almacenará en MongoDB. Los mensajes están asociados con usuarios y clases,
 * permitiendo interacciones específicas de la clase como discusiones o anuncios.
 */

const mongoose = require('mongoose');

// Definición del esquema de mensaje.
const messageSchema = new mongoose.Schema(
  {
    // Contenido del mensaje, un campo de texto requerido.
    content: {
      type: String,
      required: true,
    },
    // ID del remitente del mensaje, que referencia al modelo 'User'.
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Asegúrate de que la referencia coincida con el nombre de tu modelo de usuario.
    },
    // ID de la clase asociada con el mensaje, que referencia al modelo 'Class'.
    classId: {
      type: String,
      required: true,
      ref: "Class", // Relaciona el mensaje con la clase correspondiente.
    },
    // Aquí puedes agregar más campos según sea necesario, como archivos adjuntos, etc.
  },
  {
    timestamps: true, // Añade automáticamente campos para 'createdAt' y 'updatedAt'.
  }
);

// Creación del modelo 'Message' a partir del esquema definido.
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
