import express from "express";
import DocentesController from "../controller/DocentesController.js";

const router = express.Router();

router.route("/")
.get(DocentesController.getDocentes)

router.route("/:id")
.delete(DocentesController.deleteDocentes)
.put(DocentesController.updateDocentes)

export default router;