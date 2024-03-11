import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { getCategory, updateCategory } from "~/models/category.server";
import { useLoaderData } from "@remix-run/react";
import {
  Box,
  FormControl,
  Grid,
  GridItem,
  Text,
  Input,
} from "@chakra-ui/react";
import { MySubmitButton } from "~/components/form/SubmitButton";

export const validator = withZod(
  z.object({
    id: z.string().min(1, "ID is required"), // Validates that the ID is a non-empty string
    name: z.string().min(1, { message: "Category name is required" }),
    color: z.string().nullable(),
  })
);

export const action: ActionFunction = async ({ request, params }) => {
  const categoryId = params.categoryId;
  if (typeof categoryId !== "string") {
    console.error("Invalid category ID:", categoryId);
    throw new Response("Invalid category ID", { status: 400 });
  }

  const result = await validator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const { name, color } = result.data;
  try {
    await updateCategory(categoryId, { name, color });
    return redirect("/admin/categories/1");
  } catch (error) {
    console.error("Failed to update category:", error);
    return json({ error: "Failed to update category" }, { status: 500 });
  }
};

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

export default function EditCategory() {
  const { category } = useLoaderData<typeof loader>();

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
        <Text fontWeight="bold" fontSize="40px">
          Edit Category
        </Text>
      </Box>
      <ValidatedForm method="post" validator={validator}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0"
          w="100%"
        >
          <Grid templateColumns="repeat(1, 1fr)">
            <GridItem bg="none">
              <FormControl id="name">
                <Input name="name" bg="white" defaultValue={category.name} />
              </FormControl>
            </GridItem>
            <GridItem bg="none">
              <FormControl mt={4} id="color">
                <Input name="color" bg="white" defaultValue={category.color} />
              </FormControl>
              <input type="hidden" name="id" value={category.id} />
            </GridItem>
          </Grid>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0"
          w="100%"
          marginBottom={10}
        >
          <MySubmitButton
            value="Update"
            bg="brand.200"
            _hover={{ bg: "white", textColor: "brand.200" }}
            isSubmitting={false}
            onSubmit={() => {}}
          />
        </Box>
      </ValidatedForm>
    </>
  );
}
