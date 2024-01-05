import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Text,
  Select,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";

export default function AddForm() {
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
          Add Event
        </Text>
      </Box>
      <Form method="post">
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
              <FormControl>
                <FormLabel htmlFor="text">Category</FormLabel>
                <Select
                  placeholder="Select category"
                  bg="white"
                  marginBottom={10}
                >
                  <option>勉強会</option>
                  <option>季節イベント</option>
                </Select>

                <FormLabel htmlFor="title">Title</FormLabel>
                <Select placeholder="Select Title" bg="white" marginBottom={10}>
                  <option>Joyful English Meetup</option>
                  <option>IPPIN</option>
                </Select>
                <FormLabel htmlFor="startAt">Start At</FormLabel>
                <Input
                  type="datetime-local"
                  name="date"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="endAt">End At</FormLabel>
                <Input
                  type="datetime-local"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="place">Place</FormLabel>
                <Input
                  type="text"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="placeUrl">Place Url</FormLabel>
                <Input
                  type="text"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} bg="none">
              <FormControl>
                <FormLabel htmlFor="target">Target</FormLabel>
                <Input
                  type="text"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="maximumParticipant">
                  Maximum Participant
                </FormLabel>
                <Input
                  type="number"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="fee">Fee</FormLabel>
                <Input
                  type="number"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="imageUrl">Image</FormLabel>
                <Input
                  type="file"
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea bg="white" size="xl" />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0"
          w="100%"
        >
          <Button
            bg="brand.200"
            textColor="white"
            _hover={{ bg: "white", textColor: "brand.200" }}
            marginTop={10}
            type="submit"
            marginBottom={20}
          >
            Add Event
          </Button>
        </Box>
      </Form>
    </>
  );
}
