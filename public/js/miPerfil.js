const apiPerfil = "api/usuarios/MyProfile";

// Obtenemos los inputs en los que estan la informacion del usuario
const apiUsuarios = "api/usuarios/"
const nombre = document.getElementById("nombre");
const carrera = document.getElementById("carrera");
const materias = document.getElementById("asesorias");
const info = document.getElementById("info");
// Id para poder actualizar al usuario
let id = null;

// Para el boton de actualizar
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

});

function llenarInfo(email){
    let infoUser = null;
    axios.get(apiUsuarios+email)
            .then(res => {
                infoUser = res.data;
                id = infoUser._id;
                nombre.value = infoUser.nombre;
                carrera.value = infoUser.carrera;
                materias.value = infoUser.asesorias.join();
                info.value = infoUser.info;
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
