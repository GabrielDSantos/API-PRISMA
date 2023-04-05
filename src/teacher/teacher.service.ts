import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

type Teacher = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  subjectId: number | null;
};

export const listTeachers = async (): Promise<Teacher[]> => {
  return db.teacher.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      password: true,
      subjectId: true,
    },
  });
};

export const createTeacher = async (
    teacher: Omit<Teacher, "id">
  ): Promise<Teacher> => {
    const { name, lastName, email, password, subjectId } = teacher;
  
    return db.teacher.create({
      data: {
        name,
        lastName,
        email,
        password,
        subjectId,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        password: true,
        subjectId: true,
      },
    });
  }; 

export const deleteTeacher = async (id: number): Promise<void> => {
    await db.teacher.delete({
      where: {
        id,
      },
    });
  };