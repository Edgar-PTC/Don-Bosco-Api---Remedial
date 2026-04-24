import express from "express";
import EstudiantesController from "../controller/EstudiantesController.js";

const router = express.Router();

router.route("/")
.get(EstudiantesController.getEstudiantes)

router.route("/:id")
.delete(EstudiantesController.deleteEstudiantes)
.put(EstudiantesController.updateEstudiantes)

export default router;