class PIDController {
    constructor(Kp, Ki, Kd, dt = 1) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
        this.dt = dt;

        this.previousError = 0;
        this.integral = 0;
    }

    calculate(inputValue, actualValue) {
        const error = inputValue - actualValue;
        this.integral += error * this.dt;
        const derivative = (error - this.previousError) / this.dt;

        const output = (this.Kp * error) + (this.Ki * this.integral) + (this.Kd * derivative);
        this.previousError = error;

        return output;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let coagulantConcentration = 0; // Concentración inicial de coagulante en gramos/Litro
let desiredConcentrationValue = document.getElementById('desiredConcentrationValue');

let endedProcessMessage = document.getElementById('mensajeProcesoFinalizado');
let inputFinalWaterConcentration = document.getElementById("inputCantidadFinalAgua");
let inputFinalConcentration = document.getElementById("inputConcentracionFinal");
let inputError = document.getElementById("inputError");

let finalWaterQuantity = document.getElementById("inputCantidadFinalAgua");
let finalConcentrationQuantity = document.getElementById("inputConcentracionFinal");

let potPerturbationValue = document.getElementById('valorPotPerturbacion');
let initialWaterQuantity = document.getElementById("cantInicialAgua");
let initialCoagulantQuantity = document.getElementById("cantCoagulante");

// Inicializar variables y parámetros
let desiredConcentration = parseInt(desiredConcentrationValue?.textContent, 10);
let perturbation = 0;
let waterQuantity = 0;
let coagulantQuantity = parseInt(initialCoagulantQuantity.value);
let actualConcentration = 0;
let decimalsPrecision = 0.1

// Simulación del sistema
async function initSimulation() {
    clearScreen();

    // Parámetros PID para el agua
    let Kp = 2, Ki = 0.02, Kd = 0.0005;
    let pidAgua = new PIDController(Kp, Kd, Ki);
    let error = 0;

    while (true) {
        // Calculo de la concentracion de coagulante
        actualConcentration = calculateConcentration(coagulantQuantity, waterQuantity);
        actualConcentration += perturbation;

        error = Math.abs(actualConcentration - desiredConcentration)
        if (error <= decimalsPrecision) {
            graphicData.push({concentration: actualConcentration, water: waterQuantity});
            console.log(graphicData[graphicData.length - 1]);
            endedProcessMessage.style.display = 'flex';
            inputFinalWaterConcentration.setAttribute("value", waterQuantity.toFixed(4) + " L");
            inputFinalConcentration.setAttribute("value", actualConcentration.toFixed(4) + " g/L");
            inputError.setAttribute("value", (100 * error / desiredConcentration).toFixed(4) + " %");
            break;
        }

        console.log("\n================");
        console.log(`Concentracion deseada: ${desiredConcentration};`);
        console.log(`Perturbacion: ${perturbation};`);

        // Calculo del ajuste de agua
        let waterAdjust = truncateToThreeDecimals(pidAgua.calculate(desiredConcentration, actualConcentration));
        waterQuantity -= waterAdjust;

        console.log(graphicData[graphicData.length - 1]);
        console.log("================\n");

        graphicData.push({concentration: actualConcentration, water: waterQuantity});
        reDrawCAndQGraphic(desiredConcentration);

        await delay(1500);
    }
}

// Simulacion de la concentracion a lo largo del tiempo en el sistema
async function initConcentrationSimulation() {
    const pid = new PIDController(5, 0.1, 0.01); // Ajusta los parámetros del PID según sea necesario
    let i = 0;
    let tankVolume = 1000;

    while (true) {
        let coagulantAmount = pid.calculate(desiredConcentration, coagulantConcentration);
        coagulantConcentration += coagulantAmount / tankVolume;

        console.log(`Concentración de coagulante: ${coagulantConcentration.toFixed(2)} g/L`);

        // Verifica si se ha alcanzado el setpoint
        if (Math.abs(desiredConcentration - coagulantConcentration) < 0.01) {
            coagulantAdjustGraphicData.push({concentration: coagulantConcentration.toFixed(2), i: i});
            console.log("Concentración de coagulante alcanzada: " + coagulantConcentration);
            break;
        }

        coagulantAdjustGraphicData.push({concentration: actualConcentration, i: i});
        reDrawConcentrationOverTimeGraph();
        i++;

        await delay(1500);
    }
}

function truncateToThreeDecimals(num) {
    return Math.trunc(num * 1000) / 1000;
}

function calculateConcentration(coagulantQuantity, waterQuantity) {
    return truncateToThreeDecimals((coagulantQuantity * 100) / (waterQuantity + coagulantQuantity));
}

function clearScreen() {
    finalWaterQuantity.setAttribute("value", "0 L");
    finalConcentrationQuantity.setAttribute("value", "0 g/L");
    inputError.setAttribute("value", "0 %");
    endedProcessMessage.style.display = 'none';
}

// Add this script to handle play and pause functionality
document.getElementById('playButton2').addEventListener('click', () => {
    desiredConcentration = parseInt(desiredConcentrationValue?.textContent)
    waterQuantity = parseInt(initialWaterQuantity.value);
    initSimulation().then(_ => {
    });
});

document.getElementById('stopButton2').addEventListener('click', () => {
    window.location.reload();
});

document.getElementById('botonPerturbacion').addEventListener('click', () => {
    perturbation = parseInt(potPerturbationValue?.textContent || '50', 10);
})

// Ejemplo de uso: Controlar la concentración de coagulante a 5 gramos/Litro
document.getElementById('concentrationSimulationPlayButton').addEventListener('click', () => {
    initConcentrationSimulation().then(_ => {
    });
});

document.getElementById('concentrationSimulationStopButton').addEventListener('click',()=>{
    window.location.reload();
})
