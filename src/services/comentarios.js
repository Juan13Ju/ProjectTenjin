const comentarioModel = require("../schemas/comentarios");
const UsuarioService = require("./usuarios");
class Comentario{

    usuarioService = new UsuarioService();

    // Funcion que obtiene todos los comentarios de un correo
    async getComentarios(correo){
        const comentarios = await comentarioModel.find({to: correo}).exec();
        return comentarios;
    }
    // Funcion para postear un comentario, data es un objeto que contiene el comentario
    // y el correo a quien esta dirigido
    async postComentario(data){
        const user = await this.usuarioService.getUser(data.to);
        console.log(user);
        if(!user){
            return {success: false, msg: `El usuario no existe`};
        }
        
        const comentario = await comentarioModel.create(data);
        return {success: true, comentario};
    }

    // Funcion para borrar un comentario
    async deleteComentario(id){
        const comentarioBorrado = await comentarioModel.findByIdAndDelete(id);
        return comentarioBorrado;
    }

}

module.exports = Comentario;