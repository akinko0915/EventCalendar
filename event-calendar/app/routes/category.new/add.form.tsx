import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { validator } from "./route";
import { FormAlert } from "~/components/form/FormAlert";
import { useActionData } from "@remix-run/react";

export type AlertProps = {
  variant: "info" | "warning" | "success" | "error";
  title: string;
  details: string;
};

export default function AddForm() {
  const data = useActionData<AlertProps>();

  return (
    <>
      <ValidatedForm validator={validator} method="post">
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
          <MySubmitButton value="create" />
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
