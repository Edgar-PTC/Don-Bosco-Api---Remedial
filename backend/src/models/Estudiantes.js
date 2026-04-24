/*
    name
    lastName
    email
    password
    career
    isVerified
    loginAttemps
    timeOut
*/

//Importamos las cosas bro, esquemas y los models
import { Schema, model } from "mongoose";

//Creamos la esquema de Estudiante
const EstudianteSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    career: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Boolean
    },
    timeOut: {
        type: Date
    }
})

export default model("Estudiantes", EstudianteSchema);