let coagulantAdjustGraphicData = [];

const margin = {top: 20, right: 30, bottom: 40, left: 50};
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const cGraphSvg = d3.select('#graficoAjusteConcentracion')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const cGraphX = d3.scaleLinear()
    .domain([0, 500]) // Tiempo de 0 a 100 unidades
    .range([0, width]);

const cGraphY = d3.scaleLinear()
    .domain([0, 50]) // Concentración de 0 a 50%
    .range([height, 0]);

const cGraphXAxis = d3.axisBottom(cGraphX);
const cGraphYAxis = d3.axisLeft(cGraphY);

cGraphSvg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(cGraphXAxis)
    .append('text')
    .attr('x', width)
    .attr('y', -10)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Tiempo (unidades)');

cGraphSvg.append('g')
    .call(cGraphYAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -10)
    .attr('y', 15)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Concentración (%)');

// const line = d3.line()
//     .x(d => cGraphX(d.i))
//     .y(d => cGraphY(d.concentration));

// cGraphSvg.append('path')
//     .datum(coagulantAdjustGraphicData)
//     .attr('fill', 'none')
//     .attr('stroke', 'blue')
//     .attr('stroke-width', 2)
//     .attr('d', line);

function reDrawConcentrationOverTimeGraph() {
    // Agrega la linea de concentracion deseada en el grafico
    cGraphSvg.append('line')
        .attr('x1', 0)
        .attr('y1', y(desiredConcentration))
        .attr('x2', width)
        .attr('y2', y(desiredConcentration))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');


    // cGraphSvg.append('path')
    //     .datum(coagulantAdjustGraphicData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'blue')
    //     .attr('stroke-width', 2)
    //     .attr('d', line);

    const circles = cGraphSvg.selectAll('circle')
        .data(coagulantAdjustGraphicData);

    // TODO: Arreglar (el grafico no se ajusta a la escala)
    circles.enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', 'red')
        .merge(circles)
        .attr('cy', d => y(d.concentration))
        .attr('cx', d => x(d.i));

    circles.exit().remove();
}
