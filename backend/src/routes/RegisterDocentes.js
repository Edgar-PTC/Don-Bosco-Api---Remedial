import express from "express";
import RegisterDocentes from "../controller/RegisterDocentesController.js"

const router = express.Router();
router.route("/")
.post(RegisterDocentes.insertDocentes)

router.route("/verifyCode")
.post(RegisterDocentes.verifyCode)

export default router;