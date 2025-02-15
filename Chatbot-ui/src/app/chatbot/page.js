"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConvexProvider, ConvexReactClient, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import "./chatbot.css"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const storeChat = useMutation(api.chat.storeChat);
  const chatHistory = useQuery(api.chat.getChatHistory) || [];

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { user: userInput, bot: "Thinking..." };
    setMessages([...messages, newMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });
      const data = await response.json();

      // Extract AI response after "Assistant:"
      const aiResponse = data.chatbot_response
        .replace(/^Assistant:/, "") // Remove "Assistant:" prefix
        .trim(); // Clean up extra spaces/newlines

      const updatedMessages = [
        ...messages,
        { user: userInput, bot: aiResponse || "Sorry, I didn't understand that." },
      ];
      setMessages(updatedMessages);
      await storeChat({ userInput, chatbotResponse: aiResponse });
    } catch (error) {
      toast.error("Error fetching chatbot response");
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  // Merge chat history with messages and sort chronologically
  const combinedMessages = [...chatHistory, ...messages];

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">Chatbot</div>
        <div className="chat-messages">
          {combinedMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.user ? "user-message" : "bot-message"}`}>
              <p>{msg.user ? `User: ${msg.user}` : `Bot: ${msg.bot || msg.chatbotResponse}`}</p>
            </div>
          ))}
          {loading && (
            <div className="typing-loader">
              <span></span> <span></span> <span></span>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Chatbot />
    </ConvexProvider>
  );
}
