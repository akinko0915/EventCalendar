import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const posts = [
    {
      id: 1,
      title: "title A",
      body: "content A",
    },
    {
      id: 2,
      title: "title B",
      body: "content B",
    },
  ];

  return json({ posts });
}

export default function IndexPostPage() {
  const { posts } = useLoaderData();
  return (
    <>
      <h2>記事一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
