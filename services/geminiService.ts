
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is set in your environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we'll throw an error if the key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestRecipe = async (productName: string): Promise<string> => {
  if (!API_KEY) {
    return "A chave da API do Gemini não foi configurada. Não é possível sugerir receitas.";
  }

  try {
    const prompt = `Você é um assistente de culinária criativo. Crie uma receita simples e rápida usando "${productName}". A receita deve ser fácil de seguir, com ingredientes comuns. Formate a resposta de forma clara com "Ingredientes" e "Modo de Preparo".`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching recipe from Gemini API:", error);
    return "Desculpe, não foi possível gerar uma receita no momento. Tente novamente mais tarde.";
  }
};
