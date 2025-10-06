import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Exportamos uma flag para que a UI saiba se o serviço está configurado
export const isGeminiConfigured = !!API_KEY;

let ai: GoogleGenAI | null = null;
if (isGeminiConfigured) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const suggestRecipe = async (productName: string): Promise<string> => {
  if (!ai) {
    return "A funcionalidade de sugestão de receitas não está configurada. O administrador do site precisa configurar uma chave de API do Google Gemini.";
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
