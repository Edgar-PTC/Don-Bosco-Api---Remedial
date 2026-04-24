import express from "express";
import RecoveryPassword from "../controller/RecoveryPasswordController.js"

const router = express.Router();
router.route("/sendEmail").post(RecoveryPassword.sendEmail)
router.route("/verifyCode").post(RecoveryPassword.verifyCode)
router.route("/newPassword").post(RecoveryPassword.updatePassword)

export default router;