const express = require("express");
const routerApi = require("./src/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  maxHttpBufferSize: 50 * 1024 * 1024,
});

//llamado de la base de datos
require("./src/utils/db");
require("./src/utils/socket")(io);

//middlewares de express
app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3200);

//llamado del index de las rutas
routerApi(app)

// Puerto y arranque del servidor
server.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Servidor corriendo en el puerto:", app.get("port"));
});
