import { db } from "~/db.server";

export async function getEvent(id: string) {
  return db.event.findUnique({ where: { id } });
}

export async function getEvents(id: string) {
  return db.event.findMany();
}

export async function createEvent(data: {
  categoryId: string;
  titleId: string;
  startAt: Date;
  endAt: Date;
  place: string;
  placeUrl?: string;
  target: string;
  maximumParticipant?: number;
  fee: number;
  discount?: number;
  imageUrl?: string;
  description: string;
}) {
  return db.event.create({ data });
}

export async function updateEvent(
  id: string,
  data: {
    categoryId: string;
    titleId: string;
    startAt: number;
    endAt: number;
    place: string;
    placeUrl?: string;
    target: string;
    maximumParticipant?: number;
    fee: number;
    discount?: number;
    imageUrl?: string;
    description: string;
  }
) {
  return db.event.update({ where: { id }, data });
}

// Delete a Event
export async function deleteEvent(id: string) {
  return db.event.delete({ where: { id } });
}
