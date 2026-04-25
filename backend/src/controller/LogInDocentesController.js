import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import Docentes from "../models/Docentes.js";

import { config } from "../config.js";

const LoginDocentes = {}

LoginDocentes.login = async(req, res) => {
    try {
        //Solicitar los datos
        let { email, password } = req.body;

        //Existe el correo
        const emailExist = await Docentes.findOne({email});
        if(!emailExist){
            return res.status(404).json({message: "Email not found"});
        }

        //Verificar si la cuenta esta bloqueada
        if(emailExist.timeOut && emailExist.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"});
        }

        //Verificar si la contraseña evidentemente es correcta
        const isMatch = await bcrypt.compare(password, emailExist.password);

        if(!isMatch){
            //Le sumamos uno a los intentos fallidos
            emailExist.loginAttemps = (emailExist.loginAttemps || 0) + 1;

            //Si ya de verdad la cago 5 veces que la soque
            if(emailExist.loginAttemps >= 5){
                emailExist.timeOut = Date.now() + 15 * 60 * 1000;
                emailExist.loginAttemps = 0;

                await emailExist.save();
                return res.status(400).json({message: "Cuenta bloqueada"})
            }

            await emailExist.save();

            return res.status(400).json({message: "Contraseña incorrecta"});
        }

        //Si en un milagro no la rego, pues que bueno y le damos el acceso. ¿O que? ¿Quieren un premio?
        emailExist.loginAttemps = 0;
        emailExist.timeOut = null;
        await emailExist.save();

        const token = jsonWebToken.sign(
            {id: emailExist._id, userType: "Docente"},
            config.jwt.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token);

        return res.status(200).json({message: "Inicio de sesion exitoso"})        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default LoginDocentes;