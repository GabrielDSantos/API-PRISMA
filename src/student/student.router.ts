import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as StudentService from "./student.service";

export const studentRouter = express.Router();

// GET: a list of all students
studentRouter.get("/", async (request: Request, response: Response) => {
  try {
    const students = await StudentService.listStudents();
    return response.status(200).json(students);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: a single student by ID
studentRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const student = await StudentService.getStudent(id);
    if (student) {
      return response.status(200).json(student);
    }
    return response.status(404).json("Student could not be found");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST : Create a new student
// Params: name, lastName, age, email, weight, height
studentRouter.post(
  "/",
  body("name").isString(),
  body("lastName").isString(),
  body("age").isNumeric(),
  body("email").isString(),
  body("weight").isFloat(),
  body("height").isFloat(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const student = request.body;
      const newStudent = await StudentService.createStudent(student);
      return response.status(201).json(newStudent);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
// PUT : Update an student
// Params: name, lastName, age, email, weight, height
studentRouter.put(
  "/:id",
  body("name").isString(),
  body("lastName").isString(),
  body("age").isNumeric(),
  body("email").isString(),
  body("weight").isFloat(),
  body("height").isFloat(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const student = request.body;
      const updateStudent = await StudentService.updateStudent(student, id);
      return response.status(200).json(updateStudent);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE : Delete an student based on the id
studentRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await StudentService.deleteStudent(id);
    return response.status(204).json("Student has been succesfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
