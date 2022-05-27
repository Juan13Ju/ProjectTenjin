const {mongoose} = require("../config/db");
const {Schema} = mongoose;

const usuarioSchema = new Schema(
    {
        nombre: {type: String, required: true},
        correo: {type: String, required: true},
        contraseña: {type: String, required: true},
        carrera: {type: String, required: true},
        // TODO - Investigar como añadir fotos
        asesorias: [String],
        calif: Number,
        info: {type: String, required: true}
    }
);

const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = UsuarioModel;