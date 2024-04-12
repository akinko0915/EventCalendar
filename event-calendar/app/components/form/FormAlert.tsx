import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import type { AlertProps } from "~/routes/signup";

export const FormAlert = ({ variant, title, details }: AlertProps) => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <ChakraAlert status={variant} borderRadius="md" boxShadow="md" padding={4}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{details}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setShow(false)}
      />
    </ChakraAlert>
  );
};
