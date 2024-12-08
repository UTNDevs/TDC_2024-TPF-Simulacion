// Potenciometro
const potConcenWidth = 200;
const potConcenHeight = 50;

const potConcenSvg = d3.select('#potConcentracion')
    .append('svg')
    .attr('width', potConcenWidth)
    .attr('height', potConcenHeight);

const concenSlider = potConcenSvg.append('g')
    .attr('class', 'slider')
    .attr('transform', 'translate(10,20)');

concenSlider.append('line')
    .attr('class', 'track')
    .attr('x1', 0)
    .attr('x2', potConcenWidth - 20)
    .attr('stroke', '#000')
    .attr('stroke-width', 10)
    .attr('stroke-linecap', 'round');

const concenHandle = concenSlider.append('circle')
    .attr('class', 'handle')
    .attr('r', 8)
    .attr('cx', (potConcenWidth - 20) / 2)
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('stroke-width', 2)
    .call(d3.drag()
        .on('drag', function (event) {
            let x = Math.max(0, Math.min(potConcenWidth - 20, event.x));
            concenHandle.attr('cx', x);
            let value = Math.round((x / (potConcenWidth - 20)) * 100);
            d3.select('#valorPotConcentracion').text(value);
        })
    );
