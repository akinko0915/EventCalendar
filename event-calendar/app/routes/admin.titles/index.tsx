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
import TitleAddModal from "./TitleAdd.modal";
import TitleEditModal from "./TitleEdit.modal";
import TitleDeleteModal from "./TitleDelete.modal";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { DataFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { validationError } from "remix-validated-form";
import { createTitle } from "~/models/title.server";
import { getCategories } from "~/models/category.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const titles = await db.title.findMany({
    where: {
      id: params.id,
    },
    include: {
      category: true,
    },
  });

  const categories = await getCategories();

  return json({ titles, categories });
};

export const validator = withZod(
  z.object({
    categoryId: z.string().min(1, { message: "category id is required" }),
    name: z.string().min(1, { message: "name is required" }),
    form_url: z.string().optional(),
  })
);

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { categoryId, name, form_url } = data.data;

  try {
    const newTitle = await createTitle({
      categoryId,
      name,
      form_url,
    });

    return json({
      title: `${newTitle.name} is created`,
      details: `the category is ${newTitle.categoryId}. FormURL is ${newTitle.form_url}`,
    });
  } catch (error) {
    console.log("Error creating title", error);

    return json(
      {
        title: "Error",
        details: "An error occurred while creating title",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
};

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

function Title() {
  const { titles, categories } = useLoaderData<typeof loader>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
            <Button
              bg="green"
              color="white"
              _hover={{ bg: "white", color: "green" }}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Title
            </Button>
          </GridItem>
          <GridItem>
            <TableContainer width="1300px">
              <Table variant="simple" bg="white" borderColor="brand.200">
                <Thead bg="brand.200" textColor="white">
                  <Tr>
                    <Th style={TableStyle}>Id</Th>
                    <Th style={TableStyle}>Category</Th>
                    <Th style={TableStyle}>Name</Th>
                    <Th style={TableStyle}>Form_URL</Th>
                    <Th style={TableStyle}>Operation</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {titles.map((title) => (
                    <Tr key={title.id}>
                      <Td>{title.id}</Td>
                      <Td>{title.category.name}</Td>
                      <Td>{title.name}</Td>
                      <Td>{title.form_url}</Td>
                      <Td>
                        <Button
                          marginRight={10}
                          bg="white"
                          color="blue"
                          _hover={{ color: "white", bg: "blue" }}
                          width="30px"
                          onClick={() => setIsEditModalOpen(true)}
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
                          width="30px"
                          onClick={() => setIsDeleteModalOpen(true)}
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
        <TitleAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          categories={categories}
        />
        <TitleEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
        <TitleDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Box>
    </>
  );
}

export default Title;
