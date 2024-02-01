/**
 * Modelo de esquema para representar una clase en una plataforma educativa.
 * Utiliza Mongoose para la definición del esquema y la creación del modelo.
 */

const mongoose = require("mongoose");

// Definición del esquema para la clase.
const classSchema = new mongoose.Schema({
  // Título de la clase, requerido y de tipo String.
  title: {
    type: String,
    required: true,
  },
  // Descripción de la clase, opcional y de tipo String.
  description: String,
  // Identificador único de la clase, requerido y único.
  classId: {
    type: String,
    required: true,
    unique: true,
  },
  // Clave de transmisión para la clase, requerida y única. Se utiliza para operaciones de streaming.
  streamKey: {
    type: String,
    required: true,
    unique: true,
  },
  // Referencia al profesor asociado con la clase, requerido.
  // Utiliza el ObjectId de Mongoose y se refiere al modelo 'Professor'.
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
    required: true,
  },
  // Se pueden agregar más campos según sea necesario para la aplicación.
});

// Creación del modelo 'Class' basado en el esquema definido anteriormente.
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
