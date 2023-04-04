import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as SubjectService from "./subject.service";
export const subjectRouter = express.Router();

subjectRouter.get("/", async (request: Request, response: Response) => {
  try {
    const subject = await SubjectService.listSubjects();
    return response.status(200).json(subject);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

subjectRouter.post(
  "/",
  body("name").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const subject = request.body;
      const newSubject = await SubjectService.createSubject(subject);
      return response.status(201).json(newSubject);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
