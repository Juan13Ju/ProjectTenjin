const comentarioModel = require("../schemas/comentarios");

class Comentario{

    // Funcion que obtiene todos los comentarios de un correo
    async getComentarios(correo){
        const comentarios = await comentarioModel.find({to: correo}).exec();
        return comentarios;
    }
    // Funcion para postear un comentario, data es un objeto que contiene el comentario
    // y el correo a quien esta dirigido
    async postComentario(data){
        const comentario = await comentarioModel.create(data);
        return comentario;
    }

    // Funcion para borrar un comentario
    async deleteComentario(id){
        const comentarioBorrado = await comentarioModel.findByIdAndDelete(id);
        return comentarioBorrado;
    }

}

module.exports = Comentario;