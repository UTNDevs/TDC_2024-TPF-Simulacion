let graphicData = [];

const margin = {top: 20, right: 30, bottom: 40, left: 50};
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const graphicSvg = d3.select('#graficoCantidadVsConcentracion')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear()
    .domain([0, 1000]) // Cantidad de agua de 0 a 100 litros
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 100]) // Concentración de 0 a 100%
    .range([height, 0]);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

graphicSvg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis)
    .append('text')
    .attr('x', width)
    .attr('y', -10)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Cantidad de agua (Litros)');

graphicSvg.append('g')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -10)
    .attr('y', 15)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Concentración (%)');

const line = d3.line()
    .x(d => x(d.water))
    .y(d => y(d.concentration));

graphicSvg.append('path')
    .datum(graphicData)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('d', line);

graphicSvg.selectAll('circle')
    .data(graphicData)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.water))
    .attr('cy', d => y(d.concentration))
    .attr('r', 5)
    .attr('fill', 'red');

function redibujarGrafico() {
    const line = d3.line()
        .x(d => x(d.water))
        .y(d => y(d.concentration));

    // Selecciona y actualiza la línea
    graphicSvg.selectAll('path')
        .datum(graphicData)
        .attr('d', line);

    // Selecciona y actualiza los círculos
    const circles = graphicSvg.selectAll('circle')
        .data(graphicData);

    circles.enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', 'red')
        .merge(circles)
        .attr('cx', d => x(d.water))
        .attr('cy', d => y(d.concentration));

    circles.exit().remove();
}
