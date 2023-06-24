// Router que maneja las peticiones de usuarios
const express = require("express");
const Usuarios = require("../services/usuarios");
const decodeToken = require("../libs/decodeToken");
const cloudinary = require('cloudinary').v2;
require("../libs/cloudinary");
const upload = require("../libs/multer");


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
        console.log(`[GET] /asesores/${materia}`);
        const asesor = await usuariosService.getUserAsesor(materia);
        res.status(200).json(asesor);
    });

    // Actualizamos la informacion de un usuario
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

    // actualizamos la foto de perfil de un usuario
    router.post("/fotoPerfil", upload.single("formFile"), async (req, res) => {
    
        const {asesoresToken} = req.cookies;
        const user = decodeToken(asesoresToken);
        try{
            image = req.file;
            const newImg = await cloudinary.uploader.upload(image.path);
            // Obtenemos el id para poder borrar la foto de cloudinary
            const {fotoPerfilId} = usuariosService.getUser(user.correo);
            console.log("Eliminando foto");
            // Esto porque el perfil de usuario no tiene un perfilId en caso de usar la imagen predeterminada
            if(fotoPerfilId){
                await cloudinary.uploader.destroy(fotoPerfilId);
            }
            // Actualizamos en el perfil del usuario
            console.log("Actualizando info");
            await usuariosService.updateUser(user.id, {
                fotoPerfilId: newImg.public_id,
                fotoPerfilURL: newImg.url,
            });
            res.status(201).json({msg: "Foto actualizada"});
        }catch(err){
            console.log(err);
            res.status(500).json({msg: "Error en subir foto"});
        }
    });

     // Confirmar un usuario
     router.put("confirmar/:token", async (req, res) => {
        const id = req.params.token;
        const data = req.body;
        const result = await usuariosService.updateUser(id, data);
        res.status(200).json(result);
    });

}

module.exports = usuarios;