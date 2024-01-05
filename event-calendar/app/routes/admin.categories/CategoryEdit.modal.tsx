import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  // FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} fontWeight={700} textColor="green">
            Edit Category
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4}>
              <GridItem>
                <Center>
                  <FormControl>
                    <FormLabel>Category Name</FormLabel>
                    <Input type="name" />
                  </FormControl>
                </Center>
              </GridItem>
              <GridItem>
                <Center>
                  <FormControl>
                    <FormLabel>Theme Color</FormLabel>
                    <Input type="color" />
                  </FormControl>
                </Center>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="brand.200"
              textColor="white"
              _hover={{ bg: "white", textColor: "brand.200" }}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryEditModal;
