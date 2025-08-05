import Comp590 from "@/components/comp-590";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900">
      <Comp590 />
      <div className="flex-1 flex items-center justify-center">
        <ChatLayout />
      </div>
    </main>
  );
}
