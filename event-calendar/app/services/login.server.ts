import { db } from "~/db.server";
import bcrypt from "bcryptjs";
import type { User } from "./auth.server";

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  // Find the user by email
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("not found");
  }

  // Return the user's ID if valid
  return user;
}
