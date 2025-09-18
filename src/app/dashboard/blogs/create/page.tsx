"use client";

import { useState } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/api";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // Parse tags string into array if user types like: Lifestyle, Productivity, Health
    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (tagsArray.length > 0) {
      formData.append("tags", JSON.stringify(tagsArray));
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await api.post("/api/v1/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/dashboard/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded p-2"
            rows={6}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Lifestyle, Productivity, Health"
            className="w-full border rounded p-2"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
