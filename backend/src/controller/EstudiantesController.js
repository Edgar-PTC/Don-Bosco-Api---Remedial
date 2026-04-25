import Estudiantes from "../models/Estudiantes.js"

const EstudiantesController = {};

EstudiantesController.getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiantes.find();
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

EstudiantesController.deleteEstudiantes = async (req, res) => {
    try {
        const deleteEstudiante = await Estudiantes.findByIdAndDelete(req.params.id)
        if(!deleteEstudiante){
            return res.status(400).json({message: "Estudiante not found"});
        }
        return res.status(200).json({message: "Estudiante deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
EstudiantesController.updateEstudiantes = async (req, res) => {
    try {
        let { name, lastName, email, career, isVerified, loginAttemps, timeOut } = req.body;

        name = name?.trim();
        lastName = lastName?.trim();
        email = email?.trim();
        career = email?.trim();

        if(!name || !lastName || !email || !career){
            return res.status(400).json({message: "Todos los campos son requeridos"});
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(lastName.lenght < 3){
            return res.status(400).json({message: "lastname too short"})
        }

        if(career.lenght < 16){
            return res.status(400).json({message: "Career name too short"})
        }

        const estudianteUpdate = await Estudiantes.findByIdAndUpdate(req.params.id, { name, lastName, email, career, isVerified, loginAttemps, timeOut }, {new: true})
        if(!estudianteUpdate){
            return res.status(400).json({message: "Estudiante not found"});
        }

        return res.status(200).json({message: "Estudiante modified"});
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default EstudiantesController;