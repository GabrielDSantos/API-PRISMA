import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import * as TeacherService from "./teacher.service";

export const teacherRouter = express.Router();

teacherRouter.get("/", async (request: Request, response: Response) => {
  try {
    const students = await TeacherService.listTeachers();
    return response.status(200).json(students);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

teacherRouter.post(
  "/",
  body("name").isString(),
  body("lastName").isString(),
  body("email").isString(),
  body("password").isString(),
  body("subjectId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      var teacherPassword = await bcrypt.hash(request.body.password, 8);
      const teacher = {
        name: request.body.name,
        lastName: request.body.lastName,
        email: request.body.email,
        subjectId: request.body.subjectId,
        password: teacherPassword,
      };
      const newTeacher = await TeacherService.createTeacher(teacher);
      return response.status(201).json(newTeacher);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

teacherRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      await TeacherService.deleteTeacher(id);
      return response.status(204).json("Teacher has been succesfully deleted");
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  });