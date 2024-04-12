import { DataFunctionArgs, json, redirect } from "@remix-run/node";
// import { useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { MySubmitButton } from "~/components/form/SubmitButton";
import { FormInput } from "~/components/form/FormInput";
import { SelectGroup, Select } from "~/components/form/Select";
import { db } from "~/db.server";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
import { createUser } from "~/models/user.server";

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: "name is required" }),
    belonging: z.string().optional(),
    sex: z.string().optional(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(1, { message: "Password is required" }) // "password is required" message
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
);

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { name, belonging, sex, email, password } = data.data;

  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await createUser({
      name,
      belonging,
      sex,
      email,
      password: hashedPassword,
    });
    return redirect("/calendar");
  } catch (error) {
    console.error("Error creating user:", error);

    return json(
      {
        title: "Error",
        details: "An error occurred while creating the user.",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
};

export default function Signup() {
  // const data = useActionData();
  const belongingOptions = [
    { value: "社会人 - worker", label: "社会人 - worker" },
    {
      value: "大学生 - university student",
      label: "大学生 - university student",
    },
    {
      value: "高校生以下 - high school student and younger",
      label: "高校生以下 - high school student and younger",
    },
    { value: "その他 - others", label: "その他 - others" },
  ];

  const sexOptions = [
    { value: "男 - male", label: "male" },
    { value: "女 - female", label: "female" },
    { value: "その他 - others", label: "others" },
  ];
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
            <Heading size="md">Signup</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <ValidatedForm validator={validator} method="post">
                <FormInput name="name" label="お名前 - name" />
                <SelectGroup
                  name="belonging"
                  label="属性 - belonging (optional)"
                >
                  <Select name="belonging" options={belongingOptions} />
                </SelectGroup>
                <SelectGroup name="sex" label="性別 - gender (optional)">
                  <Select name="sex" options={sexOptions} />
                </SelectGroup>

                <FormInput name="email" label="メールアドレス - email" />
                <FormInput name="password" label="パスワード - password" />

                <MySubmitButton />
              </ValidatedForm>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}
