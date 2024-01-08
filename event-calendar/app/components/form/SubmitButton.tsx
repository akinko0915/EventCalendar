import { Button } from "@chakra-ui/react";
import { useIsSubmitting } from "remix-validated-form";

export const MySubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      bg="brand.200"
      textColor="white"
      _hover={{ bg: "white", textColor: "brand.200" }}
      marginTop={10}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};
