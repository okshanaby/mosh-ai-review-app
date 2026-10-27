import type { Request, Response } from 'express';
import OpenAI from 'openai';

// Implementation details
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GeneratetdTextResponse = {
  id: string;
  text: string;
};

type GenerateTextOptions = {
  model?: string;
  input: string;
  instructions?: string;
  temperature?: number;
  maxOutputTokens?: number;
  previousResponseId?: string;
};

// Public Interface
export const llmClient = {
  async generateText({
    model = 'gpt-4o-mini',
    input,
    instructions,
    temperature = 0.2,
    maxOutputTokens = 200,
    previousResponseId,
  }: GenerateTextOptions): Promise<GeneratetdTextResponse> {
    const response = await client.responses.create({
      model,
      input,
      instructions,
      temperature,
      max_output_tokens: maxOutputTokens,
      previous_response_id: previousResponseId,
    });

    return {
      id: response.id,
      text: response.output_text,
    };
  },
};
