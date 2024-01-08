import { db } from "~/db.server";

export async function getTitle(id: string) {
  return db.title.findUnique({ where: { id } });
}

export async function getTitles() {
  return db.title.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export async function createTitle(data: {
  categoryId: string;
  name: string;
  form_url: string;
}) {
  return db.title.create({ data });
}

export async function updateTitle(
  id: string,
  data: { category: string; name: string; form_url: string }
) {
  return db.user.update({ where: { id }, data });
}

// Delete a user
export async function deleteTitle(id: string) {
  return db.user.delete({ where: { id } });
}
