import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatItem from "../components/chat/ChatItem";
import MessageInput from "../components/ui/messageInput";
import { getUserChats, sendChatRequest } from "../helpers/api-communicator"; // Adjust the path
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const navigate =useNavigate();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your assistant. How can I help you?",
    },
  ]);

  const handleSendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const data = await sendChatRequest(text);
      const reply = data.reply || "No response from server";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error sending chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }
  };
 useLayoutEffect(() => {
  if (!auth?.isLoggedIn || !auth.user) return;

  toast.loading("Loading Chats", { id: "loadchats" });

  getUserChats()
    .then((data) => {
      if (Array.isArray(data.chats)) {
        // Normalize roles (model -> assistant)
        const normalizedChats = data.chats.map((chat) => ({
          ...chat,
          role: chat.role === "model" ? "assistant" : chat.role,
        }));

        setMessages(normalizedChats);
        toast.success("Successfully loaded chats", { id: "loadchats" });
      } else {
        toast.error("Invalid chat format", { id: "loadchats" });
      }
    })
    .catch((err) => {
      console.error("Error loading chats:", err);
      toast.error("Failed to load chats", { id: "loadchats" });
    });
}, [auth?.isLoggedIn, auth?.user]);

useEffect(()=>{
  if(!auth?.user){
    return navigate("/login");
  }
},[auth])


  return (
    <Box
      sx={{
        display: "flex-column",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "95vw", md: "80vw", lg: "60vw" },
          height: { xs: "90vh", md: "80vh", lg: "80vh" },
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          scrollBehavior: "smooth",
          bgcolor: "#0B0F1A",
          px: { xs: 1, md: 2 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            scrollBehavior: "smooth",
            py: 1,
          }}
        >
          {messages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 1 }}>
          <MessageInput onSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
