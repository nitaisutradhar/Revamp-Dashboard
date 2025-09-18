"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Blog } from "@/app/types/blog";

export default function PublicBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`/api/v1/blogs/${slug}`)
      .then(res => setBlog(res.data.data.blog))
      .catch(err => console.error(err));
  }, [slug]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">By {blog.author?.name || "Unknown"}</p>
      <p className="mt-6">{blog.content}</p>
    </div>
  );
}
