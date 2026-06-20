import { simulation, scenario, atOnceUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://localhost:3000") // Conecta al puerto 3000 de tu servidor Express unificado
    .acceptHeader("application/json");

  const escenaConsultarUsuarios = scenario(
    "Simulación de Carga - Lectura de BD",
  ).exec(
    http("Petición: Obtener Usuarios").get("/api/usuarios"), // Ruta que configuramos arriba
  );

  setUp(escenaConsultarUsuarios.injectOpen(atOnceUsers(10))).protocols(
    httpProtocol,
  );
});
