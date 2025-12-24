const MISTRAL_API_URL = 'https://api.mistral.ai/v1';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MistralChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
  };
}

export async function sendChatMessage(
  apiKey: string,
  messages: ChatMessage[],
  model: string = 'mistral-small-latest'
): Promise<string> {
  const response = await fetch(`${MISTRAL_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erreur API Mistral: ${response.status}`);
  }

  const data: MistralChatResponse = await response.json();
  return data.choices[0]?.message?.content || '';
}

export function getApiKey(): string | null {
  return localStorage.getItem('mistral_api_key');
}

export function setApiKey(key: string): void {
  localStorage.setItem('mistral_api_key', key);
}

export function removeApiKey(): void {
  localStorage.removeItem('mistral_api_key');
}
