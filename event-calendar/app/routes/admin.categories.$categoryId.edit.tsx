import { Box, Text } from "@chakra-ui/react";
import EditForm from "./admin.categories.edit.form";
import { getCategory } from "~/models/category.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (typeof params.categoryId !== "string") throw Error("invalid id");

  const category = await getCategory(params.categoryId);
  if (!category) throw Error("category not found");
  return json({ category });
};

function EditCategory() {
  const category = useLoaderData<typeof loader>().category;

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
