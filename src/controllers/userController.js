/**
 * Controladores para la gestión de usuarios.
 */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/**
 * Crea un nuevo usuario y genera un token JWT.
 *
 * @param {Object} req - El objeto de solicitud HTTP. Espera fullName, email, password, y role en el cuerpo.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const createUser = async (req, res) => {
  try {
    // Extrae los datos necesarios del cuerpo de la solicitud
    const { fullName, email, password, role } = req.body;

    // Asegura que el campo roles sea un arreglo
    const roles = Array.isArray(role) ? role : [role];

    // Verifica si ya existe un usuario con el mismo correo electrónico
    const userExists = await User.findOne({ email });

    // Si el usuario ya existe, retorna un error 400
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Crea un nuevo usuario con los datos proporcionados y lo guarda en la base de datos
    const user = new User({ fullName, email, password, roles });
    await user.save();

    // Genera un token JWT para el nuevo usuario
    const token = jwt.sign(
      { userId: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    // Retorna una respuesta exitosa con el token
    res.status(201).json({ message: "Usuario creado exitosamente", token });
  } catch (error) {
    // En caso de error, retorna un error 500
    res.status(500).json({ message: error.message });
  }
};

/**
 * Autentica a un usuario y genera un token JWT si la autenticación es exitosa.
 *
 * @param {Object} req - El objeto de solicitud HTTP. Espera email y password en el cuerpo.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const loginUser = async (req, res) => {
  try {
    // Busca el usuario por correo electrónico
    const user = await User.findOne({ email: req.body.email });

    // Si el usuario no se encuentra, retorna un error 401
    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo electrónico no encontrado" });
    }

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Si la contraseña es incorrecta, retorna un error 401
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si la autenticación es exitosa, genera y retorna un token JWT
    const token = jwt.sign(
      { userId: user._id, fullname: user.fullName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );
    res.status(200).json({ message: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    // En caso de error, retorna un error 500
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser };
