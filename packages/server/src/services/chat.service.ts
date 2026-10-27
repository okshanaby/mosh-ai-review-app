import { readFileSync } from 'node:fs';

import { conversationRepository } from '../repositories/conversation.repository';
import promptTemplate from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

const instructionFileURL = new URL('../prompts/WonderWorld.md', import.meta.url);
const instructionData = readFileSync(instructionFileURL, 'utf8');

const instructions = promptTemplate.replace('{{parkInfo}}', instructionData);

type ChatResponse = {
  id: string;
  message: string;
};

// Public Interface
export const chatService = {
  async sendMessage(conversationId: string, prompt: string): Promise<ChatResponse> {
    const response = await llmClient.generateText({
      input: prompt,
      instructions,
      previousResponseId: conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.text,
    };
  },
};
