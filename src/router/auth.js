// Router que maneja las peticiones de autenticacion
const express = require("express");

const Auth = require("../services/auth");

function auth(app){
    const router = express.Router();

    app.use("/auth", router);

    const authService = new Auth();


    router.post("/login", async (req, res) => {
        const {correo, contrasena} = req.body;
        const result = await authService.login(correo, contrasena);


        if(result.success){
            // console.log("aui");
            // res.header('Authorization', 'Bearer' + result.token);
            res.status(200).json({token : result.token});
            // -------------
            // res.cookie("asesoresToken", result.token, {
            //     httpOnly: true,
            // });
            
        }else{
            return res.status(403).json(result);
        }
    });

    router.post("/registro", async (req, res) => {
        const {nombre, correo, contrasena, carrera, asesorias, info} = req.body;
        const result = await authService.registro(nombre, correo, contrasena, carrera, asesorias, info);
        return res.status(result.success?201:400).json(result);
    });

}

module.exports = auth;