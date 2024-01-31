const mongoose = require("mongoose");
require("dotenv").config();

const databaseURL = process.env.MOGODBURL;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Conexión exitosa a la base de datos MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
