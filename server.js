const express = require("express");
// Importamos la funcion para conectarnos a la base de datos
const {connection} = require("./src/config/db");
// Importamos el router de usuarios
const usuarios = require("./src/router/usuarios");
// Configuracion usando dotemv
const config = require("./src/config/config")
const app = express();

//Middleware
app.use(express.json());

//Nos conectamos a la base de datos
connection();
// Llamamos el router para usuarios
usuarios(app);

// Inicializamos el servidor
const server = app.listen(config.port);

process.on('unhandledRejection',(err,promise)=>{
    console.log('Error',err.message)
    server.close(()=>process.exit(1))
})

module.exports = app
