import { Box, Text } from "@chakra-ui/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import EditForm from "./edit.form";
import { getCategory, updateCategory } from "~/models/category.server";
import {
  DataFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { db } from "~/db.server";
import { validationError } from "remix-validated-form";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (typeof params.categoryId !== "string") throw Error("invalid id");

  const category = await getCategory(params.categoryId);
  if (!category) throw Error("category not found");
  return json({ category });
};

export const validator = withZod(
  z.object({
    id: z.string().uuid(),
    name: z.string().min(1, { message: "category name is required" }),
    color: z.string().nullable(),
  })
);

export const action = async ({ request, params }: DataFunctionArgs) => {
  console.log("action");
  if (typeof params.categoryId !== "string") throw Error("invalid id");

  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { name, color } = data.data;

  try {
    await updateCategory(params.categoryId, { name, color });
    return redirect("/admin/categories");
  } catch (error) {
    console.error("Error updating category", error);
    return json(
      {
        title: "Error",
        details: "An error occurred while updating the category.",
      },
      { status: 500 }
    );
  } finally {
    db.$disconnect();
  }
};

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

function EditCategory() {
  const category = useLoaderData<CategoryEditProps>().category;

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
      <EditForm category={category} />
    </>
  );
}

export default EditCategory;
