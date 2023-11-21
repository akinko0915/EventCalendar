import { useParams } from "@remix-run/react";

export default function PostDetailPage() {
  const params = useParams();
  return <h2>Post Detail Page {params.postId}</h2>;
}
