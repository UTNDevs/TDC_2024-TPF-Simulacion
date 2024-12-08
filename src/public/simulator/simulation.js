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

// Simulación del sistema
async function initSimulation() {
    // Inicializar variables y parámetros
    let concentracionDeseada = parseInt(document.getElementById('valorPotConcentracion')?.textContent || '50', 10);
    let cantidadAgua = parseInt(document.getElementById('valorPotAgua')?.textContent || '50', 10) * 10 ;
    let cantidadCoagulante = 50;
    let precisionDecimales = 0.001
    let concentracionActual = calcularConcentracion(cantidadCoagulante, cantidadAgua);

    // Parámetros PID para el agua
    let Kp = 0.2, Ki = 0.02, Kd = 0.0005;
    let pidAgua = new PIDController(Kp, Kd, Ki);

    while (true) {
        if (Math.abs(concentracionActual - concentracionDeseada) <= precisionDecimales) break;

        console.log("\n================");
        //console.log(`Antes del ajuste -> \n\t Cantidad de agua: ${cantidadAgua}; \n\t Concentracion coagulante actual: ${concentracionActual} \n`);

        // Calculo del ajuste de agua
        let ajusteAgua = truncarATresDecimales(pidAgua.calculate(concentracionDeseada, concentracionActual));
        //console.log(`Ajuste del agua calculado: ${ajusteAgua}\n`);
        cantidadAgua -= ajusteAgua;

        // Calculo de la concentracion de coagulante
        concentracionActual = calcularConcentracion(cantidadCoagulante, cantidadAgua);

        //console.log(`Luego del ajuste -> \n\t Nueva concentracion de coagulante: ${concentracionActual}; \n\t Nueva cantidad de agua: ${cantidadAgua} \n`);
        console.log(graphicData[graphicData.length - 1]);
        console.log("================\n");

        graphicData.push({concentration: concentracionActual, water: cantidadAgua});
        redibujarGrafico();

        await delay(1500);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function truncarATresDecimales(num) {
    return Math.trunc(num * 1000) / 1000;
}

function calcularConcentracion(cantCoagulante, cantAgua) {
    return truncarATresDecimales((cantCoagulante * 100) / (cantAgua + cantCoagulante));
}


// Add this script to handle play and pause functionality
document.getElementById('playButton').addEventListener('click', () => {
    initSimulation().then(r => {});
});

document.getElementById('stopButton').addEventListener('click', () => {
    window.location.reload();
});
