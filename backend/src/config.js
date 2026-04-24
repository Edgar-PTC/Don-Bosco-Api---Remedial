//Se importa el dotenv bro
import dotenv from "dotenv";

dotenv.config();

//Ahora creamos el array config, donde metemos todos los dates you know
export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    jwt:{
        secret: process.env.JWT_SECRET_KEY
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    }
}