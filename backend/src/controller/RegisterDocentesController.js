import nodemailer from "nodemailer"; //enviar correo
import crypto from "crypto"//Para los condigos randoms
import jsonwebtoken from "jsonwebtoken" //para usar las tokens
import bcrypts from "bcryptjs" //para encriptar contras
import HTMLRegister from "../utils/HTMLRegister.js";

import Docentes from "../models/Docentes.js";

import { config } from "../config.js";
import { text } from "stream/consumers";
import { error } from "console";

const registerDocentes = {};

registerDocentes.insertDocentes = async (req, res) => {
    try {
        let { name, lastName, email, password } = req.body;
            
        name = name?.trim();
        lastName = lastName?.trim();
        email = email?.trim();
        password = password?.trim();
                
        if(!name || !lastName || !email || !password){
            return res.status(400).json({message: "Todos los campos son requeridos"});
        }
                
        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }
                
        if(lastName.lenght < 3){
            return res.status(400).json({message: "lastname too short"})
        }
        
        if(password.lenght < 8){
            return res.status(400).json({message: "Password too short"})
        }
        
        const emailExist = await Docentes.findOne({email})
        if(emailExist){
            return res.status(400).json({message: "email already in use"});
        }
        
        const passwordHash = await bcrypts.hash(password, 10);
                
        const newDocente = await Docentes({ name, lastName, email, password: passwordHash, isActive: true, isVerified: false, loginAttemps: 0 });
        await newDocente.save();
        
        //Generar el codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")
        
        //guardamos este codigo en un token
        const tokenCode = jsonwebtoken.sign(
            //#1 que vamos a guardar?
            {email, verificationCode},
            //#2 secret key
            config.jwt.secret,
            //#3 cuando expira?
            {expiresIn: "15m"}
        );
        
        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})
        
        //Enviar el correo
        //#1. Quien lo envía?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })
        
        //#2. Que se envia?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: `Paso final! Codigo de verificacion: ${verificationCode}`,
            html: HTMLRegister(verificationCode, name, lastName)
        }
        
        //#3. Enviar
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error)
                return res.status(500).json({message: error})
            }
        
            return res.status(200).json({message: "email sent"})
        })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

registerDocentes.verifyCode = async (req, res) => {
    try {
        //1- solicitamos el codigo
        const { verificationCode } = req.body;
            
        //2- obtenemos codigo en cookie
        const token = req.cookies.verificationTokenCookie

        //3- extraer token
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode: storedCode } = decoded;

        //4- comparar
        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const Docente = await Docentes.findOne({email});
        Docente.isVerified = true;
        await Docente.save();

        res.clearCookie("verificationTokenCookie")

        res.json({message: "Email verified successfully"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default registerDocentes;