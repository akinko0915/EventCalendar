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
import CategoryDeleteModal from "./admin.categories.$categoryId.delete.";
import { useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categories = await db.category.findMany({
    where: {
      id: params.id,
    },
  });
  return json({ categories: categories || [] });
};

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Category() {
  const { categories = [] } = useLoaderData<typeof loader>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
            <Link to="new">
              <Button
                bg="green"
                color="white"
                _hover={{ bg: "white", color: "green" }}
              >
                Add Category
              </Button>
            </Link>
          </GridItem>
          <GridItem>
            <TableContainer width="1100px">
              <Table variant="simple" bg="white" borderColor="brand.200">
                <Thead bg="brand.200" textColor="white">
                  <Tr>
                    <Th style={TableStyle}>Id</Th>
                    <Th style={TableStyle}>Name</Th>
                    <Th style={TableStyle}>Color</Th>
                    <Th style={TableStyle}>Operation</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories.map((category) => (
                    <Tr key={category.id}>
                      <Td>{category.id}</Td>
                      <Td>{category.name}</Td>
                      <Td>{category.color}</Td>
                      <Td>
                        <Link to={`${category.id}/edit`}>
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

                        <Button
                          marginRight={10}
                          bg="white"
                          color="red"
                          _hover={{ color: "white", bg: "red" }}
                          onClick={() => setIsDeleteModalOpen(true)}
                          width="30px"
                        >
                          <FontAwesomeIcon fontSize="30px" icon={faTrash} />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
        <CategoryDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Box>
    </>
  );
}

export default Category;
