import Docentes from "../models/Docentes.js"

const DocentesController = {};

DocentesController.getDocentes = async (req, res) => {
    try {
        const docentes = await Docentes.find();
        return res.status(200).json(docentes);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

DocentesController.deleteDocentes = async (req, res) => {
    try {
        const deleteDocente = await Docentes.findByIdAndDelete(req.params.id);
        if(!deleteDocente){
            return res.status(400).json({message: "Docente not found"});
        }
        return res.status(200).json({message: "Docente deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

DocentesController.updateDocentes = async (req, res) => {
    try {
        let { name, lastName, email, isActive, isVerified, loginAttemps, timeOut } = req.body;

        name = name?.trim();
        lastName = lastName?.trim();
        email = email?.trim();

        if(!name || !lastName || !email){
            return res.status(400).json({message: "Todos los campos son requeridos"});
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(lastname.lenght < 3){
            return res.status(400).json({message: "lastname too short"})
        }

        const updateDocentes = await Docentes.findByIdAndUpdate(req.params.id, { name, lastName, email, isActive, isVerified, loginAttemps, timeOut })

        if(!updateDocentes) {
            return res.status(400).json({message: "Docente not found"});
        }
        
        return res.status(200).json({message: "Docente modified"});    
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default DocentesController;