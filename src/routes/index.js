const { Router } = require("express");
const userRouter = require("./user.routes");
const classRouter = require("./class.routes");
const messajeRouter = require("./messaje.routes")

function routerApi(app) {
  const router = Router();
  app.use("/api", router);

  //las rutas
  router.use("/user", userRouter);
  router.use("/class", classRouter);
  router.use("/messages", messajeRouter)
}

module.exports = routerApi;
