import { Image, Box, Text, Button } from "@chakra-ui/react";
import { Link, useLocation } from "@remix-run/react";

const Nav = () => {
  const location = useLocation();
  return (
    <>
      <Link to="/" state={{ some: "home" }}>
        <Box boxSize="xs" ml="74px" mt="120px">
          <Image
            borderRadius="full"
            boxSize="130px"
            src="/images/logo.png"
            alt="Logo"
            objectFit="cover"
          />
          <Text textColor="white" fontWeight="bold" marginTop={3}>
            EnMoveいべんと
          </Text>
        </Box>
      </Link>
      <Link to="/calendar" state={{ some: "calendar" }}>
        {location.pathname === "/calendar" ? (
          <>
            <Button
              bg="brand.50"
              _hover={{ bg: "brand.50", textColor: "brand.200" }}
              height="60px"
              width="300px"
              textColor="brand.200"
              fontSize={20}
            >
              Calendar
            </Button>
          </>
        ) : (
          <>
            <Button
              bg="brand.200"
              _hover={{ bg: "brand.50", textColor: "brand.200" }}
              height="60px"
              width="300px"
              textColor="white"
              fontSize={20}
            >
              Calendar
            </Button>
          </>
        )}
      </Link>
    </>
  );
};

export default Nav;
