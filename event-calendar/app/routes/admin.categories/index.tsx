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
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import CategoryAddModal from "./CategoryAdd.modal";
import CategoryEditModal from "./CategoryEdit.modal";
import CategoryDeleteModal from "./CategoryDelete.modal";
import { useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json(
    await db.category.findMany({
      where: {
        id: params.id,
      },
    })
  );
};

export const validator = withZod(
  z.object({
    id: z.string().uuid(),
    name: z.string().min(1, { message: "category name is required" }),
    color: z.string().nullable(),
  })
);

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Category() {
  const categories = useLoaderData<typeof loader>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<{
    id: string;
    name: string;
    color: string | null;
  }>({
    id: "",
    name: "",
    color: null, // Initialized as null
  });

  const openEditModal = (category: {
    id: string;
    name: string;
    color: string | null;
  }) => {
    setEditCategoryData(category);
    setIsEditModalOpen(true);
  };

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
            <Button
              bg="green"
              color="white"
              _hover={{ bg: "white", color: "green" }}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Category
            </Button>
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
                        <Button
                          onClick={() => openEditModal(category)}
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
        <CategoryAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        <CategoryEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          id={editCategoryData.id}
          name={editCategoryData.name}
          color={editCategoryData.color}
        />
        <CategoryDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Box>
    </>
  );
}

export default Category;
