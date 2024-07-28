import OpenAI from "openai";
import TelegramSyncPlugin from "../main";

export async function generateText(plugin: TelegramSyncPlugin, prompt: string): Promise<string> {
	try {
		const apiKey = plugin.settings.openAIKey; // Достаем API ключ из настроек

		if (!apiKey) {
			throw new Error("OpenAI API key is not set. Please provide your API key in the settings.");
		}

		const openai = new OpenAI({
			apiKey: apiKey,
			dangerouslyAllowBrowser: true, // Используйте с осторожностью
		});

		const response = await openai.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-4o-mini",
		});

		// @ts-ignore
		return response.choices[0].message.content.trim();
	} catch (error) {
		console.error("Error generating text with OpenAI API:", error);
		return "An error occurred while processing your request.";
	}
}
