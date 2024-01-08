import {
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { useField } from "remix-validated-form";

export type SelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
};

export const Select: FC<SelectProps> = ({ label, name, options }) => {
  const { getInputProps } = useField(name);
  const inputProps = getInputProps();

  return (
    <div>
      <FormLabel htmlFor={name}>
        {label}
        <ChakraSelect {...inputProps} name={name} mb={10} bg="white">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ChakraSelect>
      </FormLabel>
    </div>
  );
};

export type SelectGroupProps = {
  label: string;
  name: string;
  children: ReactNode;
};

export const SelectGroup: FC<SelectGroupProps> = ({
  label,
  name,
  children,
}) => {
  const { error } = useField(name);
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </fieldset>
  );
};
