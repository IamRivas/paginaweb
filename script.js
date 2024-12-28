// Mapeo de usuarios con sus nombres y contraseñas
const userCredentials = {
  "rocafuerteoswaldo@gmail.com": { name: "Oswaldo Rocafuerte", password: "Oswaldo123" },
  "ricardo.rocafuerte@gmail.com": { name: "Ricardo Rocafuerte", password: "Ricardo123" },
  "maria.garcia@example.com": { name: "María García", password: "Maria123" },
  "juan.perez@example.com": { name: "Juan Pérez", password: "Juan123" }
};

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (userCredentials[username] && userCredentials[username].password === password) {
      localStorage.setItem("loggedInUser", username); // Guardar el correo en localStorage
      window.location.href = "./Dashboard.html"; // Redirigir al dashboard
  } else {
      errorMessage.style.display = "block"; // Mostrar mensaje de error
      setTimeout(() => {
          errorMessage.style.display = "none";
      }, 5000);
  }
}
const userFondo = document.querySelector('.user-fondo');

// Este bloque debe ser eliminado si está presente
userFondo.addEventListener('wheel', (event) => {
    event.preventDefault();
    // Código de transformación aquí
});

let scale = 1;

document.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    scale += 0.05; // Zoom in
  } else {
    scale -= 0.05; // Zoom out
  }
});

// Seleccionar el botón y el menú desplegable
const menuButton = document.getElementById('menuButton');
const dropdown = document.getElementById('dropdown');

// Evento para alternar el menú
menuButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevenir comportamiento no deseado
  dropdown.classList.toggle('hidden'); // Alterna la visibilidad del menú
  console.log("Clase actual del menú:", dropdown.className); // Para depuración
});

// Evento para cerrar sesión
document.getElementById('logout-btn').addEventListener('click', () => {
  console.log("¡Cerrar sesión clickeado!");
  localStorage.removeItem('loggedInUser'); // Limpia el usuario logueado
  window.location.href = "./index.html"; // Redirige a la página de inicio de sesión
});



