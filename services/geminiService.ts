
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const initChat = (): Chat => {
  const genAI = getAI();
  return genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are Jessica, a friendly and helpful customer support agent for an e-commerce store. Your tone is cheerful and approachable. You assist users with product questions, promotions, and order inquiries. Keep your responses concise and clear.',
    },
  });
};

export const sendMessageToBot = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having a little trouble right now. Please try again in a moment.";
  }
};
