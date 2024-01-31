const Message = require("../models/messaje");
const User = require('../models/user');

module.exports = (io) => {
  io.on("connection", (socket) => {
    // Cuando un usuario se une a una clase
    socket.on("join-class", (classId) => {
      console.log(`join-class class-${classId}`);
      socket.join(`class-${classId}`);
    });

    // Cuando un usuario abandona una clase
    socket.on("leave-class", (classId) => {
      console.log(`leave-class class-${classId}`);
      socket.leave(`class-${classId}`);
    });

    // Manejador para recibir un mensaje y almacenarlo
    socket.on("new-message", (data) => {
      // Crea un nuevo documento de mensaje con los datos recibidos
      const newMessage = new Message({
        content: data.content,
        senderId: data.senderId,
        classId: data.classId,
      });

      // Guarda el mensaje en la base de datos
      newMessage
        .save()
        .then((savedMessage) => {
          // Busca el usuario por senderId
          return User.findById(savedMessage.senderId).then(user => {
            // Añade el nombre del usuario al mensaje
            const messageToSend = {
              ...savedMessage.toObject(),
              senderId: user.fullName, // o la propiedad que contenga el nombre del usuario
            };
            // Emite el mensaje a la sala
            io.to(`class-${savedMessage.classId}`).emit("message", messageToSend);
          });
        })
        .catch((err) => {
          // Maneja el error como consideres apropiado
          console.error("Error al guardar el mensaje", err);
        });
    });

    socket.on("disconnect", () => {
      // Aquí puedes manejar la lógica cuando el usuario se desconecta
      console.log(`Usuario ${socket.id} desconectado`);
    });
  });
};
