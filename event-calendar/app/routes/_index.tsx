import { useLoaderData } from "@remix-run/react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { db } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json(
    await db.event.findMany({
      where: {
        id: params.id,
        categoryId: params.categoryId,
        titleId: params.titleId,
      },
      include: {
        category: true,
        title: true,
      },
    })
  );
};

const CircleComponent = () => {
  return (
    <Box
      position="fixed"
      width="2000px"
      height="2000px"
      backgroundColor="#FFF2D2"
      borderRadius="50%"
      top="0"
      left="0"
      transform="translate(30%, -15%)"
    />
  );
};

export default function Index() {
  const events = useLoaderData<typeof loader>();
  return (
    <Grid
      templateAreas={`"nav header"
                    "nav main"
                    "nav footer"`}
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
        <Nav />
      </GridItem>
      <GridItem pl="2" area={"header"}>
        <Header />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        <Main events={events} />
      </GridItem>
      <GridItem pl="2" area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
