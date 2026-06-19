import {validarUsuario} from './ConectarBD.cjs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function login(rut, password) {
    const rl = readline.createInterface({ input, output });
    console.log("=== Login de Usuario ===");
    try {
        const rut = await rl.question("RUT: ");
        const password = await rl.question("Contraseña: ");
        const esValido = await validarUsuario(rut, password);
        if (esValido) {
            console.log("Login exitoso. Bienvenido!");
        } else {
            console.log("Login fallido. RUT o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al intentar login:", error);
    } finally {
        rl.close();
    }
}

login();