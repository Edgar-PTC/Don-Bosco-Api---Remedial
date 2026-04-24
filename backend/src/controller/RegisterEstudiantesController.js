import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras

import Estudiantes from "../models/Estudiantes.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerEstudiantes = {};

registerEstudiantes.insertEstudiante = async (req, res) => {

}

registerEstudiantes.verifyCode = async (req, res) => {

}

export default registerEstudiantes;