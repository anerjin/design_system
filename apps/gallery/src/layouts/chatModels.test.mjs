import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeOpenRouterModels } from './chatModels.ts';

test('normalizes API IDs and per-token prices without inventing missing metadata', () => {
  const [model, unknown] = normalizeOpenRouterModels({
    data: [
      {
        id: 'openai/test',
        name: 'Test',
        context_length: 128000,
        pricing: { prompt: '0.000002', completion: '0' },
      },
      { id: 'custom/test', name: 'Custom', pricing: { prompt: '-1', completion: 'invalid' } },
    ],
  });
  assert.equal(model.developer, 'OpenAI');
  assert.equal(model.contextLength, 128000);
  assert.equal(model.inputPrice, 0.000002);
  assert.equal(model.outputPrice, 0);
  assert.equal(unknown.contextLength, null);
  assert.equal(unknown.inputPrice, null);
  assert.equal(unknown.outputPrice, null);
});
test('filters non-text output and invalid entries; deduplicates model IDs', () => {
  const models = normalizeOpenRouterModels({
    data: [
      null,
      {},
      { id: 'image/only', name: 'Image', architecture: { output_modalities: ['image'] } },
      { id: 'text/model', name: 'Old' },
      { id: 'text/model', name: 'Current', architecture: { output_modalities: ['text', 'image'] } },
    ],
  });
  assert.equal(models.length, 1);
  assert.equal(models[0].name, 'Current');
});
test('rejects unexpected API envelopes', () => {
  for (const payload of [null, {}, { error: 'failed' }, { data: 'invalid' }]) {
    assert.throws(() => normalizeOpenRouterModels(payload));
  }
});

test('does not interpret blank API metadata as free pricing or render nameless models', () => {
  const models = normalizeOpenRouterModels({
    data: [
      { id: 'custom/blank', name: '   ' },
      { id: 'custom/model', name: 'Custom', context_length: ' ', pricing: { prompt: '\t', completion: '0' } },
    ],
  });
  assert.equal(models.length, 1);
  assert.equal(models[0].contextLength, null);
  assert.equal(models[0].inputPrice, null);
  assert.equal(models[0].outputPrice, 0);
});
