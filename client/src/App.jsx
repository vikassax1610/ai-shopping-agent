import ChatContainer from "./components/ChatContainer";
import Header from "./components/Header";
function App() {
  return (
    <div className="min-h-screen w-screen bg-[#09090b] text-zinc-100 flex flex-col overflow-hidden">

      {/* Header */}
      <Header />
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
          <ChatContainer />
        </div>

      </main>

    </div>
  );
}

export default App;