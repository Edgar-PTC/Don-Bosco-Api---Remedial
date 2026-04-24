import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras

import Docentes from "../models/Docentes.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerDocentes = {};

registerDocentes.insertDocentes = async (req, res) => {

}

registerDocentes.verifyCode = async (req, res) => {

}

export default registerDocentes;