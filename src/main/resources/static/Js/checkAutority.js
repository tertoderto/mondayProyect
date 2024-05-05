
    // Función para verificar el inicio de sesión
    function verificarInicioSesion() {
    // Aquí puedes agregar la lógica para verificar si el usuario ha iniciado sesión
    // En este ejemplo, simplemente comprobaremos si existe un token de sesión en el almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) {
    // Si no hay token de sesión, redireccionar a la página de inicio de sesión
    window.location.href = 'index.html';
}
}
