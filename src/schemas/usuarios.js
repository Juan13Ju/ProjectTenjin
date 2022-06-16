// Esquema donde definimos un usuario
const {mongoose} = require("../config/db");
const {Schema} = mongoose;
const vlt = require("email-validator");

// Funcion para validar que un correo sea del dominio deseado y sea un email valido
function validator(email){
    return vlt.validate(email) && email.endsWith("ciencias.unam.mx");
}

const custom = [validator, "El email ingresado no es valido o no es un correo de ciencias"]
const usuarioSchema = new Schema(
    {
        nombre: {type: String, required: true},
        correo: {type: String, required: true, validate: custom},
        contrasena: {type: String, required: true},
        carrera: {type: String, required: true},
        // TODO - Investigar como añadir fotos
        asesorias: [String],
        calif: Number,
        info: String
    }
);

const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = UsuarioModel;