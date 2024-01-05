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
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json(
    await db.title.findMany({
      where: {
        id: params.id,
      },
      include: {
        category: true,
      },
    })
  );
};

const TableStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};
function Title() {
  const titles = useLoaderData<typeof loader>();
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
            <TableContainer width="1100px">
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
