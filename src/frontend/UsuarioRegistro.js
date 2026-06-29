const API_URL = "http://localhost:3000";

const submitButton = document.getElementById("submit");
const respuestaRegistro = document.getElementById("respuestaRegistro");

submitButton.addEventListener("click", (e) => {
  e.preventDefault(); // evita que el form recargue la página

  const rut = document.getElementById("Rut").value;
  const nombre = document.getElementById("Nombre").value;
  const apellido = document.getElementById("Apellido").value;
  const correo = document.getElementById("Correo").value;
  const password = document.getElementById("Contraseña").value;
  const rol = document.getElementById("Rol").value;

  respuestaRegistro.innerText = "Registrando usuario...";
  registrar(rut, nombre, apellido, correo, password, rol);
});

async function registrar(rut, nombre, apellido, correo, password, rol) {
  try {
    const response = await fetch(`${API_URL}/api/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rut, nombre, apellido, correo, password, rol }),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      respuestaRegistro.innerText = `Usuario registrado exitosamente: ${data.usuario.nombre} ${data.usuario.apellido}`;
    } else {
      respuestaRegistro.innerText = `Error: ${data.error || "No se pudo registrar el usuario"}`;
    }
  } catch (error) {
    console.error("Error al intentar registrar:", error);
    respuestaRegistro.innerText = "Error al intentar registrar el usuario.";
  }
}
