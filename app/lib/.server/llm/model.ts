import { createOpenAI } from '@ai-sdk/openai'; 

export function getOpenRouterModel(apiKey: string) {
  const openrouter = createOpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1', // Endpoint OpenRouter
    organization: '', // Opsional (OpenRouter tidak memerlukan ini)
  });

  // Gunakan format model OpenRouter: 'provider/model-name'
  return openrouter('qwen/qwen3-coder:free');
}