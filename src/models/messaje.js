const messageSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // Suponiendo que tienes un modelo de usuario
    },
    classId: {
      type: String,
      required: true,
      ref: 'Class' // Relacionar el mensaje con la clase correspondiente
    }
    // Puedes agregar más campos como timestamps, etc.
  }, { timestamps: true }); // Opción para agregar timestamps automáticamente
  
  module.exports = mongoose.model('Message', messageSchema);
  