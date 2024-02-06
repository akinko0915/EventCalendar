import { Text, Box } from "@chakra-ui/react";
import { validationError } from "remix-validated-form";
import { createCategory } from "~/models/category.server";
import { DataFunctionArgs, json, redirect } from "@remix-run/node";
import { db } from "~/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import AddForm from "./add.form";

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: "category name is required" }),
    color: z.string().nullable(),
  })
);

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create") {
    // Your code for handling the "create" action goes here
    const data = await validator.validate(formData);
    if (data.error) return validationError(data.error);
    const { name, color } = data.data;

    try {
      await createCategory({
        name,
        color,
      });

      return redirect("/admin/categories");
    } catch (error) {
      console.error("Error creating category", error);

      return json(
        {
          title: "Error",
          details: "An error occurred while creating the category.",
        },
        { status: 500 }
      );
    } finally {
      await db.$disconnect();
    }
  }

  // Your code for handling other actions goes here
};

function addCategory() {
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
          Add Category
        </Text>
      </Box>
      <AddForm />
    </>
  );
}

export default addCategory;
