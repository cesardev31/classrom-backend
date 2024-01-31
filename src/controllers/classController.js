const Class = require('../models/class'); 
const { v4: uuidv4 } = require('uuid');

const createClass = async (req, res) => {
  try {
    // Generar un ID único para la clase
    const classId = uuidv4();

    // Crear una nueva instancia del modelo Class con los datos recibidos
    const newClass = new Class({
      title: req.body.title,
      description: req.body.description,
      classId: classId  // Asegúrate de generar o recibir un ID único para la sala
    });

    // Guardar la nueva clase en la base de datos
    const savedClass = await newClass.save();

    // Enviar una respuesta exitosa con la nueva clase
    res.status(201).json(savedClass);
  } catch (error) {
    // En caso de error, enviar una respuesta de error
    res.status(500).json({ message: error.message });
  }
};
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClass,
  getAllClasses
};
