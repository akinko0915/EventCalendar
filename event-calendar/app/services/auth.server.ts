import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";
// import { hash } from "bcryptjs";

export type User = {
  id: string;
  role: string;
  name: string;
  belonging?: string;
  sex?: string;
  email: string;
};

// Create an Authenticator instance using session storage
export let authenticator = new Authenticator<User>(sessionStorage);

// Use the FormStrategy to handle form-based authentication
authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    let email = form.get("email");
    let password = form.get("password");

    const user = await login(String(email), String(password));

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  }),
  "user-pass"
);
