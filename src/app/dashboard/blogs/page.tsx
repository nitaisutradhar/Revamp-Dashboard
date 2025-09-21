"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import api from "@/app/lib/api/api";
import { Blog } from "@/app/types/blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // const router = useRouter();

  useEffect(() => {
    api.get("/api/v1/blogs")
      .then(res => {
        setBlogs(res.data.data.blogs)
      })
      .catch(err => console.error(err));
  }, []);


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/api/v1/blogs/${id}`);
        setBlogs(prev => prev.filter(b => b._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Blogs</h1>
        <Link href="/dashboard/blogs/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            + Create Blog
          </button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            {/* <th className="p-2 text-left">Author</th> */}
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} className="border-t">
              <td className="p-2">{blog.title}</td>
              {/* <td className="p-2">{blog.author?.name || "N/A"}</td> */}
              <td className="p-2 text-center">{blog.isPublished ? "Published" : "Draft"}</td>
              <td className="p-2 flex gap-2 justify-center">
                <Link href={`/dashboard/blogs/${blog._id}`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    View
                  </button>
                </Link>
                <Link href={`/dashboard/blogs/${blog._id}/edit`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
