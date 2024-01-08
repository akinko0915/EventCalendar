// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  extendTheme,
} from "@chakra-ui/react";
import { MetaFunction, LinksFunction } from "@remix-run/node";
import calendarStyle from "~/styles/calendar.css";
import { ServerStyleContext, ClientStyleContext } from "./context";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Nav from "./components/basic-uis/Nav";
import Header from "./components/basic-uis/Header";
import Footer from "./components/basic-uis/Footer";

export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { title: "New Remix App" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

export let links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    { rel: "stylesheet", href: calendarStyle },
  ];
};

const theme = extendTheme({
  colors: {
    brand: {
      "50": "#FFEFD7",
      "100": "#FFF2D2",
      "200": "#FFB803",
      "300": "#dc143c",
      "400": "#042D5B",
    },
  },
});

interface DocumentProps {
  children: React.ReactNode;
}
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
      zIndex="-1"
    />
  );
};

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
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
          zIndex="0"
        >
          <CircleComponent />
          <GridItem bg="#FFB803" area={"nav"}>
            <Nav />
          </GridItem>
          <GridItem pl="2" area={"header"}>
            <Header />
          </GridItem>
          <GridItem pl="2" area={"main"}>
            <Outlet />
          </GridItem>
          <GridItem pl="2" area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </ChakraProvider>
    </Document>
  );
}
