window.addEventListener('load', () => {
    let cookieAsesores = document.cookie.match(/asesoresToken=([^;]+)/);
     if (cookieAsesores == null) location.href = "/";
   }, false);

const input = document.getElementById("inputMateria");

const url = "/api/usuarios/asesores/";

const btnBuscar = document.getElementById("btnBuscar");
const btnSalir = document.getElementById("btnSalir");
const filter = document.getElementById("carreraFiltro");


btnBuscar.addEventListener("click", (event) => {
    event.preventDefault(); // Esto causa que se reinicie, porque es un form xd
    const materia = input.value;
    axios.get(url + materia).then(response => crearLista(response.data)).catch(err => console.log(err));
    
});

// Para cerrar sesion
btnSalir.addEventListener("click", (event) => {
    event.preventDefault(); // Esto causa que se reinicie, porque es un form xd
    asesores=document.cookie;
    document.cookie = "asesoresToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "";
});

function createCard(userInfo, container){
    let card = document.createElement("div");
    card.classList.add("card", "col-md-3");
    container.appendChild(card);
    // La imagen de la tarjeta
    let img = document.createElement("img");
    img.classList.add("card-img-top")
    let imgSrc = userInfo.fotoPerfilURL;
    img.setAttribute("src", imgSrc);
    card.appendChild(img);
    // Cuerpo de la tarjeta
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
    // Nombre
    let nombre = document.createElement("h5");
    nombre.classList.add("card-title");
    nombre.textContent = userInfo.nombre;
    cardBody.appendChild(nombre);
    // Info
    let info = document.createElement("p");
    info.classList.add("card-text");
    info.textContent = userInfo.info;
    cardBody.appendChild(info);
    // Lista  
    let cardUl = document.createElement("ul");
    cardUl.classList.add("list-group", "list-group-flush");
    card.appendChild(cardUl);
    // Elementos de la lista
    // Correo
    let correo = document.createElement("li");
    correo.textContent = userInfo.correo;

    let correoE = correo.textContent;

    correo.classList.add("list-group-item");
    cardUl.appendChild(correo);
    // Carrera
    let carrera = document.createElement("li");
    carrera.textContent = userInfo.carrera;
    carrera.classList.add("list-group-item");
    cardUl.appendChild(carrera);
    // Funcion para abrir una nueva ventana con la informacion del usuario
    card.addEventListener("click", () => {
        window.location.href = "info.html?correo="+correoE;
       });

}

function crearLista(arr){
    // EL contenedor de la lista
    let contenedor = document.getElementById("listaAsesores");
    contenedor.replaceChildren();
    // Filtramos por carrera deseada
    if(filter.value != "None"){
        arr = arr.filter(el => el.carrera == filter.value);
    }
    arr.forEach(el => {
        console.log("Creando tarjeta");
       createCard(el, contenedor);
    });
}