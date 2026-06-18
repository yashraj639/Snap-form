import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middleware/error-handler";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;