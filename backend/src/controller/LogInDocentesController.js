import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import Docentes from "../models/Docentes.js";

import { config } from "../config.js";

const LoginDocentes = {}

LoginDocentes.login = async(req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default LoginDocentes;