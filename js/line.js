function paintCanvas(data) {
    const doc = document;
    const canvas = doc.getElementById('canvas');
    let w = 800;
    let h = 600;
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(50, 550);
        ctx.lineTo(750, 550);
        ctx.moveTo(740, 540);
        ctx.lineTo(750, 550);
        ctx.moveTo(740, 560);
        ctx.lineTo(750, 550);
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 550);
        ctx.moveTo(50, 50);
        ctx.lineTo(40, 60);
        ctx.moveTo(50, 50);
        ctx.lineTo(60, 60);
        const colwidth = (w - 100) / (data.length * 2 + 1);
        for (let i = 0; i < data.length; i++) {
            const x = 50 + colwidth * (2 * i + 1.5);
            const y = h - 50 - data[i];
            ctx.fillText(data[i],x-5,y-5);
            ctx.fillText(`${i+1}月`,x,560);
            if (i===0) {
                ctx.moveTo(x,y);
                ctx.arc(x+2.5,y,2.5,0,Math.PI*2);
            } else {
                ctx.lineTo(x,y);
                ctx.arc(x+2.5,y,2.5,0,Math.PI*2);
            }
        }
        ctx.stroke();
    }
}