const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);

module.exports = router;
