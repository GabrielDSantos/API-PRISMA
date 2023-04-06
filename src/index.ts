import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { studentRouter } from "./student/student.router";
import { subjectRouter } from "./subject/subject.router";
import { teacherRouter } from "./teacher/teacher.router";
import { classromRouter } from "./classrom/classrom.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/students", studentRouter);
app.use("/subjects", subjectRouter);
app.use("/teachers", teacherRouter);
app.use("/classrom", classromRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
