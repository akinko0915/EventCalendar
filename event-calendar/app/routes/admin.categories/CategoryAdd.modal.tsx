import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { useActionData } from "@remix-run/react";
import { FormAlert } from "~/components/form/FormAlert";
import { validator } from "./index";
import { createCategory } from "~/models/category.server";
import { db } from "~/db.server";
import { DataFunctionArgs, json } from "@remix-run/node";

interface CategoryAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AlertProps = {
  variant: "info" | "warning" | "success" | "error";
  title: string;
  details: string;
};

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { name, color } = data.data;

  try {
    const newCategory = await createCategory({
      name,
      color,
    });

    return json({
      title: `${newCategory.name} is created`,
      details: `the color of the category is ${newCategory.color}`,
    });
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
};

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({
  isOpen,
  onClose,
}) => {
  const data = useActionData<AlertProps>();

  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ValidatedForm validator={validator} method="post">
            <ModalHeader fontSize={30} fontWeight={700} textColor="green">
              Add Category
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <Grid gap={4}>
                <GridItem>
                  <Center>
                    <FormInput name="name" label="category name" />
                  </Center>
                </GridItem>
                <GridItem>
                  <Center>
                    <FormInput name="color" label="color" />
                  </Center>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <MySubmitButton />
              {data && (
                <FormAlert
                  variant="info"
                  title={data.title}
                  details={data.details}
                />
              )}
            </ModalFooter>
          </ValidatedForm>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
