import app from "./app.js"
import "./database.js"
import { config } from "./src/config.js"

//creamos la funcion que se encarga de iniciar el servidor
async function main() {
    app.listen(config.server.PORT)    
}

//llamamos la funcion que acabamos de crear
main();