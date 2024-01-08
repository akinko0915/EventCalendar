import { db } from "~/db.server";

export async function getCategory(id: string) {
  return db.category.findUnique({ where: { id } });
}

export async function getCategories() {
  return db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export async function createCategory(data: { name: string; color: string }) {
  return db.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: { name: string; color: string }
) {
  return db.category.update({ where: { id }, data });
}

// Delete a category
export async function deleteCategory(id: string) {
  return db.category.delete({ where: { id } });
}
