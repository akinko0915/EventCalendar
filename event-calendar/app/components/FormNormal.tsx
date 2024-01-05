import { ValidatedForm } from "remix-validated-form";
import { withYup } from "@remix-validated-form/with-yup";
import * as Yup from "yup";
import { MyInput } from "~/components/normal";
import { MySubmitButton } from "~/components/submit-button";

type Input = {
  sample: string;
};

const schema = withYup(
  Yup.object({
    sample: Yup.string().label("First Name").required(),
  })
);

export default function FormNormal() {
  const onSubmit = (data: Input) => {
    console.log(data);
  };
  return (
    <ValidatedForm validator={schema} onSubmit={(data) => onSubmit(data)}>
      <MyInput name="sample" label="labelName" />
      + <MySubmitButton />
    </ValidatedForm>
  );
}
