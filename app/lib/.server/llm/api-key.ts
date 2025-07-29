import { env } from 'node:process';

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * Prioritas:
   * 1. Gunakan OPENROUTER_API_KEY jika tersedia (lebih spesifik)
   * 3. Fallback ke cloudflareEnv (saat di-deploy)
   */
  return (
    env.OPENROUTER_API_KEY ||
    cloudflareEnv.OPENROUTER_API_KEY 
  );
}