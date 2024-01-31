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
      newMessage.save((err, savedMessage) => {
        if (err) {
          // Maneja el error como consideres apropiado
          console.error("Error al guardar el mensaje", err);
        } else {
          // Si el mensaje se guardó correctamente, emite el mensaje a la sala
          io.to(`class-${savedMessage.classId}`).emit("message", savedMessage);
        }
      });
    });

    socket.on("disconnect", () => {
      // Aquí puedes manejar la lógica cuando el usuario se desconecta
      console.log(`Usuario ${socket.id} desconectado`);
    });
  });
};
