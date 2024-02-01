// Importaciones necesarias para la aplicación.
const express = require("express");
const routerApi = require("./src/routes"); // Rutas definidas para la aplicación.
const NodeMediaServer = require("node-media-server"); // Para el manejo de streaming de medios.
const cors = require("cors"); // Middleware para habilitar CORS.
require("dotenv").config(); // Carga variables de entorno desde un archivo .env.

const app = express(); // Instancia de Express para configurar el servidor HTTP.

// Configuración para Node-Media-Server, incluyendo RTMP, HTTP y transcodificación.
const config = {
  rtmp: {
    port: 1935, // Puerto para el servidor RTMP.
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000, // Puerto para el servidor HTTP.
    mediaroot: "./media", // Directorio raíz para los medios almacenados.
    allow_origin: "*", // Permite todas las origenes para CORS.
  },
  trans: {
    ffmpeg: "C:/ffmpeg/bin/ffmpeg.exe", // Ruta al ejecutable de FFmpeg para transcodificación.
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: true, // Previene la eliminación de archivos HLS después de finalizar el stream.
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: true, // Previene la eliminación de archivos DASH después de finalizar el stream.
      },
    ],
  },
};

// Configuración del servidor HTTP y Socket.IO.
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Permite todas las origenes para las conexiones de Socket.IO.
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
  maxHttpBufferSize: 50 * 1024 * 1024, // Tamaño máximo del buffer HTTP para Socket.IO.
});

// Inicialización de la base de datos y configuración de Socket.IO.
require("./src/utils/db"); // Conexión a la base de datos.
require("./src/utils/socket")(io); // Configuración de eventos de Socket.IO.

// Configuración de middlewares de Express.
app.use(cors()); // Habilita CORS para todas las rutas.
app.use(express.json()); // Habilita el parsing de JSON en el cuerpo de las solicitudes.
app.set("port", process.env.PORT || 3200); // Establece el puerto del servidor.

// Integración de las rutas definidas en la aplicación.
routerApi(app);

// Inicio del servidor HTTP.
server.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Servidor corriendo en el puerto:", app.get("port"));
});

// Inicio de Node-Media-Server con la configuración previamente definida.
var nms = new NodeMediaServer(config);
nms.run(() => {
  console.log("Node Media Server corriendo");
});
