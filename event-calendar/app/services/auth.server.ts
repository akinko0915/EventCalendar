import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";

export type User = {
  id: string;
  role: string;
  name: string;
  email: string;
};

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Form not submitted correctly.");
    }

    // Here, you'll call your login function to validate the user
    const user = await login(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  }),
  "user-pass"
);
