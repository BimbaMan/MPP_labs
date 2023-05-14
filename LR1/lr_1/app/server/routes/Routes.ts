import core from "express-serve-static-core";
import { Response, Request } from "express";
import {
  getMainPage,
  saveNewTask,
  deleteTodo,
  changeTodoStatus,
  getCreateNewTodoPage,
} from "../controllers/Controller";
import path from "path";

export function routes(app: core.Express) {
  app.get("/", (request: Request, response: Response) => {
    const filterStatus = request.query.filterStatus;
    getMainPage(request, response, filterStatus);
  });

  app.get("/download", (request: Request, response: Response) => {
    const file = path.join(
      __dirname,
      "../uploads",
      "" + request.query.filePath
    );
    response.download(file);
  });

  app.get("/new", (request: Request, response: Response) => {
    getCreateNewTodoPage(request, response);
  });

  app.post("/save", (request: Request, response: Response) => {
    if (request.file?.originalname) {
      saveNewTask(request, "" + request.file?.originalname);
    } else {
      saveNewTask(request, "");
    }
    response.redirect("/");
  });

  app.get("/delete", (request: Request, response: Response) => {
    const id = request.query.id;
    deleteTodo(id);
    response.redirect("/");
  });

  app.get("/changeTodoStatus", (request: Request, response: Response) => {
    const id = request.query.id;
    const newStatus = request.query.status;

    changeTodoStatus(id, newStatus);
    response.redirect("/");
  });
}
