import express from "express";
import LogOut from "../controller/LogOutController.js"

const router = express.Router();
router.route("/")
.post(LogOut.logOut)

export default router;