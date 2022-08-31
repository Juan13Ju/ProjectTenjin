const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const url = "auth/";

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

loginBtn.addEventListener('click', () => {
	let email = document.getElementById("loginEmail").value;
	let pass = document.getElementById("loginPass").value;
	let data = {correo: email, contrasena: pass};
	axios.post(url+"login", data, {
		withCredentials: true
	}).then(res => console.log("Resultado: \n" + res))
	  .catch(err => console.log(err));	
});
// document.cookie = `asesoresToken=${res.data.token}; secure=false`
registerBtn.addEventListener('click', () => {
	let nombre = document.getElementById("accName").value;
	let correo = document.getElementById("accEmail").value;
	let contrasena = document.getElementById("accPass").value;
	let carrera = document.getElementById("accMajor").value;

	let data = {nombre, correo, contrasena, carrera};

	axios.post(url+"/registro", data)
				.then(res => console.log(res))
				.catch(err => console.log(err));
});