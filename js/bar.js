function paintSvg(data) {
    const doc = document;
    const svg = doc.getElementById('svg');
    let w = 800;
    let h = 600;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    const colwidth = (w - 100) / (data.length * 2 + 1);
    for (let i = 0; i < data.length; i++) {
        const rw = colwidth;//柱子宽度
        const rh = data[i];//柱子高度
        const x = 50 + colwidth * (2 * i + 1);
        const y = h - 50 - rh;

        const rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', rw);
        rect.setAttribute('height', rh);
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('fill', 'red');
        svg.appendChild(rect);

        const values = doc.createElementNS('http://www.w3.org/2000/svg', 'text')
        values.setAttribute('x', x );
        values.setAttribute('y', y);
        values.setAttribute('fill', `black`);
        values.innerHTML = data[i];
        svg.appendChild(values);

        const month = doc.createElementNS('http://www.w3.org/2000/svg', 'text')
        month.setAttribute('x', x );
        month.setAttribute('y', 570);
        month.setAttribute('fill', `black`);
        month.innerHTML = i+1+'月';
        svg.appendChild(month);
    }
}