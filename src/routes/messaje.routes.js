const { Router } = require("express");
const verificarToken = require("../middleware/verifyToken");
const messageController =require("../controllers/messajeController")
const router = Router();

router.get('/:classId', messageController.getMessagesByClassId, verificarToken);

module.exports = router;