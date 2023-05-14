import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            //this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'line',
                    toX: e.pageX - e.target.offsetLeft,
                    toY: e.pageY - e.target.offsetTop,
                    x: this.currentX,
                    y: this.currentY,
                    stroke: this.ctx.strokeStyle,
                }
            }))
        }
    }


    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }.bind(this)

    }

    static draw(ctx, toX, toY, x, y, stroke) {
        ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}