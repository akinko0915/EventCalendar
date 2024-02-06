import { Button } from "@chakra-ui/react";
import { useIsSubmitting } from "remix-validated-form";

export const MySubmitButton = ({ value }: { value: string }) => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      bg="brand.200"
      textColor="white"
      _hover={{ bg: "white", textColor: "brand.200" }}
      marginTop={10}
      name="action"
      value={value}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};
