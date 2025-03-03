"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DebugPage() {
  const users = useQuery(api.users.getUsers);
  const messages = useQuery(api.chat.getChatHistory);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Database Debug</h2>

      {/* Users Section */}
      <h3 className="text-xl font-semibold mt-4">Users:</h3>
      {users ? (
        users.length > 0 ? (
          <ul className="list-disc pl-6">
            {users.map((user) => (
              <li key={user._id} className="text-gray-800">{user.username}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No users found.</p>
        )
      ) : (
        <p className="text-gray-500">Loading users...</p>
      )}

      {/* Messages Section */}
      <h3 className="text-xl font-semibold mt-4">Chat Messages:</h3>
      {messages ? (
        messages.length > 0 ? (
          <ul className="list-disc pl-6">
            {messages.map((msg) => (
              <li key={msg._id} className="text-gray-800">
                <strong className="text-blue-600">{msg.userInput}:</strong> {msg.chatbotResponse}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No messages found.</p>
        )
      ) : (
        <p className="text-gray-500">Loading messages...</p>
      )}
    </div>
  );
}
