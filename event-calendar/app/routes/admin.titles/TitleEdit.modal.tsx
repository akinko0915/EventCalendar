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
  Select,
  // FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";

interface TitleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TitleEditModal: React.FC<TitleEditModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} fontWeight={700} textColor="green">
            Edit Title
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4}>
              <GridItem>
                <Center>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder="Select category">
                      <option>1: 勉強会</option>
                      <option>2: 季節イベント</option>
                    </Select>
                  </FormControl>
                </Center>
              </GridItem>
              <GridItem>
                <Center>
                  <FormControl>
                    <FormLabel>Title Name</FormLabel>
                    <Input type="name" />
                  </FormControl>
                </Center>
              </GridItem>
              <GridItem>
                <Center>
                  <FormControl>
                    <FormLabel>Form Url</FormLabel>
                    <Input type="text" />
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

export default TitleEditModal;
