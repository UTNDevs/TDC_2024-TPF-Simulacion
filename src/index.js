import {PIDController} from "./controller.js";

let desiredConcentration = 0.5;
let actualConcentration = 0;

// Parámetros PID
let Kp = 1.0;
let Ki = 0.5;
let Kd = 0.1;
let dt = 1; // Tiempo de muestreo

let pid = new PIDController(Kp, Ki, Kd, dt);

while (true) {
    console.log("====================");
    console.log(`Concentracion actual: ${actualConcentration}`)

    // Calcular el ajuste de dosificación
    let dosification = pid.calculate(desiredConcentration, actualConcentration);
    console.log(`Dosificacion calculada: ${dosification}`)

    // Simular la inyección del coagulante en el tanque
    actualConcentration += dosification * dt; // Simplificación de la dinámica del tanque
    console.log(`Concentracion actual: ${actualConcentration}`)
    console.log("====================");

    console.log("\n");
    await delay(3000);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
