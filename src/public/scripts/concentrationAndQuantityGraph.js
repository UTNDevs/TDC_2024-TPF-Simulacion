let graphicData = [];

const cAndQMargin = {top: 20, right: 30, bottom: 40, left: 50};
const cAndQWidth = 1000 - cAndQMargin.left - cAndQMargin.right;
const cAndQheight= 600 - cAndQMargin.top - cAndQMargin.bottom;

const cAndQGraphicSvg = d3.select('#graficoCantidadVsConcentracion')
    .append('svg')
    .attr('width',cAndQWidth+ cAndQMargin.left + cAndQMargin.right)
    .attr('height', cAndQheight + cAndQMargin.top + cAndQMargin.bottom)
    .append('g')
    .attr('transform', `translate(${cAndQMargin.left},${cAndQMargin.top})`);

const x = d3.scaleLinear()
    .domain([0, 1000]) // Cantidad de agua de 0 a 100 litros
    .range([0, cAndQWidth]);

const y = d3.scaleLinear()
    .domain([0, 100]) // Concentración de 0 a 100%
    .range([cAndQheight, 0]);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

cAndQGraphicSvg.append('g')
    .attr('transform', `translate(0,${cAndQheight})`)
    .call(xAxis)
    .append('text')
    .attr('x', cAndQWidth)
    .attr('y', -10)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Cantidad de agua (Litros)');

cAndQGraphicSvg.append('g')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -10)
    .attr('y', 15)
    .attr('fill', '#000')
    .style('text-anchor', 'end')
    .text('Concentración (%)');

const cAndQLine = d3.line()
    .x(d => x(d.water))
    .y(d => y(d.concentration));

cAndQGraphicSvg.append('path')
    .datum(graphicData)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('d', cAndQLine);

cAndQGraphicSvg.selectAll('circle')
    .data(graphicData)
    .enter()
    .append('circle')
    .attr('cx', d => x(d.water))
    .attr('cy', d => y(d.concentration))
    .attr('r', 5)
    .attr('fill', 'red');

function reDrawCAndQGraphic() {

    const cAndQLine = d3.line()
        .x(d => x(d.water))
        .y(d => y(d.concentration));

    // Selecciona y actualiza la línea
    cAndQGraphicSvg.selectAll('path')
        .datum(graphicData)
        .attr('d', cAndQLine);

    // Selecciona y actualiza los círculos
    const circles = cAndQGraphicSvg.selectAll('circle')
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
