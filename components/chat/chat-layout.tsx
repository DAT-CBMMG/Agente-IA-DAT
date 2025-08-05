"use client"

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

interface Message {
  role: 'user' | 'agent';
  content: any;
}

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: { type: 'text', content: message } }];
    setMessages(newMessages);

    setMessages(currentMessages => [...currentMessages, { role: 'agent', content: { type: 'text', content: 'A pensar...' } }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      setMessages(currentMessages => currentMessages.slice(0, -1));

      if (!response.ok) {
        const errorData = await response.json();
        setMessages(currentMessages => [...currentMessages, { role: 'agent', content: { type: 'text', content: `Erro: ${errorData.error || 'Não foi possível obter uma resposta.'}` } }]);
        return;
      }

      const data = await response.json();
      setMessages(currentMessages => [...currentMessages, { role: 'agent', content: data.response }]);

    } catch (error) {
      setMessages(currentMessages => currentMessages.slice(0, -1));
      setMessages(currentMessages => [...currentMessages, { role: 'agent', content: { type: 'text', content: 'Erro: Não foi possível ligar ao servidor.' } }]);
    }
  };

  return (
    <div className="w-[760px] h-[80vh] grid grid-rows-[1fr_auto]">
      <ScrollArea className="h-full pr-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-2">Olá, qual sua dúvida no sistema Infoscip fiscalizaçao?</h2>
            <div className="flex gap-4 mt-4">
              <div className="p-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg" onClick={() => handleSendMessage("Como cadastrar um processo?")}>
                <p>Como cadastrar um processo?</p>
              </div>
              <div className="p-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg" onClick={() => handleSendMessage("Como responder a um pedido de defesa?")}>
                <p>Como responder a um pedido de defesa?</p>
              </div>
              <div className="p-4 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg" onClick={() => handleSendMessage("Como analisar um recurso?")}>
                <p>Como analisar um recurso?</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
          </div>
        )}
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
