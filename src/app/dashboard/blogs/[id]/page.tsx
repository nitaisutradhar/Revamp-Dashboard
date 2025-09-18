"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
import { Blog } from "@/app/types/blog";
import api from "@/app/lib/api/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const [blog, setBlog] = useState<Blog>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    api.get(`/api/v1/blogs/${id}`)
      .then(res => {
        setBlog(res.data.data.blog);
        setTitle(res.data.data.blog.title);
        setContent(res.data.data.blog.content);
      })
      .catch(err => console.error(err));
  }, [id]);

  console.log("Blog data:", blog);

  if (!id) return <p className="p-6">Invalid blog ID.</p>;
  const handleUpdate = async () => {
    try {
      await api.patch(`/api/v1/blogs/${id}`, { title, content });
      router.push("/dashboard/blogs");
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      {!isEdit ? (
        <>
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <p className="text-gray-600">By {blog.author?.name || "Unknown"}</p>
          <p className="mt-4">{blog.content}</p>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-4">Edit Blog</h1>
          <input
            type="text"
            className="w-full border p-2 mb-3 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-3 rounded"
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Blog
          </button>
        </div>
      )}
    </div>
  );
}
