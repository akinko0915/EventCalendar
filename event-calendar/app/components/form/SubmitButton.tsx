import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

interface MySubmitButtonProps {
  value: string;
  isSubmitting: boolean;
  onSubmit: () => void; // Assuming onSubmit is a function with no arguments and no return value
  bg: string;
  _hover: { [key: string]: any }; // Assuming _hover is an object with various possible keys and values
}

// @ts-ignore
export const MySubmitButton: React.FC<MySubmitButtonProps> = ({
  value,
  isSubmitting,
  onSubmit,
  bg,
  _hover,
}) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      bg={bg}
      textColor="white"
      _hover={_hover}
      marginTop={10}
      name="action"
      value={value}
      onClick={onSubmit}
    >
      {isSubmitting ? "Submitting..." : `${value}`}
    </Button>
  );
};

MySubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
