import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Grid,
  GridItem,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { deleteCategory, getCategory } from "~/models/category.server";

export const loader: LoaderFunction = async ({ params }) => {
  const categoryId = params.categoryId;
  if (typeof categoryId !== "string") {
    throw new Response("Invalid category ID", { status: 400 });
  }

  const category = await getCategory(categoryId);
  if (!category) {
    throw new Response("Category not found", { status: 404 });
  }

  return json({ category });
};

export const action: ActionFunction = async ({ params }) => {
  const categoryId = params.categoryId;
  if (typeof categoryId !== "string") {
    console.error("Invalid category ID:", categoryId);
    throw new Response("Invalid category ID", { status: 400 });
  }
  try {
    await deleteCategory(categoryId);
    return redirect("/admin/categories");
  } catch (error) {
    console.error("Failed to delete category:", error);
    return json({ error: "Failed to delete category" }, { status: 500 });
  }
};

const CategoryDeleteModal = () => {
  const navigate = useNavigate();
  const onClose = () => navigate("/admin/categories");

  const { category } = useLoaderData<typeof loader>();
  return (
    <>
      <Modal size="lg" isOpen={true} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} fontWeight={700} textColor="green">
            Delete Category
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4}>
              <GridItem>
                <Center>
                  <Text>Are you sure to delete {category.name}? </Text>
                </Center>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Form method="post">
              <MySubmitButton
                value="Delete"
                isSubmitting={false}
                onSubmit={() => {}}
                bg="red"
                _hover={{ bg: "red", textColor: "white" }}
              />
            </Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryDeleteModal;
