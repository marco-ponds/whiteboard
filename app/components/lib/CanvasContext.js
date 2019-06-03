class CanvasContext {

    constructor() {
        // does noething
    }

    // this guy is responsible for drawing all things
    start(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
    }

    destroy() {
        this.canvas = null;
        this.ctx = null;
    }

    drawLine(start, stop, color, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(stop.x, stop.y);
        // this.ctx.ellipse(stop.x, stop.y, size.key/10, size.key/10, Math.PI / 4, 0, 2 * Math.PI);
        this.ctx.strokeStyle = color.key;
        this.ctx.fillStyle = color.key;
        this.ctx.lineWidth = size.key/2;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawDot(start, color, size) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color.key;
        this.ctx.strokeStyle = color.key;
        this.ctx.fillRect(start.x, start.y, size.key/2, size.key/2);
        this.ctx.closePath();
    }

    drawSquare(start, stop, color, size) {
        this.ctx.lineWidth = size.key/2;
        this.ctx.strokeStyle = color.key;

        this.ctx.strokeRect(start.x, start.y, stop.x - start.x, stop.y - start.y);
    }

    drawCircle(start, stop, color, size) {
        const radius = {
            x: (stop.x - start.x) /2,
            y: (stop.y - start.y) /2
        };
        const center = {
            x: start.x + radius.x,
            y: start.y + radius.y
        };

        this.ctx.beginPath();
        this.ctx.lineWidth = size.key/2;
        this.ctx.strokeStyle = color.key;
        this.ctx.ellipse(center.x, center.y, Math.abs(radius.x), Math.abs(radius.y), Math.PI / 4, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawText({ position, content }, color, size) {
        this.ctx.beginPath();
        const textSize = Number(size.key) + 20;
        this.ctx.font = `${textSize}px verdana, sans-serif`;
        this.ctx.fillStyle = color.key;
        this.ctx.fillText(content, position.x, position.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

export default new CanvasContext();