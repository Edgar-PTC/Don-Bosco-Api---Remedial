import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras

import { config } from "../config.js";

import Estudiantes from "../models/Estudiantes.js";
import Docentes from "../models/Docentes.js";
import HTMLRecoveryEmail from "../utils/HTMLRecoveryEmail.js"

const recoveryPassword = {}

recoveryPassword.sendEmail = async (req, res) => {
    try {
        const { email } = req.body;

        //Validamos que el correo existe
        let userFound = await Estudiantes.findOne({email});
        let TypeRole;
        if(!userFound){
            //Si no existe buscamos en los docentes
            userFound = await Docentes.findOne({email});
            if(!userFound){
                return res.status(404).json({message: "user not found"})
            }
            TypeRole = "Docente"
        }
        TypeRole = "Estudiante"


        //Generar el numero aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //Guardamos en un token
        const token = jsonwebtoken.sign(
            //Que se guarda
            {email, randomCode, TypeRole, verified: false},

            //Llave secreta
            config.jwt.secret,

            //Cuando expira
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        //Enviar por correo
        //1. quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        //2. Que se envia
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: `${randomCode}. Codigo de recuperación de contraseña`,
            html: HTMLRecoveryEmail(randomCode, userFound.name, userFound.lastName)
        }

        //3 enviar
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                return res.status(500).json({message: "error al enviar el correo"})
            }
        });

        return res.status(200).json({message: "email sent"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPassword.verifyCode = async(req, res) => {
    try {
        //1- solicitamos el codigo
        const { code } = req.body;
        
        //2- obtenemos codigo en cookie
        const token = req.cookies.recoveryCookie

        //3- extraer token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);

        //4- comparar
        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, TypeRole: decoded.TypeRole, verified: true},
            config.jwt.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });

        return res.status(200).json({ message: "Code verified sucessfully" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

recoveryPassword.updatePassword = async(req, res) => {
    try {
        //1. Solicito los datos
        const { newPassword, comfirmedPassword } = req.body;

        //Comparar
        if(newPassword !== comfirmedPassword){
            return res.status(400).json({message: "Passwords doesn't match"})
        }

        //vamos a comprobar que el token ya esta verificado
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret)

        if(!decoded.verified){
            return res.status(400).json({message: "code not verified"})
        }

        //Encriptar la contra
        const passwordHash = await bcrypts.hash(newPassword, 10);

        //Dependiendo del TypeRole se actualiza
        if(decoded.TypeRole == "Estudiante"){
            await Estudiantes.findOneAndUpdate(
                {email: decoded.email},
                {password: passwordHash},
                {new: true}
            )
        }else if(decoded.TypeRole == "Docente"){
            await Docentes.findOneAndUpdate(
                {email: decoded.email},
                {password: passwordHash},
                {new: true}
            )
        }

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default recoveryPassword;