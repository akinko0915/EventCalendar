import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth(); // getMonth() is zero-based
  const year = date.getFullYear();

  // Format: YYYY-MM-DD
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute}`;
}

export default function Events() {
  const events = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>Category: {event.category.name}</p>
            <h1>Title: {event.title.name}</h1>
            <p>Date: {formatDate(event.startAt)}</p>
            <p>Start at: {formatTime(event.startAt)}</p>
            <p>End at: {formatTime(event.endAt)}</p>
            <p>Place: {event.place}</p>
            <p>Target: {event.target}</p>
            <p>Maximum Participant: {event.maximumParticipant}人</p>
            <p>Fee: {event.fee}</p>
            <p>Description: {event.description}</p>
            <p>------------------------------------------------------------</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
