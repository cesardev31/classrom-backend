/**
 * Configuración de los eventos de Socket.IO para la aplicación.
 * Este módulo maneja la interacción en tiempo real entre los usuarios y las clases.
 */

const Message = require("../models/messaje"); // Asegúrate de que el nombre del archivo modelo sea correcto.
const User = require("../models/user");

/**
 * Configura los eventos de Socket.IO para un servidor dado.
 *
 * @param {Object} io - La instancia del servidor Socket.IO.
 */
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Nuevo usuario conectado: ${socket.id}`);

    // Evento para unirse a una clase específica.
    socket.on("join-class", (classId) => {
      console.log(`Usuario ${socket.id} se unió a la clase-${classId}`);
      socket.join(`class-${classId}`);
    });

    // Evento para abandonar una clase específica.
    socket.on("leave-class", (classId) => {
      console.log(`Usuario ${socket.id} abandonó la clase-${classId}`);
      socket.leave(`class-${classId}`);
    });

    // Evento para manejar la recepción de un nuevo mensaje.
    socket.on("new-message", (data) => {
      // Creación y almacenamiento del nuevo mensaje en la base de datos.
      const newMessage = new Message({
        content: data.content,
        senderId: data.senderId,
        classId: data.classId,
      });

      // Guarda el nuevo mensaje y luego emite a todos los usuarios en la clase.
      newMessage
        .save()
        .then((savedMessage) => {
          // Busca el nombre completo del usuario que envía el mensaje.
          return User.findById(savedMessage.senderId).then((user) => {
            // Preparación del mensaje a enviar, incluyendo el nombre del remitente.
            const messageToSend = {
              ...savedMessage.toObject(),
              senderName: user.fullName, // Asume que el modelo de User tiene un campo fullName.
            };
            // Emisión del mensaje a todos los usuarios en la misma clase.
            io.to(`class-${savedMessage.classId}`).emit(
              "message",
              messageToSend
            );
          });
        })
        .catch((err) => {
          console.error("Error al guardar el mensaje:", err);
        });
    });

    // Evento para manejar la desconexión de un usuario.
    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });
};
