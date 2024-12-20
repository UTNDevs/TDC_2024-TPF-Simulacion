import {Chart} from "chart.js/auto";

const ctx = document.getElementById('graficoCantidadVsConcentracion').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Aquí van las etiquetas del eje X (por ejemplo, cantidad de agua)
        datasets: [{
            label: 'Concentración de coagulante',
            data: [], // Aquí van los datos del eje Y (por ejemplo, concentración)
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Cantidad de agua (L)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Concentración (g/L)'
                }
            }
        }
    }
});

// Función para actualizar el gráfico con nuevos datos
function updateChart(data) {
    myChart.data.labels = data.map(d => d.water);
    myChart.data.datasets[0].data = data.map(d => d.concentration);
    myChart.update();
}

// Ejemplo de uso: Actualizar el gráfico con datos
export const graphicData = [
    {water: 100, concentration: 5},
    {water: 200, concentration: 10},
    {water: 300, concentration: 15}
];
updateChart(graphicData);
