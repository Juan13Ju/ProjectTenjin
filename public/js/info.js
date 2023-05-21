// Obtenemos el correo del usuario para crear su perfil
const urlString = window.location.href;
const url = new URL(urlString);
const correo = url.searchParams.get("correo");

const apiUsuarios = "/api/usuarios/";
const apiComentarios = "/api/comentarios/";

const comentarioInput = document.getElementById("comentarioInput");
const btnComentario = document.getElementById("submitBtn");

const califInput = document.getElementsByName("estrellas");

// Para dejar comentarios
btnComentario.addEventListener("click", () => {
    let text = comentarioInput.value;
    let estrella = 0;
    califInput.forEach(el => {
        if (el.checked) estrella=el.value;});
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
axios.get(apiUsuarios+correo)
    .then(response => {
        crearInfo(response.data);
    })
    .catch(err => {
        console.log(err);
    });
// Comentarios asociados al perfil
axios.get(apiComentarios+correo)
    .then(response => {
        let respuesta = response.data;
        crearComentarios(respuesta);
        let promedio = calcularPromedio(respuesta);
        console.log(promedio);
        let prom = document.getElementById("promedio");
        prom.textContent = promedio+mostrarEstrellas(promedio);
    })
    .catch(err => {
        console.log(err);
    });
// Calcular promedio de calificaciones
function calcularPromedio(response){
    let suma = 0;
    response.forEach(c => {
        if (isNaN(c.calif)) c.calif = 0;
        suma+=c.calif;
    });
    return suma/response.length;
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
function crearInfo(data){
    let nombre = document.getElementById("nombre");
    nombre.textContent = data.nombre;
    let correo = document.getElementById("correo");
    correo.textContent = data.correo;
    let carrera = document.getElementById("carrera");
    carrera.textContent = data.carrera;
    let info = document.getElementById("info");
    info.textContent = data.info;
}

// Creamos los comentarios
function crearComentarios(data){
    let contenedor = document.getElementById("comentariosContainer");
    if(data.length == 0){
        let noComments = document.createElement("h2");
        noComments.textContent = "No hay comentarios disponibles."
        contenedor.append(noComments);
        return;
    }
    data.forEach(el => {
        let div = document.createElement("div");
        div.classList.add("comentario");
        let coment = document.createElement("p");
        coment.classList.add("comentarioContent")
        coment.textContent = el.comentario;
        div.append(coment);

        contenedor.append(div);
    });
}
