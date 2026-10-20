// Web Worker som kör språkmodellen, skild från sidan så att lektionerna inte påverkas.
import { WebWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg) => handler.onmessage(msg);
