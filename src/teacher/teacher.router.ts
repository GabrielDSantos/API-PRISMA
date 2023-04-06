import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import * as TeacherService from "./teacher.service";

export const teacherRouter = express.Router();

// GET: a list of all teachers

teacherRouter.get("/", async (request: Request, response: Response) => {
  try {
    const students = await TeacherService.listTeachers();
    return response.status(200).json(students);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST : Create a new teacher
// Params: name, lastName, email, password, subjectId

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

// DELETE : Delete an teacher based on the id
teacherRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await TeacherService.deleteTeacher(id);
    return response.status(204).json("Teacher has been succesfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET : a single teacher by Id

teacherRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const teacher = await TeacherService.getTeacher(id);
    if (teacher) {
      return response.status(200).json(teacher);
    }
    return response.status(404).json("Teacher could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

//Patch : Update an teacher

teacherRouter.patch(
  "/:id",
  body("name").isString().optional(),
  body("lastName").isString().optional(),
  body("email").isString().optional(),
  body("subjectId").isNumeric().optional(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const teacher = request.body;
      const updateTeacher = await TeacherService.updateTeacher(teacher, id);
      return response.status(200).json(updateTeacher);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// Patch : Update a teacher password

teacherRouter.patch(
  "/id/pass",
  body("CurrentPassword").isString(),
  body("newPassword").isString(),
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const { currentPassword, newPassword } = request.body;
    try {
      const teacher = await TeacherService.getTeacher(id);
      if (bcrypt.compareSync(currentPassword, teacher!.password)) {
        const newHash = await bcrypt.hash(newPassword, 8);
        const updatedTeacher = await TeacherService.updatePassword(newHash, id);
        return response.status(200).json(updatedTeacher);
      } else {
        throw new Error("Invalid password.");
      }
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
