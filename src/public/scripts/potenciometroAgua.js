// Potenciometro
const potAguaWidth = 200;
const potAguaHeight = 50;

const potSvg = d3.select('#potenciometroAgua')
    .append('svg')
    .attr('width', potAguaWidth)
    .attr('height', potAguaHeight);

const slider = potSvg.append('g')
    .attr('class', 'slider')
    .attr('transform', 'translate(10,20)');

slider.append('line')
    .attr('class', 'track')
    .attr('x1', 0)
    .attr('x2', potAguaWidth - 20)
    .attr('stroke', '#000')
    .attr('stroke-width', 10)
    .attr('stroke-linecap', 'round');

const handle = slider.append('circle')
    .attr('class', 'handle')
    .attr('r', 8)
    .attr('cx', (potAguaWidth - 20) / 2)
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('stroke-width', 2)
    .call(d3.drag()
        .on('drag', function (event) {
            let x = Math.max(0, Math.min(potAguaWidth - 20, event.x));
            handle.attr('cx', x);
            let value = Math.round((x / (potAguaWidth - 20)) * 100);
            d3.select('#valorPotAgua').text(value);
        })
    );
