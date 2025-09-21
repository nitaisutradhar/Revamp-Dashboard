"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api/api";
import { Blog } from "@/app/types/blog";


export default function ViewBlogPage() {
  const params = useParams();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const response = await api.get<{ data: { blog: Blog } }>(
          `/api/v1/blogs/${blogId}`
        );
        setBlog(response.data.data.blog);
      } catch (err) {
        setError(`Failed to fetch blog details.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return <p className="text-center py-10">Loading blog details...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p className="text-center py-10">No blog found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6 whitespace-pre-line">{blog.content}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Author</h2>
        <p className="text-gray-800">{blog.author.name}</p>
        <p className="text-gray-500 text-sm">{blog.author.email}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {(blog.tags ?? []).map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <p
        className={`mb-4 font-semibold ${
          blog.isPublished ? "text-green-600" : "text-red-600"
        }`}
      >
        {blog.isPublished ? "Published" : "Draft"}
      </p>

      <p className="text-sm text-gray-500">
        Created at: {new Date(blog.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated at: {new Date(blog.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
