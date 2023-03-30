import { db } from "../utils/db.server";

type Student = {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
  weight: number;
  height: number;
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
    },
  });
};

export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const { name, lastName, email, age, weight, height } = student;
  return db.students.create({
    data: {
      name,
      lastName,
      age,
      email,
      weight,
      height,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
    },
  });
};

export const updateStudent = async (
  student: Omit<Student, "id">,
  id: number
): Promise<Student> => {
  const { name, lastName, email, age, weight, height } = student;
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
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      age: true,
      email: true,
      weight: true,
      height: true,
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
