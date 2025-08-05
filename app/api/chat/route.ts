import { NextResponse } from 'next/server';

// Esta função lida com as requisições POST para a rota /api/chat.
export async function POST(request: Request) {
  try {
    // Extrai a mensagem do corpo da requisição.
    const { message } = await request.json();

    // Valida se a mensagem foi recebida.
    if (!message) {
      return NextResponse.json({ error: 'A mensagem é obrigatória.' }, { status: 400 });
    }

    // Obtém a URL do webhook do n8n a partir das variáveis de ambiente.
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    // Valida se a URL do webhook está configurada.
    if (!webhookUrl) {
      console.error('A variável de ambiente N8N_WEBHOOK_URL não está definida.');
      return NextResponse.json({ error: 'A configuração do servidor está incompleta.' }, { status: 500 });
    }

    // Envia a mensagem do utilizador para o webhook do n8n.
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    // Verifica se a resposta do n8n foi bem-sucedida.
    if (!n8nResponse.ok) {
      const errorBody = await n8nResponse.text();
      console.error(`Erro ao chamar o webhook do n8n: ${n8nResponse.status} ${n8nResponse.statusText}`, errorBody);
      return NextResponse.json({ error: 'Ocorreu um erro ao comunicar com o agente de IA.' }, { status: n8nResponse.status });
    }

    // Extrai a resposta da IA do corpo da resposta do n8n.
    const n8nData = await n8nResponse.json();
    const aiResponse = n8nData.output; // Assumindo que o n8n retorna um objeto com a chave "output".

    // Retorna a resposta da IA para o cliente.
    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    // Lida com erros inesperados durante o processo.
    console.error('Erro inesperado na rota de chat:', error);
    return NextResponse.json({ error: 'Ocorreu um erro interno no servidor.' }, { status: 500 });
  }
}
