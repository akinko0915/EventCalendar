import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { SelectGroup, Select } from "~/components/form/Select";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { validator } from "../admin.events";

interface AddFormProps {
  additionalData: {
    categories: { id: string; name: string }[];
    titles: { id: string; name: string }[];
  };
}

export default function AddForm({ additionalData }: AddFormProps) {
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [titleOptions, setTitleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const transformedCategories = additionalData.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    const transformedTitles = additionalData.titles.map((title) => ({
      value: title.id,
      label: title.name,
    }));

    setCategoryOptions(transformedCategories);
    setTitleOptions(transformedTitles);
  }, [additionalData]);
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
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
            w="1200px"
          >
            <GridItem rowSpan={1} colSpan={1} bg="none">
              <SelectGroup name="categoryId" label="category">
                <Select name="categoryId" options={categoryOptions} />
              </SelectGroup>

              <SelectGroup name="titleId" label="title">
                <Select name="titleId" options={titleOptions} />
              </SelectGroup>
              <FormInput
                name="startAt"
                label="Start at"
                type="datetime-local"
              />
              <FormInput name="endAt" label="End at" type="datetime-local" />
              <FormInput name="place" label="Place" />
              <FormInput name="placeUrl" label="placeUrl" />
            </GridItem>

            <GridItem rowSpan={1} colSpan={1} bg="none">
              <FormInput name="target" label="target" />
              <FormInput
                name="maximumParticipant"
                label="Maximum Participant"
                type="number"
              />
              <FormInput name="fee" label="fee" type="number" />
              <FormInput name="discount" label="discount" type="number" />
              <FormInput name="imageUrl" label="image Url" type="file" />
              <FormInput
                name="description"
                label="Description"
                type="textarea"
              />
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
          <MySubmitButton />
        </Box>
      </ValidatedForm>
    </>
  );
}
