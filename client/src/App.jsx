import Chats from "./components/Chats";

function App() {

  return (
    <>
      <div className="bg-zinc-950 w-screen h-screen flex flex-col items-center justify-between">

        <h1 className="text-md font-bold bg-zinc-900 border-b border-zinc-600 w-full text-center text-zinc-50 uppercase border-zinc-50 p-4">Your personal <span className="text-pink-400">AI</span> shopping assistant</h1>
        <Chats />
      </div>
    </>
  )
}

export default App
