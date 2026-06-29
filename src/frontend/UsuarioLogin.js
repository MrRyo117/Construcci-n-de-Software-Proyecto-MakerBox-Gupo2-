const submitButton = document.getElementById("submit");
const respuestaLogin = document.getElementById("respuesta");

const API_URL = "http://localhost:3000";

submitButton.addEventListener("click", (e) => {
  e.preventDefault(); // evita que el form recargue la página
  const rut = document.getElementById("Usuario").value;
  const password = document.getElementById("Contraseña").value;
  respuestaLogin.innerText = "Intentando login...";
  login(rut, password);
});

async function login(rut, password) {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rut, password }),
    });
    const data = await response.json();
    respuestaLogin.innerText = data.ok
      ? "Login exitoso. Bienvenido!"
      : "Login fallido. RUT o contraseña incorrectos.";
  } catch (error) {
    console.error("Error al intentar login:", error);
    respuestaLogin.innerText = "Error al intentar login.";
  }
}
