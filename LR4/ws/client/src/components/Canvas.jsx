import { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const nicknameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.nickname) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            nickname: canvasState.nickname,
            method: "connection",
          })
        );
      };
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection": {
            console.log(`user  ${msg.nickname} connected`);
            break;
          }
          case "draw": {
            drawHandler(msg);
            break;
          }
          default:
            break;
        }
      };
    }
  }, [canvasState.nickname]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush": {
        Brush.draw(ctx, figure.x, figure.y, figure.stroke);
        break;
      }
      case "rect": {
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.stroke
        );
        break;
      }
      case "circle": {
        Circle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.r,
          figure.color,
          figure.stroke
        );
        break;
      }
      case "eraser": {
        Eraser.draw(ctx, figure.x, figure.y, 'white');
        break;
      }
      case "line": {
        Line.draw(
          ctx,
          figure.toX,
          figure.toY,
          figure.x,
          figure.Y,
          figure.stroke
        );
        break;
      }
      case "finish": {
        ctx.beginPath();
        break;
      }
      default:
        break;
    }
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectHandler = () => {
    canvasState.setNickname(nicknameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Type your nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            style={{ width: "50%", marginLeft: "25%" }}
            ref={nicknameRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              connectHandler();
            }}
          >
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});

export default Canvas;
