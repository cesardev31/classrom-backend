const { Router } = require("express");
const classController = require("../controllers/classController")
const verificarToken = require("../middleware/verifyToken");
const router = Router();

router.post("/createClass", classController.createClass);
router.get('/classes', classController.getAllClasses, verificarToken);


module.exports = router;
