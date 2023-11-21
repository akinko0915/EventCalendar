import { Outlet } from "@remix-run/react";

export default function Post() {
  return (
    <>
      <h1>Post Page</h1>
      <Outlet />
    </>
  );
}
