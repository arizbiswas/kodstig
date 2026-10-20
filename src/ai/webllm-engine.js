// Den riktiga modellen: WebLLM i en separat Web Worker med WebGPU.
// Den här filen importeras dynamiskt först när användaren startar Milo,
// så ingen del av modellen eller biblioteket hämtas innan dess.

export async function createWebLLMEngine({ model, onProgress, signal }) {
  const webllm = await import('@mlc-ai/web-llm');
  const worker = new Worker(new URL('./milo-worker.js', import.meta.url), { type: 'module' });
  const kill = () => { try { worker.terminate(); } catch { /* ignore */ } };
  if (signal) {
    if (signal.aborted) { kill(); throw new Error('Avbrutet'); }
    signal.addEventListener('abort', kill, { once: true });
  }
  let engine;
  try {
    engine = await Promise.race([
      webllm.CreateWebWorkerMLCEngine(worker, model, { initProgressCallback: (r) => onProgress && onProgress(r) }),
      new Promise((_, reject) => signal && signal.addEventListener('abort', () => reject(new Error('Avbrutet')), { once: true })),
    ]);
  } catch (e) {
    kill();
    throw e;
  }
  return {
    async chat(messages, { max_tokens }) {
      const stream = await engine.chat.completions.create({
        messages,
        stream: true,
        max_tokens,
        temperature: 0.7,
        top_p: 0.9,
        extra_body: { enable_thinking: false },
      });
      return (async function* () {
        for await (const chunk of stream) {
          const d = chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content;
          if (d) yield d;
        }
      })();
    },
    interrupt() { engine.interruptGenerate(); },
    async unload() { try { await engine.unload(); } finally { kill(); } },
  };
}
