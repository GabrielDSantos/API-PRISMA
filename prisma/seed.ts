import { db } from "../src/utils/db.server";

type Student = {
  name: string;
  lastName: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  password: string;
};

async function seed() {
  await Promise.all(
    getStudent().map((student) => {
      return db.students.create({
        data: {
          name: student.name,
          lastName: student.lastName,
          email: student.email,
          age: student.age,
          weight: student.weight,
          height: student.height,
          password: student.password,
        },
      });
    })
  );
  const student = await db.students.findFirst({
    where: {
      name: "Yan",
    },
  });
}
seed();
function getStudent(): Array<Student> {
  return [
    {
      name: "Yan",
      lastName: "Oliveira",
      email: "test@gmail.com",
      age: 18,
      weight: 60.9,
      height: 1.6,
      password: "test",
    },
    {
      name: "Gabriel",
      lastName: "Santos",
      email: "gabrielhenrique022@gmail.com",
      age: 19,
      weight: 70.0,
      height: 1.81,
      password: "test",
    },
    {
      name: "Kevin",
      lastName: "Simas",
      email: "pacogamer101@gmail.com",
      age: 19,
      weight: 63.9,
      height: 1.7,
      password: "test",
    },
  ];
}
