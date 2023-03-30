import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { studentRouter } from "./student/student.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
