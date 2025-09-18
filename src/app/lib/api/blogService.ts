import { Blog } from "@/app/types/blog";
import api from "./api";


export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await api.get("/api/v1/blogs");
  return res.data.data.blogs;
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const res = await api.get(`/api/v1/blogs/${slug}`);
  return res.data.data.blog;
};

export const createBlog = async (formData: FormData): Promise<Blog> => {
  const res = await api.post("/api/v1/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data.blog;
};

export const updateBlog = async (id: string, formData: FormData): Promise<Blog> => {
  const res = await api.patch(`/api/v1/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data.blog;
};

export const deleteBlog = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/blogs/${id}`);
};
