const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// Importamos la funcion para conectarnos a la base de datos
const {connection} = require("./src/config/db");
// Importamos el router de usuarios
const usuarios = require("./src/router/usuarios");
const auth = require("./src/router/auth");
const comentarios = require("./src/router/comentarios");
const views = require("./src/router/views");
// Configuracion usando dotemv
const config = require("./src/config/config");
const app = express();

// Para res.render();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
//     next();
// })

//Nos conectamos a la base de datos
connection();
// Llamamos el router para usuarios
usuarios(app);
auth(app);
comentarios(app);
views(app);

// Inicializamos el servidor
const server = app.listen(config.port);

process.on('unhandledRejection',(err,promise)=>{
    console.log('Error',err.message)
    console.log(err.stack);
    server.close(()=>process.exit(1))
})

module.exports = app
