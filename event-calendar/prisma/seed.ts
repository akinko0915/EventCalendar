import { categories } from "./categories.js";
import { titles } from "./titles.js";
import { users } from "./users.js";
import { events } from "./events.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // usersのseed入れる
  // await prisma.user.deleteMany({});
  for (let user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
  console.log({ users });

  // await prisma.category.deleteMany({});
  for (let category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }
  console.log({ categories });

  // await prisma.title.deleteMany({});
  for (let title of titles) {
    await prisma.title.upsert({
      where: { id: title.id },
      update: title,
      create: title,
    });
  }
  console.log({ titles });

  for (let event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: event,
      create: event,
    });
  }
  console.log({ events });
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
