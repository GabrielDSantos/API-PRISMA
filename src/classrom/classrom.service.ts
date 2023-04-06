import { db } from "../utils/db.server";

type Classrom = {
  id: number;
  className: string;
};

export const listClassrom = async (): Promise<Classrom[]> => {
  return db.classrom.findMany({
    select: {
      id: true,
      className: true,
    },
  });
};

export const createClassrom = async (
  classrom: Omit<Classrom, "id">
): Promise<Classrom> => {
  const { className } = classrom;

  return db.classrom.create({
    data: {
      className,
    },
    select: {
      id: true,
      className: true,
    },
  });
};
