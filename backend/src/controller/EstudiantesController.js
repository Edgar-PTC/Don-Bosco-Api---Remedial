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
        return res.status(200).json({message: "Docente deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
EstudiantesController.updateEstudiantes = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default EstudiantesController;