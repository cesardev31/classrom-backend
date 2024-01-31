const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Crear un objeto usuario con la contraseña hasheada
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    const newUser = await user.save();

    // Crear el token JWT para el nuevo usuario
    const token = jwt.sign(
      { userId: newUser._id, fullName: newUser.fullName, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    // Enviar una respuesta exitosa con el token JWT
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", token: token });
  } catch (error) {
    // En caso de error, enviar una respuesta de error
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo electrónico no encontrado" });
    }

    // Comparar la contraseña hasheada
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user._id, fullname: user.fullName, role: user.role },
      process.env.JWT_SECRET, // Asegúrate de tener una clave secreta para JWT en tu archivo .env
      { expiresIn: "7h" } // Establece la duración de la validez del token
    );

    // Enviar una respuesta exitosa con el token JWT
    res.status(200).json({ message: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
