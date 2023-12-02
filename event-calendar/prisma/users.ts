import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const saltRounds = 10;
const password = "password";
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(password, salt);

export const users = [
  {
    id: "1",
    name: "EnMoveいべんと",
    email: "enmove_event@gmail.com",
    role: Role.ADMIN,
    password: hashedPassword,
  },
  {
    id: "2",
    name: "Aki",
    email: "aki@gmail.com",
    password: hashedPassword,
  },
];
