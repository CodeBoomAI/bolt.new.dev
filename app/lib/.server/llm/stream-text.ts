import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { getOpenRouterModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export async function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  try {
    return await _streamText({
      model: getOpenRouterModel(getAPIKey(env)),
      system: getSystemPrompt(),
      maxTokens: MAX_TOKENS,
      headers: {
        'HTTP-Referer': 'https://improved-xylophone-q795w4jxw6v72947q-5173.app.github.dev', // 🔗 Ganti dengan URL aplikasimu
        'X-Title': 'Bolt.new AI Editor',         // 📝 Nama aplikasi, bukan model
      },
      messages: convertToCoreMessages(messages),
      ...options,
    });
  } catch (error: any) {
    if (error.message?.includes('free-models-per-day')) {
      throw new Error(
        'Hari ini kuota model gratis telah habis. ' +
        'Silakan kunjungi https://openrouter.ai/credits dan tambahkan 10 kredit ' +
        'untuk mendapatkan 1000 permintaan gratis per hari.'
      );
    }
    // Re-throw error lainnya
    throw error;
  }
}