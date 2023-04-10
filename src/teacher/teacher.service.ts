import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

type Teacher = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  subjectId: number;
  classromId? : number[]
};

export const listTeachers = async (): Promise<Teacher[]> => {
  return db.teacher.findMany({
    include:{
      subject: true,
      classroms: true,
    }
  });
};

export const createTeacher = async (
    teacher: Omit<Teacher, "id">
  ): Promise<Teacher> => {
    const { name, lastName, email, password, subjectId, classromId } = teacher;
    const classromListCreator = classromId!.map((classromId) => {return {id : classromId}})
  
  
     return db.teacher.create({
      data: {
        name,
        lastName,
        email,
        password,
      classroms:{
        connect: classromListCreator
      },
      subject:{
        connect:{id: subjectId}
      }
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


  export const getTeacher = async (id: number): Promise<Teacher | null> => {
    return db.teacher.findUnique({
      where: {
        id,
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


  export const updateTeacher = async (
    teacher: Omit<Teacher, "id">,
    id: number
  ): Promise<Teacher> => {
    const { name, lastName, email, subjectId } = teacher;
    return db.teacher.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
        email,
        subjectId
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        password: true,
        subjectId: true
      },
    });
  };

  export const updatePassword = async (
    password: string,
    id: number
  ): Promise<Teacher> => {
    return db.teacher.update({
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
        email: true,
        password: true,
        subjectId: true,
      },
    });
  };
  
