import express from "express";
import RegisterEstudiantes from "../controller/RegisterEstudiantesController.js"

const router = express.Router();
router.route("/")
.post(RegisterEstudiantes.insertEstudiante)

router.route("/verifyCode")
.post(RegisterEstudiantes.verifyCode)

export default router;