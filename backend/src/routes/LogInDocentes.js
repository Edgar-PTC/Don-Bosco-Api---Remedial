import express from "express";
import LoginDocentes from "../controller/LogInDocentesController.js"

const router = express.Router();
router.route("/")
.post(LoginDocentes.login)

export default router;