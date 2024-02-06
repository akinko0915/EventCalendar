import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { validator, AlertProps } from "./admin.categories.$categoryId.edit";
import { FormAlert } from "~/components/form/FormAlert";
import { useActionData } from "@remix-run/react";
import type { CategoryEditProps } from "./admin.categories.$categoryId.edit";

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
