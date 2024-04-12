import {
  Image,
  Box,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Select,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Form, useLocation } from "@remix-run/react";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

const Detail: React.FC = () => {
  const location = useLocation();
  const event = location.state.event;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="0"
        w="100%"
      >
        <Image
          src={`/images/${event?.imageUrl}.png`}
          alt="JEM"
          maxWidth="800px"
          objectFit="cover"
        />
      </Box>
      <Form method="post">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="0"
          w="100%"
          marginTop={10}
        >
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
            w="1200px"
          >
            <GridItem rowSpan={1} colSpan={1} bg="none">
              <FormControl>
                <FormLabel htmlFor="text">Name (お名前)</FormLabel>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  bg="white"
                  marginBottom={10}
                />

                <FormLabel htmlFor="title">
                  Email Address (メールアドレス)
                </FormLabel>
                <Input
                  type="email"
                  name="date"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="startAt">
                  Title of the event (イベント名)
                </FormLabel>
                <Input
                  type="text"
                  value={event?.title.name}
                  name="date"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="endAt">Date (日付)</FormLabel>
                <Input
                  type="text"
                  value={formatDate(event.startAt)}
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                <FormLabel htmlFor="place">Start at (開始時刻)</FormLabel>
                <Input
                  type="text"
                  value={formatTime(event.startAt)}
                  name="time"
                  id="date"
                  required
                  bg="white"
                  marginBottom={10}
                />
                {event.startAt !== event.endAt && (
                  <>
                    <FormLabel htmlFor="placeUrl">End at (終了時刻)</FormLabel>
                    <Input
                      value={formatTime(event.endAt)}
                      type="text"
                      name="time"
                      id="date"
                      required
                      bg="white"
                      marginBottom={10}
                    />
                  </>
                )}
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} bg="none">
              <FormControl>
                <FormLabel htmlFor="target">Belonging (属性)</FormLabel>
                <Select
                  placeholder="Select Belonging"
                  bg="white"
                  marginBottom={10}
                >
                  <option>社会人</option>
                  <option>大学生</option>
                  <option>大学生</option>
                  <option>主婦</option>
                  <option>その他</option>
                </Select>
                <FormLabel htmlFor="sex">Sex (性別)</FormLabel>
                <Select
                  placeholder="Select Belonging"
                  bg="white"
                  marginBottom={10}
                >
                  <option>男</option>
                  <option>女</option>
                  <option>その他</option>
                </Select>

                <FormLabel htmlFor="imageUrl">Confirmation (確認)</FormLabel>
                <Text marginBottom={10}>
                  Do you understand that you need to pay {event?.fee}yen as you
                  attend. 到着時に 1ドリンクの料金+参加費{event?.fee}
                  を支払う必要があることを理解していますか。
                </Text>
                {event.discount && (
                  <>
                    <Divider />
                    <Text marginBottom={10}>
                      Do you understand that you must check who is eligible for
                      the discount and if you are, you must pay the discounted
                      price
                      {event?.discount} yen?
                      割引対象者を確認の上、その対象者だった場合、割引価格
                      {event?.discount}
                      円を支払う必要があることを理解していますか。
                    </Text>
                  </>
                )}
                <RadioGroup defaultValue="Itachi" aria-required>
                  <HStack>
                    <Radio value="Yes">Yes</Radio>
                  </HStack>
                </RadioGroup>
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
            Apply
          </Button>
        </Box>
      </Form>
    </>
  );
};

export default Detail;
