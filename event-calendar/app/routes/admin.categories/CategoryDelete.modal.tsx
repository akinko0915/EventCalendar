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
  Text,
  // FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";

interface CategoryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} fontWeight={700} textColor="green">
            Delete Category
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4}>
              <GridItem>
                <Center>
                  <Text>Are you sure to delete </Text>
                </Center>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="red"
              textColor="white"
              _hover={{ bg: "red", textColor: "white" }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryDeleteModal;
