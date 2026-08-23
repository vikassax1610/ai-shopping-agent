import MessageBubble from "./MessageBubble";
import SuggestionMessages from "./SuggestionMessages";
function ChatWindow({ messages, isLoading, setUserMessage }) {
  const suggestions = [
    "Find Nike running shoes under ₹3000",
    "Show me black running shoes",
    "Find Adidas shoes under ₹4000",
    "Show me the cheapest running shoes",
  ];
  const handleSuggestion = (suggestion) => {
    setUserMessage(suggestion);
  };
  return (
    <section className="flex-1 overflow-y-auto scrollbar-hide w-full">

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {messages.length === 0 ? (
          <div className="h-full mt-28 flex flex-col items-center justify-center">
            <p className="text-zinc-500 text-xl">
              What are you looking for?
            </p>
            <SuggestionMessages suggestions={suggestions}
              onSelect={handleSuggestion}

            />
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-start">

            <div className="flex gap-3">

              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center">
                <span className="text-xs text-white">AI</span>
              </div>

              <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-zinc-900/80 border border-white/10">

                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default ChatWindow;