window.addEventListener('load', () => {
    let cookieAsesores = document.cookie.match(/asesoresToken=([^;]+)/);
     if (cookieAsesores == null) location.href = "/";
   }, false);

const apiPerfil = "api/usuarios/MyProfile";
// Obtenemos los inputs en los que estan la informacion del usuario
const apiUsuarios = "api/usuarios/"
const nombre = document.getElementById("nombre");
const carrera = document.getElementById("carrera");
const materias = document.getElementById("asesorias");
const info = document.getElementById("info");
const btnSalir = document.getElementById("btnSalir");

// Id para poder actualizar al usuario
let id = null;

// Para cerrar sesion
btnSalir.addEventListener("click", (event) => {
    event.preventDefault(); // Esto causa que se reinicie, porque es un form xd
    asesores=document.cookie;
    document.cookie = "asesoresToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "";
});

// Para el boton de actualizar info
const btnUpdate = document.getElementById("btnUpdate");
btnUpdate.addEventListener("click", () => {
    let newNombre = nombre.value;
    let newCarrera = carrera.value;
    let newMaterias = materias.value.split(",");
    let newInfo = info.value;
    console.log({
        newNombre,
        newCarrera,
        newMaterias,
        newInfo
    });
   axios.put(apiUsuarios+`/${id}`, {
        nombre: newNombre,
        carrera: newCarrera,
        asesorias: newMaterias,
        info: newInfo
    });

    alert("info actualizada");
}); 

// Llena la info del perfil cuando se carga la pagina
function llenarInfo(email){
    let userInfo = null;
    axios.get(apiUsuarios+email)
            .then(res => {
                userInfo = res.data;
                id = userInfo._id;
                nombre.value = userInfo.nombre;
                carrera.value = userInfo.carrera;
                materias.value = userInfo.asesorias.join();
                info.value = userInfo.info;
                // Obtenemos la imagen
                let img = document.createElement("img");
                let imgSrc = userInfo.fotoPerfilURL;
                img.setAttribute("src", imgSrc);
                // Agregamos la imagen 
                let fig = document.getElementById("profileImg");
                fig.appendChild(img);
            })
            .catch(err => console.log(err));
}

axios.get(apiPerfil, {
    headers: {
        withCredentials: true,
    }
})
        .then(res => {
            llenarInfo(res.data.user.correo);
        })
        .catch(err => console.log(err));
