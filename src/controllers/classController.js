const Class = require("../models/class");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const createClass = async (req, res) => {
  try {
    const { title, description, professorId } = req.body;

    // Verificar si el profesor existe
    const professorExists = await User.findById(professorId);
    if (!professorExists || !professorExists.roles.includes("professor")) {
      return res
        .status(404)
        .json({ message: "Profesor no encontrado o no válido" });
    }

    // Generar un ID único para la clase
    const classId = uuidv4();

    // Generar una clave de transmisión única (streamKey)
    const streamKey = uuidv4(); // Aquí usamos uuidv4 como ejemplo, ajusta según tus necesidades

    // Crear una nueva instancia del modelo Class
    const newClass = new Class({
      title,
      description,
      classId, // ID único generado para la sala
      streamKey, // Clave de transmisión única generada
      professorId, // ID del profesor asociado a la clase
    });

    // Guardar la nueva clase en la base de datos
    const savedClass = await newClass.save();

    // Enviar una respuesta exitosa con la nueva clase
    res.status(201).json(savedClass);
  } catch (error) {
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
  getAllClasses,
};
