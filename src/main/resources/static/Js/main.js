const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }
    iniciarSesion();
    console.log(data)
})

function iniciarSesion() {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // En este ejemplo, simplemente guardaremos un token de sesión en el almacenamiento local
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Aquí podrías enviar los datos de inicio de sesión a un servidor para autenticar
    // Pero por simplicidad, solo simularemos que la autenticación fue exitosa
    if (username === 'usuario' && password === 'contraseña') {
        localStorage.setItem('token', 'token_de_sesion_generado');
        window.location.href = 'controler.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
    return false; // Evitar que el formulario se envíe
}
