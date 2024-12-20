export let graphicData = {
    x:[],
    y:[]
    // type: 'scatter'
};

export function drawGraphic() {
    let data = [graphicData];
    Plotly.newPlot('graficoCantidadVsConcentracion', data);
}