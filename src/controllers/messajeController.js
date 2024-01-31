const Message = require('../models/messaje'); // Asegúrate de que la ruta al modelo es correcta
const User = require('../models/user');

exports.getMessagesByClassId = async (req, res) => {
  const classId = req.params.classId;

  try {
    let messages = await Message.find({ classId: classId }).lean();
    
    for (let message of messages) {
      let user = await User.findById(message.senderId).lean();
      if (user) {
        message.senderId = user.fullName; // Añade el fullName al mensaje
      }
    }

    res.json(messages);
  } catch (err) {
    console.error("Error al recuperar los mensajes:", err);
    res.status(500).send(err);
  }
};