import {Box, Button, FormLabel, Grid, GridItem, Input, Text} from "@chakra-ui/react";
import { getCategory, updateCategory } from "~/models/category.server";
import {
  ActionFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {Form, useLoaderData, useParams} from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { db } from "~/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const validator = withZod(
    z.object({
      id: z.string().min(1, "ID is required"), // Validates that the ID is a non-empty string
      name: z.string().min(1, { message: "Category name is required" }),
      color: z.string().nullable(),
    })
);

export type AlertProps = {
  variant: "info" | "warning" | "success" | "error";
  title: string;
  details: string;
};

export type CategoryEditProps = {
  category: {
    id: string;
    name: string;
    color: string | null;
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log("Action function called with params:", params);

  try {
    const categoryId = params.categoryId;
    console.log(`Processing update for Category ID: ${categoryId}`);

    const formData = await request.formData();
    console.log("Form Data:", Object.fromEntries(formData));

    if (typeof categoryId !== "string") {
      console.log("Invalid ID type, received:", typeof categoryId);
      throw Error("Invalid ID");
    }

    const data = await validator.validate(formData);
    console.log("Validation result:", data);
    if (data.error) {
      console.log("Validation error:", data.error);
      return validationError(data.error);
    }

    const { name, color } = data.data;
    console.log(`Updating category with ID: ${categoryId} with data:`, { name, color });
    await updateCategory(categoryId, { name, color });
    console.log("Category updated successfully, redirecting to /admin/categories");
    return redirect("/admin/categories");
  } catch (error) {
    console.error("Error in action function while updating category:", error);
    return json({
      title: "Error",
      details: "An error occurred while updating the category.",
    }, { status: 500 });
  } finally {
    console.log("Disconnecting database connection");
    db.$disconnect();
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("loader");
  const categoryId = params.categoryId;
  if (typeof categoryId !== "string") throw Error("invalid id");

  const category = await getCategory(categoryId);
  if (!category) throw Error("category not found");
  return json({ category });
};

function EditCategory() {
  const { category } = useLoaderData<typeof loader>();

  console.log("Category loaded:", category);

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
          <Text fontWeight="bolder" fontSize="40px">
            Edit Category
          </Text>
        </Box>
        <Form method="post" action=".">
          <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="0"
              w="100%"
          >
            <Grid templateColumns="repeat(1, 1fr)">
              <GridItem bg="none">
                {/* Name Input */}
                <div>
                  <FormLabel htmlFor="name" marginBottom={10}>
                    Category Name
                  </FormLabel>
                  <Input
                      id="name"
                      name="name"
                      defaultValue={category.name}
                      bg="white"
                  />
                </div>
              </GridItem>
              <GridItem bg="none">
                {/* Color Input */}
                <div>
                  <FormLabel htmlFor="color" marginBottom={10}>
                    Color
                  </FormLabel>
                  <Input
                      id="color"
                      name="color"
                      defaultValue={category.color}
                      bg="white"
                  />
                </div>
              </GridItem>
              {/* Hidden ID Input */}
              <input type="hidden" name="id" value={category.id} />
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
            {/* Submit Button */}
            <Button
                type="submit"
                bg="brand.200"
                textColor="white"
                _hover={{ bg: "white", textColor: "brand.200" }}
                marginTop={10}
            >
              Submit
            </Button>
          </Box>
        </Form>
      </>
  );
}

export default EditCategory;