const express = require("express");
const comentarioS = require("../services/comentarios");

function comentarios(app){

    const router = express.Router();

    app.use("/api/comentarios", router);

    const comentarioService = new comentarioS();

    router.get("/:correo", async (req, res) => {
        const correo = req.params.correo;
        const comentarios = await comentarioService.getComentarios(correo);
        res.status(200).json(comentarios);
    });

    router.post("/", async (req, res) => {
        const data = req.body;
        const comentarioPosteado = await comentarioService.postComentario(data);
        res.status(200).json(comentarioPosteado);
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        const comentarioBorrado = await comentarioService.deleteComentario(id);
        res.status(200).json(comentarioBorrado);

    });
}

module.exports = comentarios