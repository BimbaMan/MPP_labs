import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "eraser",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            stroke: this.ctx.strokeStyle,
          },
        })
      );
    }
  }

  static draw(ctx, x, y, stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
