import { Box, Text } from "@chakra-ui/react";
import type { DataFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { db } from "~/db.server";
import { getTitles } from "~/models/title.server";
import { getCategories } from "~/models/category.server";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { createEvent } from "~/models/event.server";
import AddForm from "./add.form";
import { createDate } from "prisma/events";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categories = await getCategories();
  const titles = await getTitles();
  return json({ categories, titles });
};

export const validator = withZod(
  z.object({
    categoryId: z.string().min(1, { message: "category id is required" }),
    titleId: z.string().min(1, { message: "title id is required" }),
    startAt: z
      .string()
      .datetime({ offset: true })
      .min(1, { message: "startAt is required" }),
    endAt: z
      .string()
      .datetime({ offset: true })
      .min(1, { message: "endAt is required" }),
    place: z.string().min(1, { message: "place is required" }),
    placeUrl: z.string().optional(),
    target: z.string().min(1, { message: "target is required" }),
    maximumParticipant: z.number().positive().int().optional(),
    fee: z
      .number({ invalid_type_error: "it should be number" })
      .positive()
      .min(1, { message: "fee is required" })
      .safe(),
    discount: z
      .number({ invalid_type_error: "it should be number" })
      .positive()
      .optional(),
    imageUrl: z.string().optional(),
    description: z.string().min(1, { message: "description is required" }),
  })
);

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);

  const {
    categoryId,
    titleId,
    startAt,
    endAt,
    place,
    placeUrl,
    target,
    maximumParticipant,
    fee,
    discount,
    imageUrl,
    description,
  } = data.data;

  try {
    const correctStartAt = createDate(startAt);
    const correctEndAt = createDate(endAt);

    await createEvent({
      categoryId,
      titleId,
      startAt: correctStartAt,
      endAt: correctEndAt,
      place,
      placeUrl,
      target,
      maximumParticipant,
      fee,
      discount,
      imageUrl,
      description,
    });

    return redirect("/admin/events");
  } catch (error) {
    console.log("Error creating event", error);

    return json(
      {
        title: "Error",
        details: "An error occurred while creating event",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
};

function Event() {
  const { categories, titles } = useLoaderData<typeof loader>();
  const additionalData = { categories, titles };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="0"
        w="100%"
        textColor="green"
        marginBottom={20}
      >
        <Text fontWeight="bolder" fontSize="40px">
          Add Event
        </Text>
      </Box>
      <AddForm additionalData={additionalData} />
    </>
  );
}

export default Event;
