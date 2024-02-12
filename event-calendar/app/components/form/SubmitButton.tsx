import { Button } from "@chakra-ui/react";
import { useIsSubmitting } from "remix-validated-form";

export const MySubmitButton = ({ value }: { value: string }) => {
  const isSubmitting = useIsSubmitting(value);

  const handleClick = () => {
    console.log(`MySubmitButton clicked with value: ${value}, isSubmitting: ${isSubmitting}`);
  };

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
          onClick={handleClick}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
  );
};
