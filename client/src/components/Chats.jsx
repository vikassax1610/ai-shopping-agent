import { useState } from "react";

function Chats() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        role: "user",
        content: userMessage,
      },
    ]);

    setUserMessage("");
  };

  return (
    <div className="w-full h-[90vh] flex flex-col">

      {/* Chat Area */}
      <section className="flex-1 overflow-y-auto scrollbar-hide w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">

          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-zinc-500 text-lg">
                Start a conversation...
              </p>
            </div>
          ) : (
            messages.map((message) => (
              message.role == "user" ? (
                <div
                  key={message.id}
                  className="flex justify-end"
                >
                  <div className="max-w-[75%] px-5 py-3 rounded-2xl rounded-br-md bg-blue-500 text-white">
                    <p className="text-sm md:text-base break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex justify-start"
                >
                  <div className="max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-md bg-zinc-800 text-zinc-100">
                    <p className="text-sm md:text-base break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              )

            ))
          )}

        </div>
      </section>

      {/* Input Area */}
      <div className="flex-shrink-0 w-full mb-4 px-4">
        <form
          onSubmit={handleMessageSubmit}
          className="max-w-4xl mx-auto flex items-center rounded-full border border-zinc-700 bg-zinc-900 p-1.5"
        >
          <input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            type="text"
            placeholder="How may I help you?"
            className="flex-1 min-w-0 px-5 py-3 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!userMessage.trim()}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </form>
      </div>

    </div>
  );
}

export default Chats;