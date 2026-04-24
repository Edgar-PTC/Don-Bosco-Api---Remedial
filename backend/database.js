import mongoose from "mongoose";
import { config } from "./src/config.js";

mongoose.connect(config.db.URI)

//Creamos la variable conection
const connection = mongoose.connection;

//Creamos logs para cada caso que nos devuelva la base
connection.once("open", () => {
    console.log("La conexion a la base esta bien pero bien vergona");
});

connection.on("disconnected", () => {
    console.log("La conexion a la base se nos fue. CARAJO!");
});

connection.on("error", (error) => {
    console.log("OI OI OI Hay un error en la DB: " + error);
});