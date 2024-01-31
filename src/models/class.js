const mongoose = require('mongoose');


const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  classId: { // Este podría ser un identificador único generado automáticamente
    type: String,
    required: true,
    unique: true
  }
  // Puedes agregar más campos según sea necesario
});
const Class = mongoose.model("Class", classSchema);

module.exports = Class
