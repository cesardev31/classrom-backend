const { Router } = require("express");
const userRouter = require("./user.routes");
const classRouter = require("./class.routes");

function routerApi(app) {
  const router = Router();
  app.use("/api", router);

  //las rutas
  router.use("/user", userRouter);
  router.use("/class", classRouter);
}

module.exports = routerApi;
