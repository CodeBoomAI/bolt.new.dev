import { createOpenAI } from '@ai-sdk/openai';

const models = [
  'qwen/qwen3-coder:free',
  'google/gemma-2b-it:free',
  'mistralai/mistral-7b-instruct:free'
];

export function getAIModel(apiKey: string, index = 0) {
  const openrouter = createOpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
  });

  return openrouter(models[index] || models[0]);
}