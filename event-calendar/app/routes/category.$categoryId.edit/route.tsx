import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { getCategory, updateCategory } from "~/models/category.server";
import {
  ActionFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { db } from "~/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { FormAlert } from "~/components/form/FormAlert";

export const validator = withZod(
  z.object({
    id: z.string().uuid(),
    name: z.string().min(1, { message: "category name is required" }),
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
  console.log("action");
  const categoryId = params.categoryId;
  const formData = await request.formData();

  if (typeof categoryId !== "string") throw Error("invalid id");

  const data = await validator.validate(formData);
  if (data.error) return validationError(data.error);
  const { name, color } = data.data;

  try {
    await updateCategory(categoryId, { name, color });
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("loader");
  const categoryId = params.categoryId;
  if (typeof categoryId !== "string") throw Error("invalid id");

  const category = await getCategory(categoryId);
  if (!category) throw Error("category not found");
  return json({ category });
};

function EditCategory() {
  const params = useParams();
  console.log("params", params);
  const { category } = useLoaderData<typeof loader>();
  console.log("category", category);
  const data = useActionData<AlertProps>();

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
      <ValidatedForm
        validator={validator}
        action="."
        method="post"
        defaultValues={{
          name: category.name,
          color: category.color,
          id: category.id,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0"
          w="100%"
        >
          <Grid templateColumns="repeat(1, 1fr)">
            <GridItem bg="none">
              <FormInput name="name" label="category name" />
            </GridItem>
            <GridItem bg="none">
              <FormInput name="color" label="color" />
            </GridItem>
            <input type="hidden" name="id" />
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
          <MySubmitButton value="update" />
          {data && (
            <FormAlert
              variant="info"
              title={data.title}
              details={data.details}
            />
          )}
        </Box>
      </ValidatedForm>
    </>
  );
}

export default EditCategory;
