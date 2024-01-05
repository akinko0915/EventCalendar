import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  FormErrorMessage,
  // FormHelperText,
} from "@chakra-ui/react";
import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    // Authenticate the user using the form strategy
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/calendar", // redirect to home on success
      failureRedirect: "/login", // redirect back to login on failure
    });
  } catch (error: any) {
    return json({ error: error.message });
  }
};

const Login: React.FC = () => {
  const actionData = useActionData<{ error?: boolean }>();
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt="0"
        w="100%"
      >
        <Card w="800px">
          <CardHeader>
            <Heading size="md">Login</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Form method="post">
                <FormControl isInvalid={actionData?.error}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input type="email" name="email" id="email" required />

                  <FormLabel htmlFor="password">password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                  />

                  <Button
                    bg="brand.200"
                    textColor="white"
                    _hover={{ bg: "white", textColor: "brand.200" }}
                    marginTop={10}
                    type="submit"
                  >
                    Sign In
                  </Button>
                  {actionData?.error && (
                    <FormErrorMessage>{actionData.error}</FormErrorMessage>
                  )}
                </FormControl>
              </Form>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Login;
