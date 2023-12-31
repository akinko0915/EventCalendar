import { useLoaderData } from "@remix-run/react";
import React from "react";
import CalendarMain from "./Calendar.main";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
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

export default function Calendar() {
  const events = useLoaderData<typeof loader>();
  return <CalendarMain events={events} />;
}
