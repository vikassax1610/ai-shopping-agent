import { ShoppingBag, Circle } from "lucide-react";
import Chats from "./components/Chats";

function App() {
  return (
    <div className="min-h-screen w-screen bg-[#09090b] text-zinc-100 flex flex-col overflow-hidden">

      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-5 md:px-8">

        {/* Brand */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Shoply
              </h1>

              <span className="px-2 py-0.5 rounded-md bg-pink-500/10 border border-pink-500/20 text-[10px] font-semibold uppercase tracking-wider text-pink-400">
                AI
              </span>
            </div>

            <p className="hidden sm:block text-xs text-zinc-500">
              Your intelligent shopping companion
            </p>
          </div>

        </div>

        {/* Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10">
          <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
          <span className="text-xs text-zinc-400">
            Online
          </span>
        </div>

      </header>


      {/* Main */}
      <main className="relative flex-1 overflow-hidden">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/5 blur-[120px]" />

          <div className="absolute bottom-[-250px] left-[-150px] w-[450px] h-[450px] rounded-full bg-violet-600/5 blur-[120px]" />

          <div className="absolute top-1/2 right-[-200px] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

        </div>

        {/* Chat */}
        <div className="relative h-full">
          <Chats />
        </div>

      </main>

    </div>
  );
}

export default App;