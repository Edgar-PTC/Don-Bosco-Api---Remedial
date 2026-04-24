import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import Estudiantes from "../models/Estudiantes.js";

import { config } from "../config.js";

const LoginEstudiantes = {}

LoginEstudiantes.login = async(req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default LoginEstudiantes;