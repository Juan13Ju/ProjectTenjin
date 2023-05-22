const express = require("express")
function views(app){

    const router = express.Router();
    app.use("/", router);

    router.get("/", (req, res) => {
        const {asesoresToken} = req.cookies;
        if(asesoresToken){
            res.render("main");
        }
        res.render("index");
    });

    router.get("/info.html", (req, res) => {
        res.render("info");
    });

    router.get("/main.html", (req, res) => {
        res.render("main");
    });

    router.get("/perfil.html", (req, res) => {
        res.render("perfil");
    });

    // Para hacer pruebas
    router.get("/mainBS.html", (req, res) => {
        res.render("mainBS");
    });

    router.get("/perfilBS.html", (req, res) => {
        res.render("perfilBS");
    });
}

module.exports = views;