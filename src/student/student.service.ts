import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

type Student = {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
  weight: number;
  height: number;
  password: string ;
  classromId: number | null;
};

export const listStudents = async (): Promise<Student[]> => {
  return db.students.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
      password: true,
      classromId: true,
      Classrom: {
        select: {
          className: true,
        },
      },
    },
  });
};

export const getStudent = async (id: number): Promise<Student | null> => {
  return db.students.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
      password: true,
      classromId: true,
      Classrom: {
        select: {
          className: true,
        },
      },
    },
  });
};

export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const { name, lastName, email, age, weight, height, password, classromId } =
    student;

  return db.students.create({
    data: {
      name,
      lastName,
      age,
      email,
      weight,
      height,
      password,
      classromId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
      password: true,
      classromId: true,
      Classrom: {
        select: {
          className: true,
        },
      },
    },
  });
};

export const updateStudent = async (
  student: Omit<Student, "id">,
  id: number
): Promise<Student> => {
  const { name, lastName, email, age, weight, height, classromId } = student;
  return db.students.update({
    where: {
      id,
    },
    data: {
      name,
      lastName,
      age,
      email,
      weight,
      height,
      classromId,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
      password: true,
      classromId: true,
      Classrom: {
        select: {
          className: true,
        },
      },
    },
  });
};
export const deleteStudent = async (id: number): Promise<void> => {
  await db.students.delete({
    where: {
      id,
    },
  });
};

export const updatePassword = async (
  password: string,
  id: number
): Promise<Student> => {
  return db.students.update({
    where: {
      id,
    },
    data: {
      password,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
      password: true,
      classromId: true,
      Classrom: {
        select: {
          className: true,
        },
      },
    },
  });
};