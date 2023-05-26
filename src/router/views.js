const express = require("express")
function views(app){

    const router = express.Router();
    app.use("/", router);

    router.get("/", (req, res) => {
        const {asesoresToken} = req.cookies;
        if(asesoresToken){
            res.render("mainBS");
        }
        res.render("index");
    });

    router.get("/index.html", (req, res) => {
        res.render("index");
    });
    router.get("/info.html", (req, res) => {
        res.render("infoBS");
    });

    router.get("/main.html", (req, res) => {
        res.render("mainBS");
    });

    router.get("/perfil.html", (req, res) => {
        res.render("perfilBS");
    });
}

module.exports = views;