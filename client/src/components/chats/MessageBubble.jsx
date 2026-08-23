import { Bot, User } from "lucide-react";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import ProductList from "../products/ProductList";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`flex gap-3 max-w-[85%] min-w-0 md:max-w-[90%] ${isUser ? "flex-row-reverse" : "flex-row"
          }`}
      >

        {/* Avatar */}
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${isUser
            ? "bg-blue-500/15 border border-blue-500/20"
            : "bg-gradient-to-br from-pink-500 to-violet-600 shadow-lg shadow-pink-500/10"
            }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-blue-400" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message */}
        <div
          className={
            isUser
              ? "min-w-0 max-w-full bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-lg shadow-blue-500/5"
              : "min-w-0 max-w-full overflow-hidden bg-zinc-900/80 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-md"
          }
        >
          {isUser ? (
            <p className="text-sm md:text-[15px] leading-6 break-words">
              {message.content}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <MarkdownRenderer message={message.content} />
              <ProductList products={message.products} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default MessageBubble;