const {mongoose} = require("../config/db");
const {Schema} = mongoose;

const comentarioSchema = new Schema({
    comentario: {type: String, required: true},
    to: {type: String, required: true}
});

const ComentarioModel = mongoose.model("Comentaio", comentarioSchema);

module.exports = ComentarioModel;