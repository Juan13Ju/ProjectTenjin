// Configuracion para la base de datos
const mongoose = require("mongoose");
const config = require("./config");

const url = `mongodb+srv://Juan13Ju:${config.db_password}@asesoresciencias.at0uu.mongodb.net/test`;

const connection = async()=>{
    const conn = await mongoose.connect(url)
    console.log("Mongo DB Connected",conn.connection.host)
}

module.exports = {connection,mongoose}