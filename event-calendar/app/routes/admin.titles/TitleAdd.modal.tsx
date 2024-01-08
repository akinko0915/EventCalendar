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
import { useActionData } from "@remix-run/react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/form/FormInput";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { validator } from "./index";
import { FormAlert } from "~/components/form/FormAlert";
import { Select, SelectGroup } from "~/components/form/Select";
import { useEffect, useState } from "react";

interface TitleAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { id: string; name: string }[];
}

export type AlertProps = {
  variant: "info" | "warning" | "success" | "error";
  title: string;
  details: string;
};

const TitleAddModal: React.FC<TitleAddModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const data = useActionData<AlertProps>();

  useEffect(() => {
    const transformedCategories = categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    setCategoryOptions(transformedCategories);
  }, [categories]);

  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ValidatedForm validator={validator} method="post">
            <ModalHeader fontSize={30} fontWeight={700} textColor="green">
              Add Title
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <Grid gap={4}>
                <GridItem>
                  <SelectGroup name="categoryId" label="category">
                    <Select name="categoryId" options={categoryOptions} />
                  </SelectGroup>
                </GridItem>
                <GridItem>
                  <Center>
                    <FormInput name="name" label="name" />
                  </Center>
                </GridItem>
                <GridItem>
                  <Center>
                    <FormInput name="form_url" label="form_url" />
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

export default TitleAddModal;
