import { Image, Box, Flex, Button, Text, Divider } from "@chakra-ui/react";
import { Link, useLocation } from "@remix-run/react";

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
      <Box display="flex" justifyContent="center" w="100%" marginTop={20}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Event Title</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event?.title.name}
            </Text>
          </Box>
          <Box>
            <Link to="/apply" state={{ event }}>
              <Button
                _hover={{ bg: "white", color: "brand.300" }}
                bg="brand.300"
                color="white"
                marginTop={15}
                height={20}
                width={40}
                fontSize={20}
                marginRight="10px"
              >
                Apply Form
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box display="flex" justifyContent="center" w="100%">
        <Box w="1000px">
          <Divider
            orientation="horizontal"
            marginTop="20px"
            borderColor="brand.400"
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" w="100%" marginTop={10}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Date</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event && formatDate(event.startAt)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="20px">Time</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event && formatTime(event.startAt)}
              {event &&
                event.startAt !== event.endAt &&
                ` ~ ${formatTime(event.endAt)}`}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box display="flex" justifyContent="center" w="100%">
        <Box w="1000px">
          <Divider
            orientation="horizontal"
            marginTop="20px"
            borderColor="brand.400"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" w="100%" marginTop={10}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Place</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event?.place} : {event?.placeUrl}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box display="flex" justifyContent="center" w="100%">
        <Box w="1000px">
          <Divider
            orientation="horizontal"
            marginTop="20px"
            borderColor="brand.400"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" w="100%" marginTop={10}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Target</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event?.target}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box display="flex" justifyContent="center" w="100%">
        <Box w="1000px">
          <Divider
            orientation="horizontal"
            marginTop="20px"
            borderColor="brand.400"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" w="100%" marginTop={10}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Price</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event?.fee}円/人
            </Text>
          </Box>
          {event.discount && (
            <Box flex="1" textAlign="left">
              <Text fontSize="20px">Discount</Text>
              <Text fontWeight="bolder" textColor="brand.400">
                {event?.discount}円/人 対象者は「Description」で確認してください
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
      <Box display="flex" justifyContent="center" w="100%">
        <Box w="1000px">
          <Divider
            orientation="horizontal"
            marginTop="20px"
            borderColor="brand.400"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" w="100%" marginTop={10}>
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          w="800px"
        >
          <Box flex="1" textAlign="left">
            <Text fontSize="20px">Description</Text>
            <Text fontWeight="bolder" textColor="brand.400">
              {event?.description}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box display="flex" justifyContent="center" w="100%" marginBottom={20}>
        <Link to="/apply">
          <Button
            _hover={{ bg: "white", color: "brand.300" }}
            bg="brand.300"
            color="white"
            marginTop={20}
            height={20}
            width={40}
            fontSize={20}
            marginRight="10px"
          >
            Apply Form
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Detail;
