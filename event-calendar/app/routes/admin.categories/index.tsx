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
import CategoryDeleteModal from "./$categoryId.delete";
import { useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Loader: Fetching categories", params);
  const categories = await db.category.findMany({
    where: {
      id: params.id,
    },
  });
  console.log("Loader: Categories fetched", categories);
  return json({ categories: categories || [] });
};

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Category() {
  const { categories = [] } = useLoaderData<typeof loader>();
  console.log("Category Component: Loaded categories", categories);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  console.log("Category Component: isDeleteModalOpen", isDeleteModalOpen);

  const handleDeleteClick = (categoryId: string) => {
    console.log("Delete button clicked for category ID:", categoryId);
    setIsDeleteModalOpen(true);
  };

  categories.forEach(category => console.log(`Rendering edit link for category ID: ${category.id}`));

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
              <Link to="/category/new">
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
                            <Link to={`/category/${category.id}/edit`}>
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
                                onClick={() => handleDeleteClick(category.id)}
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