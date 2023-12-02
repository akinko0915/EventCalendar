import { categories } from "./categories";
import { titles } from "./titles";
import { users } from "./users";
import { events } from "./events";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // usersのseed入れる
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  console.log({ categories });

  for (let category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log({ categories });

  for (let title of titles) {
    await prisma.title.create({
      data: title,
    });
  }
  console.log({ titles });

  for (let event of events) {
    await prisma.event.create({
      data: event,
    });
  }
}

// eventsのseed入れる
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
