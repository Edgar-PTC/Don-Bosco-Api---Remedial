/*
    name
    lastName
    email
    password
    isActive
    isVerified
    loginAttemps
    timeOut
*/

//Importamos las mismas cosas bro
import { Schema, model } from "mongoose";

const DocentesSchema = new Schema({
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
    isActive: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut: {
        type: Date
    }
});

//Lo exportamos obvio
export default model("Docentes"/*<-- Hay que ponerle nombre*/, DocentesSchema)