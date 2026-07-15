import { OpenRouter } from "@openrouter/sdk";
import { config } from "../env";

export const aiClient = new OpenRouter({
  apiKey: config.ai.apiKey,
});
