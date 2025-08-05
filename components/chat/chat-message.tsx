import { Button } from "@/components/ui/button";
import { Copy, Flame } from "lucide-react";

type Content = 
  | string
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; content: string };

interface MessageProps {
  role: 'user' | 'agent';
  content: Content;
}

export function ChatMessage({ role, content }: MessageProps) {
  const renderContent = () => {
    if (typeof content === 'string' || (content && content.type === 'text')) {
      const textContent = typeof content === 'string' ? content : content.content;
      const cleanedText = textContent.replace(/(\*\*|__|`|#+\s*)/g, '');
      const paragraphs = cleanedText.split('\n').map((paragraph: string, index: number) => (
        <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{paragraph}</p>
      ));
      return <div>{paragraphs}</div>;
    }

    switch (content.type) {
      case 'list':
        return (
          <ul>
            {content.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'code':
        return (
          <div className="relative">
            <pre className="bg-gray-800 text-white p-4 rounded-md pr-12">
              <code>{content.content}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => navigator.clipboard.writeText(content.content)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        );
      default:
        return <p>{JSON.stringify(content)}</p>;
    }
  };

  return (
    <div
      className={`flex gap-3 text-slate-600 text-sm ${
        role === 'user' ? 'justify-end' : ''
      }`}
    >
      {role === 'agent' && (
        <Flame className="text-red-500" />
      )}
      <div className={`leading-relaxed ${
          role === 'user' 
            ? 'bg-gray-800 text-white rounded-e-xl rounded-es-xl p-3' 
            : ''
        }`}
      >
        <span className="block font-bold text-slate-700">
          {role === 'user' ? '' : 'Agente'}
        </span>
        {renderContent()}
      </div>
    </div>
  );
}
