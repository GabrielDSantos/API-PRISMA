import express, { response } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as ClassroomService from "./classrom.service";
export const classromRouter = express.Router();

// Get :  List all classroms  

classromRouter.get("/", async (request: Request, response: Response) => {
    try {
        const classrom = await ClassroomService.listClassrom();
        return response.status(200).json(classrom);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

//Post : Create a new classrom

classromRouter.post(
    "/",
    body("className").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors : errors.array() });
    }
    try {
        const classrom = request.body;
        const newClassrom = await ClassroomService.createClassrom(classrom);
        return response.status(201).json(newClassrom);
    } catch (error : any) {
        return response.status(500).json(error.message);
    }
  }
);

