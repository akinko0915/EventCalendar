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
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Loader: Fetching categories", params);
  const page = parseInt(params.page ?? "", 10) || 1;
  const rowsPerPage = 8;
  const offset = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;

  const [categories, totalCategories] = await Promise.all([
    db.category.findMany({
      skip: offset,
      take: limit,
    }),
    db.category.count(),
  ]);

  const totalPages = Math.ceil(totalCategories / rowsPerPage);

  console.log("Loader: Categories fetched", categories);
  return json({ categories: categories || [], currentPage: page, totalPages });
};

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Category() {
  const {
    categories = [],
    currentPage,
    totalPages,
  } = useLoaderData<typeof loader>();
  console.log("Category Component: Loaded categories", categories);

  categories.forEach((category) =>
    console.log(`Rendering edit link for category ID: ${category.id}`)
  );

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
                        <Link to={`/category/${category.id}/delete`}>
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
                        <Outlet />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </GridItem>
          <GridItem>
            <HStack mt={4} spacing={4} justifyContent="center">
              {currentPage > 1 && (
                <Link to={`/admin/categories/${currentPage - 1}`}>
                  <Button
                    bg="brand.200"
                    color="white"
                    _hover={{ bg: "white", color: "brand.200" }}
                  >
                    Previous
                  </Button>
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <ChakraLink
                  key={index}
                  as={Link}
                  to={`/admin/categories/${index + 1}`}
                >
                  <Button
                    variant={currentPage === index + 1 ? "solid" : "ghost"}
                    bg={currentPage === index + 1 ? "white" : "brand.200"}
                    color={currentPage === index + 1 ? "brand.200" : "white"}
                  >
                    {index + 1}
                  </Button>
                </ChakraLink>
              ))}
              {currentPage < totalPages && (
                <Link to={`/admin/categories/${currentPage + 1}`}>
                  <Button
                    bg="brand.200"
                    color="white"
                    _hover={{ bg: "white", color: "brand.200" }}
                  >
                    Next
                  </Button>
                </Link>
              )}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Category;
