// Router que maneja las peticiones de usuarios
const express = require("express");
const Usuarios = require("../services/usuarios");
const decodeToken = require("../libs/decodeToken");
// Aqui definimos los routers para las operaciones de usuarios
function usuarios(app){
    const router = express.Router();
    app.use("/api/usuarios", router);

    const usuariosService = new Usuarios();

    // Obtenemos el token del perfil para obtener su informacion y llenar la pagina de perfil
    router.get("/MyProfile", async(req, res) => {
        const {asesoresToken} = req.cookies;
        const decodedUser = decodeToken(asesoresToken);
        res.status(200).json({user: decodedUser});
    });
    // Obtiene un usuario dado su correo
    router.get("/:correo", async(req, res) => {
        const correo = req.params.correo;
        const usuario = await usuariosService.getUser(correo);
        res.status(200).json(usuario);
    });

    //Obtiene un asesor para la materia buscada
    router.get("/asesores/:materia", async(req, res) => {
        const materia = req.params.materia;
        const asesor = await usuariosService.getUserAsesor(materia);
        res.status(200).json(asesor);
    });

    // Acutalizamos la informacion de un usuario
    router.put("/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await usuariosService.updateUser(id, data);
        res.status(200).json(result);
    });

    // Borramos un usuario
    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const result = await usuariosService.deleteUser(id, data);
        res.status(200).json(result);
    });
}

module.exports = usuarios;