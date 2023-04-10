import { db } from "../utils/db.server";

type Classrom = {
  id: number;
  className: string;
  teacherId? : number
};

export const listClassrom = async (): Promise<Classrom[]> => {
  return db.classrom.findMany({
    select: {
      id: true,
      className: true,
      students: {
        select:{
          name: true,
          lastName : true
        }
      },
      teachers:{
        select:{
          name:  true,
          subject:{
            select :{
              id: true,
              name: true,
            }
          }
        }
      }
    },
  });
};

export const createClassrom = async (
  classrom: Omit<Classrom, "id">
): Promise<Classrom> => {
  const { className, teacherId } = classrom;

  return db.classrom.create({
    data: {
      className,
      teachers: {
        connect: {id : teacherId}
      }
    },

    select: {
      id: true,
      className: true,
      teachers: true,
    },
  });
};
