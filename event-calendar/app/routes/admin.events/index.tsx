import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import type { DataFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { db } from "~/db.server";
import { getTitles } from "~/models/title.server";
import { getCategories } from "~/models/category.server";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { createEvent } from "~/models/event.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const events = await db.event.findMany({
    where: {
      id: params.id,
      categoryId: params.categoryId,
      titleId: params.titleId,
    },
    include: {
      category: true,
      title: true,
    },
    orderBy: {
      startAt: "desc",
    },
  });

  const categories = await getCategories();
  const titles = await getTitles();
  return json({ events, categories, titles });
};

export const validator = withZod(
  z.object({
    categoryId: z.string().min(1, { message: "category id is required" }),
    titleId: z.string().min(1, { message: "title id is required" }),
    startAt: z.date().refine((date) => date >= new Date(), {
      message: "Start date must be in the future",
    }),
    endAt: z.date().refine((date) => date >= new Date(), {
      message: "End date must be in the future",
    }),
    place: z.string().min(1, { message: "place is required" }),
    placeUrl: z.string().optional(),
    target: z.string().min(1, { message: "target is required" }),
    maximumParticipant: z.number().optional(),
    fee: z.number().min(1, { message: "fee is required" }),
    discount: z.number().optional(),
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
    await createEvent({
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
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;
}

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Event() {
  const { events, categories, titles } = useLoaderData<typeof loader>();
  const additionalData = { categories, titles };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="0"
        w="100%"
      >
        <Grid>
          <GridItem marginBottom={10}>
            <Link to="/addevent" state={additionalData}>
              <Button
                bg="green"
                color="white"
                _hover={{ bg: "white", color: "green" }}
              >
                Add Event
              </Button>
            </Link>
          </GridItem>
          <GridItem>
            <TableContainer width="1100px">
              <Table variant="simple" bg="white" borderColor="brand.200">
                <Thead bg="brand.200" textColor="white">
                  <Tr>
                    <Th style={TableStyle}>Id</Th>
                    <Th style={TableStyle}>Date</Th>
                    <Th style={TableStyle}>Title</Th>
                    <Th style={TableStyle}>Place</Th>
                    <Th style={TableStyle}>Operation</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events.map((event) => (
                    <Tr key={event.id}>
                      <Td>{event.id}</Td>
                      <Td> {formatDate(event.startAt)}</Td>
                      <Td>{event.title.name}</Td>
                      <Td>{event.place}</Td>
                      <Td>
                        <Link to="/editevent">
                          <Button
                            marginRight={10}
                            bg="white"
                            color="blue"
                            _hover={{ color: "white", bg: "blue" }}
                            width="30px"
                          >
                            <FontAwesomeIcon
                              fontSize="30px"
                              icon={faPenToSquare}
                            />
                          </Button>
                        </Link>
                        <Link to="/">
                          <Button
                            marginRight={10}
                            bg="white"
                            color="red"
                            _hover={{ color: "white", bg: "red" }}
                            width="30px"
                          >
                            <FontAwesomeIcon fontSize="30px" icon={faTrash} />
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Event;
