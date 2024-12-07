import {PIDController} from "./controller.js";

// Inicializar variables y parámetros
let concentracionDeseada = 50;
let cantidadCoagulante = 50;
let cantidadAgua = 100;
let precisionDecimales = 0.001
let concentracionActual = calcularConcentracion(cantidadCoagulante, cantidadAgua);

// Parámetros PID para el agua
let Kp = 0.2, Ki = 0.02, Kd = 0.0005;

let pidAgua = new PIDController(Kp, Kd, Ki);

// Simulación del sistema
while (true) {
    if (Math.abs(concentracionActual - concentracionDeseada) <= precisionDecimales) break;

    console.log("\n================");
    console.log(`Antes del ajuste -> \n\t Cantidad de agua: ${cantidadAgua}; \n\t Concentracion coagulante actual: ${concentracionActual} \n`);

    // Calculo del ajuste de agua
    let ajusteAgua = truncarATresDecimales(pidAgua.calculate(concentracionDeseada, concentracionActual));
    console.log(`Ajuste del agua calculado: ${ajusteAgua}\n`);
    cantidadAgua -= ajusteAgua;

    // Calculo de la concentracion de coagulante
    concentracionActual = calcularConcentracion(cantidadCoagulante, cantidadAgua);

    console.log(`Luego del ajuste -> \n\t Nueva concentracion de coagulante: ${concentracionActual}; \n\t Nueva cantidad de agua: ${cantidadAgua} \n`);
    console.log("================\n");

    await delay(1000);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function truncarATresDecimales(num) {
    return Math.trunc(num * 1000) / 1000;
}

function calcularConcentracion(cantCoagulante, cantAgua) {
    return truncarATresDecimales((cantidadCoagulante * 100) / (cantidadAgua + cantidadCoagulante));
}
