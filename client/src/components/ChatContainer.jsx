import { useState } from "react";
import api from "../api/api";
import ChatsWindow from "./chats/ChatWindow";
import ChatInput from "./chats/ChatInput";
function ChatContainer() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const currentMessage = userMessage.trim();
    if (!currentMessage) return;
    setIsLoading(true);
    try {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now(),
          role: "user",
          content: currentMessage,
        },
      ]);
      setUserMessage("");
      const response = await api.post("/api/chat", { message: currentMessage });
      console.log(response.data);
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now(),
          role: "assistant",
          content: response.data.message,
          products: response.data.products || []
        }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col">

      {/* Chat Area */}
      <ChatsWindow messages={messages} isLoading={isLoading} setUserMessage={setUserMessage} />

      {/* Input Area */}
      <ChatInput userMessage={userMessage}
        setUserMessage={setUserMessage}
        handleMessageSubmit={handleMessageSubmit}
        isLoading={isLoading} />
    </div>
  );
}

export default ChatContainer;