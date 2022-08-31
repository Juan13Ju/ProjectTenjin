

const input = document.getElementById("inputMateria");

const url = "/api/usuarios/asesores/";


const btnBuscar = document.getElementById("btnBuscar");

const filter = document.getElementById("carreraFiltro");

btnBuscar.addEventListener("click", () => {
    const materia = input.value;
    
    axios.get(url + materia).then(response => crearLista(response.data)).catch(err => console.log(err));
});

function crearLista(arr){
    // EL contenedor de la lista
    let contenedor = document.getElementById("listaAsesores");
    contenedor.replaceChildren();
    // Filtramos por carrera deseada
    if(filter.value != "None"){
        arr = arr.filter(el => el.carrera == filter.value);
    }
    arr.forEach(el => {
        let card = document.createElement("div");
        card.classList.add("card");
        // Creamos un nuevo elemento para cada info que queremos mostrar
       let nombre = document.createElement("h2");
       nombre.textContent = el.nombre;

       let correo = document.createElement("h3");
       correo.textContent = el.correo;

       let carrera = document.createElement("h3");
       carrera.textContent = el.carrera;

       let info = document.createElement("p");
       info.textContent = el.info;
       
       card.append(nombre);
       card.append(correo);
       card.append(carrera);
       card.append(info);

       // Funcion para abrir una nueva ventana con la informacion del usuario
       card.addEventListener("click", () => {
        let correo = card.children[1].innerHTML;
        window.location.href = "info.html?correo="+correo;
       });
       // Añadimos el elemento al contenedor
       contenedor.append(card);
    });
}