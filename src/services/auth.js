const jwt = require("jsonwebtoken");
const Usuarios = require("./usuarios");
const bcrypt = require("bcrypt");
const config = require("../config/config");

class Auth{
    usuarios = new Usuarios();

    // Encripta la contraseña del usuario
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    async login(correo, contrasena){
        const usuario = await this.usuarios.getUser(correo);
        if(usuario){
            const contraseñaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
            if(contraseñaCorrecta){
                const token = jwt.sign({correo: usuario.correo, id: usuario.id}, config.jwt_secret,
                    {
                        expiresIn: "1d"
                    });

                return {token, usuario, success: true};
            }
        }
        return {success: false, msg: "Credenciales incorrectas"};
    }

    async registro(nombre, correo, contrasenaOriginal, carrera, asesorias, info){
        const contrasena = await this.hashPassword(contrasenaOriginal);
        const user = await this.usuarios.createUser({
            nombre,
            correo,
            contrasena,
            carrera,
            asesorias : asesorias || [],
            info : info || "Sin informacion"
        });

        return {success: true, user};
    }
}

module.exports = Auth;