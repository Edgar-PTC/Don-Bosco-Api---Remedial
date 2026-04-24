import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras

import { config } from "../config.js";

import Estudiantes from "../models/Estudiantes.js";
import Docentes from "../models/Docentes.js";

const recoveryPassword = {}

recoveryPassword.sendEmail = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPassword.verifyCode = async(req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPassword.updatePassword = async(req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default recoveryPassword;