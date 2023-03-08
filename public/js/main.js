

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
       let nombre = document.createElement("h3");
       nombre.textContent =  el.nombre;

       let correo = document.createElement("h3");
       correo.textContent = el.correo;
       
       let carrera = document.createElement("h3");
       carrera.textContent = el.carrera;
       
       let info = document.createElement("p");
       info.textContent = el.info;
       
       
       // Etiquetas para la info
       let etiqueta_nombre = document.createElement("h2");
       etiqueta_nombre.textContent =  "Nombre";

       let etiqueta_correo = document.createElement("h2");
       etiqueta_correo.textContent =  "Correo";
       
       let etiqueta_carrera = document.createElement("h2");
       etiqueta_carrera.textContent =  "Carrera de origen";

       let etiqueta_info = document.createElement("h2");
       etiqueta_info.textContent =  "Descripcion";
    
       
       
       let bloque1 = document.createElement("div");
       bloque1.classList.add("sec-card");
       let bloque2 = document.createElement("div");
       bloque2.classList.add("sec-card");

       let img = document.createElement("img");

       card.append(bloque1);
       card.append(bloque2);

       bloque1.append(img);
       img.setAttribute("src", "img/no-profile-image.png");

       bloque1.append(etiqueta_nombre);
       bloque1.append(nombre);

       bloque1.append(etiqueta_correo);
       bloque1.append(correo);
       
       bloque2.append(etiqueta_carrera);
       bloque2.append(carrera);
       
       bloque2.append(etiqueta_info);
       bloque2.append(info);
       
       // Funcion para abrir una nueva ventana con la informacion del usuario
       card.addEventListener("click", () => {
        let correo = card.children[1].innerHTML;
        window.location.href = "info.html?correo="+correo;
       });
       // Añadimos el elemento al contenedor
       contenedor.append(card);
    });
}