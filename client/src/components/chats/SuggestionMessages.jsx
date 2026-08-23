import { ArrowRight } from "lucide-react";

function SuggestionMessages({ suggestions, onSelect }) {
  return (
    <div className="w-full max-w-3xl mt-4 mx-auto px-4 pb-6">
      {/* Suggestions */}
      <div className="grid grid-cols-1 gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(suggestion)}
            className="
              group relative overflow-hidden
              flex items-center justify-between
              w-full
              px-4 py-3.5
              rounded-2xl
              text-left
              bg-white/[0.04]
              backdrop-blur-xl
              border border-white/[0.08]
              shadow-[0_8px_30px_rgba(0,0,0,0.18)]
              hover:bg-white/[0.07]
              hover:border-white/[0.14]
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            {/* Subtle gradient glow */}
            <div className="
              absolute inset-0
              bg-gradient-to-r
              from-pink-500/[0.04]
              via-transparent
              to-violet-500/[0.05]
              opacity-0
              group-hover:opacity-100
              transition-opacity duration-300
            " />

            <span className="
              relative
              text-sm
              text-zinc-300
              group-hover:text-white
              transition-colors
            ">
              {suggestion}
            </span>

            <div className="
              relative
              shrink-0
              ml-3
              w-7 h-7
              rounded-full
              flex items-center justify-center
              bg-white/[0.05]
              border border-white/[0.08]
              group-hover:bg-pink-500/15
              group-hover:border-pink-400/20
              transition-all duration-300
            ">
              <ArrowRight className="
                w-3.5 h-3.5
                text-zinc-500
                group-hover:text-pink-400
                group-hover:translate-x-0.5
                transition-all
              " />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestionMessages;