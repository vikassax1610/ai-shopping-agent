
function ChatInput({ userMessage, setUserMessage, handleMessageSubmit, isLoading }) {
  return (
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
  )
}

export default ChatInput