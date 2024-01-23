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
  Input,
  // Input,
} from "@chakra-ui/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { FormAlert } from "~/components/form/FormAlert";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { validator } from "./index";
import { useActionData } from "@remix-run/react";
import { DataFunctionArgs, json } from "@remix-run/node";
import { updateCategory } from "~/models/category.server";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
  color: string | null;
}

export type AlertProps = {
  variant: "info" | "warning" | "success" | "error";
  title: string;
  details: string;
};

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { id, name, color } = data.data;

  try {
    const updatedCategory = await updateCategory(id, { name, color });
    return json({
      title: `${updatedCategory.name} is updated`,
      details: `the color of the category is now ${updatedCategory.color}`,
    });
  } catch (error) {
    console.error("Error updating category", error);
    return json(
      {
        title: "Error",
        details: "An error occurred while updating the category.",
      },
      { status: 500 }
    );
  }
};

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  onClose,
  id,
  name,
  color,
}) => {
  const data = useActionData<AlertProps>();

  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ValidatedForm
            validator={validator}
            method="post"
            defaultValues={{ name: name, color: color }}
            // id="id"
          >
            <ModalHeader fontSize={30} fontWeight={700} textColor="green">
              Edit Category
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
                <Input type="hidden" name="id" defaultValue={id} />
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

export default CategoryEditModal;
