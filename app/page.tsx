import Comp590 from "@/components/comp-590";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900">
      <Comp590 />
      <div className="flex-1 flex md:items-center md:justify-center overflow-hidden">
        <ChatLayout />
      </div>
    </main>
  );
}
