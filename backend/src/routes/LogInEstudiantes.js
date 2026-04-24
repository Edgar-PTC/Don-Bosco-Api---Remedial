import express from "express";
import LoginEstudiantes from "../controller/LogInEstudiantesController.js"

const router = express.Router();
router.route("/")
.post(LoginEstudiantes.login)

export default router;