import { db } from "../utils/db.server";

type Subject = {
  id: number;
  name: string;
};

export const listSubjects = async (): Promise<Subject[]> => {
  return db.subject.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const createSubject = async (
  student: Omit<Subject, "id">
): Promise<Subject> => {
  const { name } = student;

  return db.subject.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};
