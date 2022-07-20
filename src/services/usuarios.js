const usuarioModel = require("../schemas/usuarios");
// Aqui definimos las operaciones relacionadas a los servicios de usuarios
class Usuarios{

    // Obtiene un usuario dado su correo
    async getUser(correo, devolverPass = false){
        if(devolverPass){
            const userConPass = await usuarioModel.findOne({correo}).exec();    
            return userConPass;
        }
        const user = await usuarioModel.findOne({correo}, "-contrasena").exec();
        return user;
    }
    // Obtiene todos los asesores que dan asesorias de la materia buscada
    async getUserAsesor(materia){
        const asesores = await usuarioModel.find({asesorias: materia}, "-contrasena").exec();

        return asesores;
    }

    // Funcion para crear un usuario
    async createUser(data){
        const usuarioCreado = await usuarioModel.create(data);
        return {data: usuarioCreado, success: true, msg: "Usuario creado exitosamente"};
    }
    // Actualiza la informacion de un usuario
    async updateUser(id, data){
        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(id, data);
        return usuarioActualizado || {};
    }

    // Elimina un asesor
    async deleteUser(id){
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(id);
        return usuarioEliminado || {};
    }
}

module.exports = Usuarios