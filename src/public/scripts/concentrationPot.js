function createPotentiometer(svgSelector, valueSelector, width, height, valueMax) {
    const svg = d3.select(svgSelector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const slider = svg.append('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(10,20)');

    slider.append('line')
        .attr('class', 'track')
        .attr('x1', 0)
        .attr('x2', width - 20)
        .attr('stroke', '#000')
        .attr('stroke-width', 10)
        .attr('stroke-linecap', 'round');

    const handle = slider.append('circle')
        .attr('class', 'handle')
        .attr('r', 8)
        .attr('cx', (width - 20) / 2)
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .call(d3.drag()
            .on('drag', function (event) {
                let x = Math.max(0, Math.min(width - 20, event.x));
                handle.attr('cx', x);
                let value = Math.round((x / (width - 20)) * valueMax);
                d3.select(valueSelector).text(value);
            })
        );
}

// Crear potenciometros para diferentes selectores
createPotentiometer('#potConcentracion', '#valorPotConcentracion', 200, 50, 100);
createPotentiometer('#potPerturbacion', '#valorPotPerturbacion', 200, 50, 50);
