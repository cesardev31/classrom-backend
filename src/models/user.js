/**
 * Modelo de esquema de Usuario para una aplicación con Mongoose.
 * Este esquema define la estructura de datos para los usuarios, incluyendo autenticación y roles.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definición del esquema de usuario.
const userSchema = new mongoose.Schema({
  // Nombre completo del usuario, requerido para cada registro.
  fullName: {
    type: String,
    required: true,
  },
  // Dirección de correo electrónico, debe ser única en la base de datos.
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Contraseña, que será hasheada antes de almacenarse.
  password: {
    type: String,
    required: true,
  },
  // Roles del usuario, permitiendo múltiples roles. Cada rol debe coincidir con los valores enumerados.
  roles: [
    {
      type: String,
      enum: ["student", "professor", "moderator"],
      required: true,
    },
  ],
});

/**
 * Middleware que se ejecuta antes del evento 'save' para hashear contraseñas de usuarios nuevos o modificados.
 */
userSchema.pre("save", async function (next) {
  // Solo hashea la contraseña si ha sido modificada (o es nueva).
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

/**
 * Método de instancia para validar una contraseña ingresada contra la hasheada almacenada en la base de datos.
 * 
 * @param {string} candidatePassword - La contraseña ingresada para comparar.
 * @returns {Promise<boolean>} - True si las contraseñas coinciden, false en caso contrario.
 */
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Creación del modelo de Usuario basado en el esquema definido.
const User = mongoose.model("User", userSchema);

module.exports = User;
