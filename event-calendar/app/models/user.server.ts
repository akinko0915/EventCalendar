import { db } from "~/db.server";

// Fetch a single user by ID
export async function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}

// Fetch all users
export async function getUsers() {
  return db.user.findMany();
}

// Create a new user
export async function createUser(data: {
  name: string;
  belonging?: string;
  sex?: string;
  email: string;
  password: string;
}) {
  return db.user.create({ data });
}

// Update a user
export async function updateUser(
  id: string,
  data: { email: string; name: string; belonging?: string; sex?: string }
) {
  return db.user.update({ where: { id }, data });
}

// Delete a user
export async function deleteUser(id: string) {
  return db.user.delete({ where: { id } });
}
