import {ActionFunction, json, LoaderFunction, redirect} from "@remix-run/node";
import {withZod} from "@remix-validated-form/with-zod";
import {z} from "zod";
import {validationError} from "remix-validated-form";
import {getCategory, updateCategory} from "~/models/category.server";
import {Form, useLoaderData} from "@remix-run/react";
import {Box, Button, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import { Text } from '@chakra-ui/react';

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
        return redirect("/admin/categories");
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
        <Box textAlign="center" p={5}>
            <Text fontWeight="bold" fontSize="2xl" mb={4}>Edit Category</Text>
            <Form method="post">
                <FormControl id="name">
                    <FormLabel>Category Name</FormLabel>
                    <Input name="name" defaultValue={category.name} />
                </FormControl>
                <FormControl mt={4} id="color">
                    <FormLabel>Color</FormLabel>
                    <Input name="color" defaultValue={category.color} />
                </FormControl>
                <input type="hidden" name="id" value={category.id} />
                <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
            </Form>
        </Box>
    );
}