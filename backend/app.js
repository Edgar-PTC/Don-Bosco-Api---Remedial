//Se importa al BOSS el express
import e from "express";
//Importamos todos las ruts, pero las del sitema, no de buses XDXDXDXD
import Docentes from "./src/routes/Docentes.js"
import Estudiantes from "./src/routes/Estudiantes.js"
import LoginDocentes from "./src/routes/LogInDocentes.js"
import LoginEstudiantes from "./src/routes/LogInEstudiantes.js"
import LogOut from "./src/routes/LogOut.js"
import RecoveryPassword from "./src/routes/RecoveryPassword.js"
import RegisterDocentes from "./src/routes/RegisterDocentes.js"
import RegisterEstudiantes from "./src/routes/RegisterEstudiantes.js"
//Importamos el cors y el cookieparser bro
import cookieParser from "cookie-parser";
import cors from "cors"

const app = e();
app.use(cors({
    //El origin es de donde vienen las peticiones, y son las cantidades de sistemas, bro
    origin: ["http://localhost:5173", "http://localhost:5174"], //<--- La como pendejo
    credentials: true //<--- IDK solamento si
}));
//Para que tenga en cuentas las cookies mmh Cookies q rico
app.use(cookieParser());

//Aqui le decimos: hey, imbecil, tambien acepta a mi pana el Postman
app.use(e.json());

//Aqui definimos los endpoints
app.use("/api/Estudiantes", Estudiantes);
app.use("/api/Docentes", Docentes);
app.use("/api/LogInEstudiantes", LoginEstudiantes);
app.use("/api/LogInDocentes", LoginDocentes);
app.use("/api/LogOut", LogOut);
app.use("/api/RecoveryPassword", RecoveryPassword);
app.use("/api/RegisterDocentes", RegisterDocentes);
app.use("/api/RegisterEstudiantes", RegisterEstudiantes);


//Y exportamos el app para usarlo por todos lados
export default app;