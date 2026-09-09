export interface ChatModel {
  id: string;
  name: string;
  developer: string;
  contextLength: number | null;
  inputPrice: number | null;
  outputPrice: number | null;
}

const developers: Record<string, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  deepseek: 'DeepSeek',
  'meta-llama': 'Meta',
  mistralai: 'Mistral',
  qwen: 'Qwen',
  'x-ai': 'xAI',
  cohere: 'Cohere',
};

/** Accepts OpenRouter GET /api/v1/models payloads. Chat only uses text-output models. */
export function normalizeOpenRouterModels(payload: unknown): ChatModel[] {
  if (!payload || typeof payload !== 'object' || !('data' in payload) || !Array.isArray(payload.data)) {
    throw new Error('모델 목록 응답 형식이 올바르지 않습니다.');
  }
  const numeric = (value: unknown) => {
    if (
      (typeof value !== 'string' && typeof value !== 'number') ||
      (typeof value === 'string' && !value.trim())
    )
      return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  };
  const models = new Map<string, ChatModel>();
  for (const entry of payload.data) {
    if (
      !entry ||
      typeof entry !== 'object' ||
      typeof entry.id !== 'string' ||
      !entry.id.trim() ||
      typeof entry.name !== 'string' ||
      !entry.name.trim()
    )
      continue;
    const outputs = entry.architecture?.output_modalities;
    if (Array.isArray(outputs) && !outputs.includes('text')) continue;
    const author = entry.id.split('/')[0];
    models.set(entry.id, {
      id: entry.id,
      name: entry.name,
      developer: developers[author] ?? author,
      contextLength: numeric(entry.context_length),
      inputPrice: numeric(entry.pricing?.prompt),
      outputPrice: numeric(entry.pricing?.completion),
    });
  }
  return [...models.values()];
}

// UI examples only; availability and pricing come from the API once connected.
export const exampleChatModels = normalizeOpenRouterModels({
  data: [
    ['openai/gpt-4.1', 'GPT-4.1'],
    ['openai/gpt-4.1-mini', 'GPT-4.1 Mini'],
    ['openai/gpt-4.1-nano', 'GPT-4.1 Nano'],
    ['openai/gpt-4o', 'GPT-4o'],
    ['openai/gpt-4o-mini', 'GPT-4o Mini'],
    ['openai/o3', 'o3'],
    ['openai/o4-mini', 'o4 Mini'],
    ['anthropic/claude-sonnet-4', 'Claude Sonnet 4'],
    ['anthropic/claude-opus-4', 'Claude Opus 4'],
    ['anthropic/claude-3.7-sonnet', 'Claude 3.7 Sonnet'],
    ['anthropic/claude-3.5-haiku', 'Claude 3.5 Haiku'],
    ['google/gemini-2.5-pro', 'Gemini 2.5 Pro'],
    ['google/gemini-2.5-flash', 'Gemini 2.5 Flash'],
    ['google/gemini-2.0-flash-001', 'Gemini 2.0 Flash'],
    ['deepseek/deepseek-chat-v3-0324', 'DeepSeek V3'],
    ['deepseek/deepseek-r1', 'DeepSeek R1'],
    ['meta-llama/llama-4-maverick', 'Llama 4 Maverick'],
    ['meta-llama/llama-4-scout', 'Llama 4 Scout'],
    ['mistralai/mistral-small-3.1-24b-instruct', 'Mistral Small 3.1'],
    ['mistralai/codestral-2501', 'Codestral'],
    ['qwen/qwen3-235b-a22b', 'Qwen3 235B'],
    ['qwen/qwen3-32b', 'Qwen3 32B'],
    ['x-ai/grok-3', 'Grok 3'],
    ['cohere/command-a', 'Command A'],
  ].map(([id, name]) => ({ id, name })),
});

export function readModelPreferences(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === 'string'))].slice(0, 100)
      : [];
  } catch {
    return [];
  }
}
export function saveModelPreferences(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* Selection still works without storage. */
  }
}
