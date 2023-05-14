import { Response, Request } from "express";
import { Todo, TodoStatus } from "../models/Todo";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const todosData = "todos.json";

function getTodos(): Todo[] {
  let data: string = "";
  let todos: Todo[] = [];
  try {
    data = fs.readFileSync(todosData, "utf8");
    todos = JSON.parse(data);
  } catch (error) {
    console.error(error);
    fs.writeFileSync(todosData, "[]");
    todos = [];
  }
  return todos;
}

function rewriteTodos(todos: Todo[]) {
  fs.writeFileSync(todosData, JSON.stringify(todos));
}

export function getMainPage(
  request: Request,
  response: Response,
  filterStatus: any
) {
  const todos: Todo[] = getTodos();
  if (!filterStatus) {
    response.render("mainPage", {
      todos: todos,
    });
  } else {
    const filteredTodos: Todo[] = todos.filter(
      (todo) => todo.status === "" + filterStatus
    );
    response.render("mainPage", {
      todos: filteredTodos,
    });
  }
}

export function getCreateNewTodoPage(request: Request, response: Response) {
  response.render("createNewTodoPage");
}

export function saveNewTask(request: Request, attachedFilePath: string) {
  const newTodo: Todo = {
    id: uuidv4(),
    title: request.body.title,
    content: request.body.content,
    status: "Pending",
    date: request.body.date,
    file: attachedFilePath,
  };
  console.log(newTodo);

  const todos: Todo[] = getTodos();
  todos.push(newTodo);
  rewriteTodos(todos);
}

export function deleteTodo(id: any) {
  const todos: Todo[] = getTodos();

  const attachedfile = todos.find((todo) => todo.id === id);
  if (attachedfile?.file !== "") {
    const fileToDeletePath = path.join(
      __dirname,
      "../uploads",
      "" + attachedfile?.file
    );
    fs.unlink(fileToDeletePath, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("Deleted file " + fileToDeletePath);
      }
    });
  }

  const filteredTodos: Todo[] = todos.filter((todo) => todo.id !== id);
  rewriteTodos(filteredTodos);
}

export function changeTodoStatus(id: any, newStatus: any) {
  const todos: Todo[] = getTodos();
  const changedTodos: Todo[] = todos.map((todo) => {
    if (todo.id === id) {
      todo.status = newStatus;
    }
    return todo;
  });
  rewriteTodos(changedTodos);
}
