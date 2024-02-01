// Este script establece la conexión con la base de datos MongoDB utilizando Mongoose.

// Importación de dependencias necesarias.
const mongoose = require("mongoose");
require("dotenv").config(); // Carga las variables de entorno desde un archivo .env.

// Obtención de la URL de la base de datos desde las variables de entorno.
const databaseURL = process.env.MOGODBURL; // Asegúrate de que la variable de entorno esté correctamente nombrada.

// Inicio de la conexión a MongoDB usando la URL obtenida.
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true, // Opción recomendada para el análisis de la cadena de conexión.
    useUnifiedTopology: true, // Opción recomendada para utilizar la nueva topología del motor de MongoDB.
  })
  .then(() => {
    // Mensaje de éxito en la conexión.
    console.log("Conexión exitosa a la base de datos MongoDB Atlas");
  })
  .catch((error) => {
    // Manejo de errores en caso de fallo en la conexión.
    console.error("Error al conectar a la base de datos:", error);
  });
