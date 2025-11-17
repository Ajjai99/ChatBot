// This service now acts as a client to your own backend, which in turn calls the AI model.

// IMPORTANT: Replace this with your actual API Gateway endpoint URL
const API_GATEWAY_URL = 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/chat';

/**
 * Initializes the chat session.
 * With a backend setup, this could be used to get a session ID.
 * For now, it doesn't need to do anything.
 * @returns {null}
 */
export const initChat = (): null => {
  return null;
};

/**
 * Sends a message to the backend and gets the bot's response.
 * @param {any} chat - The chat session object (can be null if managed by the backend).
 * @param {string} message - The user's message.
 * @returns {Promise<string>} The bot's response text.
 */
export const sendMessageToBot = async (chat: any, message: string): Promise<string> => {
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        // You could also include a session_id here to maintain conversation history
        // sessionId: 'some-unique-id' 
      }),
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return "I'm having a little trouble right now. Please try again in a moment.";
    }

    const data = await response.json();

    // Assuming your Lambda returns a JSON object like: { "reply": "Hello from the bot!" }
    // Adjust 'data.reply' to match the actual structure of your backend's response.
    return data.reply || "Sorry, I didn't get a valid response.";

  } catch (error) {
    console.error("Error sending message to backend:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
