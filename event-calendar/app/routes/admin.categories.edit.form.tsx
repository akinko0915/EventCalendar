import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { FormAlert } from "~/components/form/FormAlert";
import { useActionData } from "@remix-run/react";
import { DataFunctionArgs, json, redirect } from "@remix-run/node";
import { updateCategory } from "~/models/category.server";
import { db } from "~/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

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

export const action = async ({ request, params }: DataFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "update") {
    console.log("action");
    if (typeof params.categoryId !== "string") throw Error("invalid id");

    const data = await validator.validate(formData);
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
  }
};

function EditForm({ category }: CategoryEditProps) {
  const data = useActionData<AlertProps>();

  return (
    <>
      <ValidatedForm
        validator={validator}
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

export default EditForm;
