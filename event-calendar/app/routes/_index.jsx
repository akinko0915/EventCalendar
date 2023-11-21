import { Link } from "@remix-run/react";
import { Grid, GridItem, Box } from "@chakra-ui/react";

const CircleComponent = () => {
  return (
    <Box
      position="fixed"
      width="1200px"
      height="1200px"
      backgroundColor="#FFF2D2"
      borderRadius="50%"
      top="0"
      left="0"
      transform="translate(90%, -30%)"
    />
  );
};

export default function Index() {
  return (
    <Grid
      templateAreas={`"nav header"
                    "nav main"
                    "nav footer"`}
      // gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"300px 1fr"}
      h="auto"
      gap={1}
      color="blackAlpha.700"
      fontWeight="bold"
      bg="#FED495"
      position="relative"
      minHeight="100vh"
    >
      <CircleComponent />
      <GridItem pl="2" bg="#FFB803" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" area={"header"}>
        Header
      </GridItem>
      <GridItem pl="2" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}
