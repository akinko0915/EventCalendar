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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
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
      orderBy: {
        startAt: "desc",
      },
    })
  );
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
  const events = useLoaderData<typeof loader>();

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
            <Link to="/addevent">
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
