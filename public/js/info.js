window.addEventListener('load', () => {
    let cookieAsesores = document.cookie.match(/asesoresToken=([^;]+)/);
    if (cookieAsesores == null) location.href = "/";
}, false);

// Obtenemos el correo del usuario para crear su perfil
const urlString = window.location.href;
const url = new URL(urlString);
const correo = url.searchParams.get("correo");

const apiUsuarios = "/api/usuarios/";
const apiComentarios = "/api/comentarios/";

const comentarioInput = document.getElementById("comentarioInput");
const btnComentario = document.getElementById("submitBtn");
const btnSalir = document.getElementById("btnSalir");

const califInput = document.getElementsByName("estrellas");
let contenedor = document.getElementById("comentariosContainer");

// Para cerrar sesion
btnSalir.addEventListener("click", (event) => {
    event.preventDefault(); // Esto causa que se reinicie, porque es un form xd
    asesores = document.cookie;
    document.cookie = "asesoresToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "";
});

// Para dejar comentarios
btnComentario.addEventListener("click", () => {
    let text = comentarioInput.value;
    let estrella = 0;
    califInput.forEach(el => {
        if (el.checked) estrella = el.value;
    });
    let data = {
        to: correo,
        comentario: text,
        calif: estrella
    }
    axios.post(apiComentarios, data)
        .then(res => console.log("Comentario exitoso"))
        .catch(err => console.log(err));
});


// Hacemos la peticion para obtener su informacion
axios.get(apiUsuarios + correo)
    .then(response => {
        crearInfo(response.data);
    })
    .catch(err => {
        console.log(err);
    });
// Comentarios asociados al perfil
axios.get(apiComentarios + correo)
    .then(response => {
        let respuesta = response.data;
        crearComentarios(respuesta);
        let promedio = calcularPromedio(respuesta);
        let prom = document.getElementById("promedio");
        prom.textContent = promedio + mostrarEstrellas(promedio);
    })
    .catch(err => {
        console.log(err);
    });
// Calcular promedio de calificaciones
function calcularPromedio(response) {
    let suma = 0;
    response.forEach(c => {
        if (isNaN(c.calif)) c.calif = 0;
        suma += c.calif;
    });
    return suma / response.length;
}
// Crear cadena de estrellas
function mostrarEstrellas(promedio) {
    var estrellas = '';
    var maxEstrellas = 5;
    for (var i = 0; i < maxEstrellas; i++) {
        if (promedio > i) estrellas += '⭐️';
        else estrellas += '☆';
    }
    return estrellas;
}


// Creamos la info del usuario
function crearInfo(data) {
    let nombre = document.getElementById("nombre");
    nombre.textContent = data.nombre;
    let correo = document.getElementById("correo");
    correo.textContent = data.correo;
    let carrera = document.getElementById("carrera");
    carrera.textContent = data.carrera;
    let info = document.getElementById("info");
    info.textContent = data.info;

    userInfo = data;
    let img = document.createElement("img");
    let imgSrc = userInfo.fotoPerfilURL;
    img.setAttribute("src", imgSrc);
    img.setAttribute("style", "max-width:350px; height:auto;")
    // Agregamos la imagen 
    let fig = document.getElementById("profileImg");
    fig.appendChild(img);
}

// Creamos los comentarios
function crearComentarios(data) {
    if (data.length == 0) {
        let noComments = document.createElement("h2");
        noComments.textContent = "No hay comentarios disponibles."
        contenedor.append(noComments);
        return;
    }
    let content = '';

    data.forEach(el => {
        estrellasDadas = mostrarEstrellas(el.calif);
        content += `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${el.comentario}</h5>
                <p class="card-text">${estrellasDadas}</p>
            </div>
        </div>`
    });
    comentariosContainer.innerHTML = content;
}
