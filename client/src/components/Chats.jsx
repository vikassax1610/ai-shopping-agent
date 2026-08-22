import { useState } from "react";
import api from "../api/api";
import ReactMarkdown from "react-markdown";
function Chats() {
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
        },
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
              message.role === "user" ? (
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
                    <ReactMarkdown
                      components={{
                        // Headings
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold text-white mt-2 mb-4 tracking-tight">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold text-white mt-5 mb-3 tracking-tight">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                            {children}
                          </h3>
                        ),

                        h4: ({ children }) => (
                          <h4 className="text-base font-semibold text-zinc-100 mt-3 mb-2">
                            {children}
                          </h4>
                        ),

                        // Paragraph
                        p: ({ children }) => (
                          <p className="text-sm md:text-[15px] leading-7 text-zinc-300 mb-3 last:mb-0">
                            {children}
                          </p>
                        ),

                        // Bold
                        strong: ({ children }) => (
                          <strong className="font-semibold text-white">
                            {children}
                          </strong>
                        ),

                        // Italic
                        em: ({ children }) => (
                          <em className="text-zinc-200 italic">
                            {children}
                          </em>
                        ),

                        // Unordered list
                        ul: ({ children }) => (
                          <ul className="my-3 ml-5 space-y-2 list-disc marker:text-blue-400">
                            {children}
                          </ul>
                        ),

                        // Ordered list
                        ol: ({ children }) => (
                          <ol className="my-3 ml-5 space-y-2 list-decimal marker:text-blue-400 marker:font-medium">
                            {children}
                          </ol>
                        ),

                        // List item
                        li: ({ children }) => (
                          <li className="pl-1 text-sm md:text-[15px] leading-6 text-zinc-300">
                            {children}
                          </li>
                        ),

                        // Links
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                          >
                            {children}
                          </a>
                        ),

                        // Inline code
                        code: ({ children, className }) => {
                          const isBlock = className?.includes("language-");

                          if (isBlock) {
                            return (
                              <code className="block text-sm leading-6 text-zinc-200">
                                {children}
                              </code>
                            );
                          }

                          return (
                            <code className="px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-700 text-blue-300 text-[13px]">
                              {children}
                            </code>
                          );
                        },

                        // Code block
                        pre: ({ children }) => (
                          <pre className="my-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 overflow-x-auto shadow-inner">
                            {children}
                          </pre>
                        ),

                        // Blockquote
                        blockquote: ({ children }) => (
                          <blockquote className="my-4 pl-4 border-l-2 border-blue-500 text-zinc-400 italic">
                            {children}
                          </blockquote>
                        ),

                        // Horizontal line
                        hr: () => (
                          <hr className="my-5 border-zinc-700" />
                        ),

                        // Table
                        table: ({ children }) => (
                          <div className="my-4 overflow-x-auto rounded-xl border border-zinc-700">
                            <table className="w-full text-sm text-left text-zinc-300">
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-zinc-900 text-zinc-100">
                            {children}
                          </thead>
                        ),

                        tbody: ({ children }) => (
                          <tbody className="divide-y divide-zinc-800">
                            {children}
                          </tbody>
                        ),

                        tr: ({ children }) => (
                          <tr className="hover:bg-zinc-900/50 transition-colors">
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="px-4 py-3">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )

            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-5 py-3 rounded-2xl rounded-bl-md bg-zinc-800 text-zinc-100">
                <p className="text-sm md:text-base">
                  Thinking...
                </p>
              </div>
            </div>
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
            disabled={!userMessage.trim() || isLoading}
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