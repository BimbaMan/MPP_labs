import { routes } from "./routes/Routes";
import express, { Request } from "express";
import path from "path";
import multer from "multer";

const app = express();

const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 8088;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, __dirname + "/uploads/");
  },

  filename: (
    request: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single("uploaded_file");

app.use(upload);
app.use(express.json());
app.use(express.static(__dirname + "/views"));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

routes(app);

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(__dirname);
  console.log(`Listening on http://${SERVER_HOST}:${SERVER_PORT}`);
});
