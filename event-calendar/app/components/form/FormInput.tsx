import { FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  type?: string;
};

export const FormInput = ({ name, label, type }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  const inputProps = getInputProps();

  return (
    <div>
      <FormLabel htmlFor={name} marginBottom={10}>
        {label}
        {type === "textarea" ? (
          <Textarea {...inputProps} id={name} bg="white" />
        ) : (
          <Input {...inputProps} id={name} bg="white" type={type} />
        )}
        {error && <span className="form-error">{error}</span>}
      </FormLabel>
    </div>
  );
};
