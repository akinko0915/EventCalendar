import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";

export const eventsLoader = async ({ params }: LoaderFunctionArgs) => {
  return json(
    await db.event.findMany({
      where: {
        id: params.id,
        categoryId: params.categoryId,
        titleId: params.titleId,
      },
      include: {
        category: true,
        title: true,
      },
    })
  );
};
