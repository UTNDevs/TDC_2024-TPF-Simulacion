import {PIDController} from "./controller.js";

// Inicializar variables y parámetros
let concentracionDeseada = 0.5; // Concentración deseada de coagulante
let concentracionActual = 0; // Estado inicial del tanque
let cantidadCoagulanteFija = 10; // Cantidad fija de coagulante
let cantidadAgua = 100; // Estado inicial de agua en el tanque

// Parámetros PID para el agua
let Kp = 0.2;
let Ki = 0.02;
let Kd = 0.0005;

let pidAgua = new PIDController(Kp,Kd,Ki);

// Simulación del sistema
while(true)
{
    console.log("\n");
    console.log("================");

    console.log(`Antes del ajuste -> Cantidad de agua: ${cantidadAgua}; Concentracion coagulante actual: ${concentracionActual}`);
    // Control de cantidad de agua
    let ajusteAgua = pidAgua.calculate(concentracionDeseada, concentracionActual);

    // Simular el ajuste en el sistema
    let incrementoAgua = Math.max(-cantidadAgua, Math.min(ajusteAgua, 10)); // Asegúrate de no permitir decrementos por debajo de cero

    // Actualizar el sistema
    cantidadAgua += incrementoAgua;
    concentracionActual = (cantidadCoagulanteFija * 100) / (cantidadAgua + cantidadCoagulanteFija);

    // Mostrar resultados
    console.log(`Luego del ajuste -> Cantidad de agua final: ${cantidadAgua}; Concentración coagulante nueva: ${concentracionActual}`);
    console.log("================");

    await delay(3000);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
