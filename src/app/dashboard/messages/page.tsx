"use client";

import api from "@/app/lib/api/api";
import { useEffect, useState } from "react";

interface Message {
  _id: string;
  sender: { name: string; email: string };
  receiver: { name: string; email: string };
  content: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/api/v1/messages");
      setMessages(res.data.data.messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    try {
      await api.post("/api/v1/messages", { receiver, content });
      setContent("");
      setReceiver("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id: string) => {
    await api.patch(`/api/v1/messages/${id}/read`);
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure to delete this message?")) return;
    await api.delete(`/api/v1/messages/${id}`);
    fetchMessages();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      {/* Send Message Form */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Message content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>

      {/* Message List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td className="border p-2">{msg.sender?.name || "Unknown"}</td>
              <td className="border p-2">{msg.receiver?.name || "Unknown"}</td>
              <td className="border p-2">{msg.content}</td>
              <td className="border p-2">
                {msg.isRead ? "Read" : "Unread"}
              </td>
              <td className="border p-2 space-x-2 flex justify-center">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
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
