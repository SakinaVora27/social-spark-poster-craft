
import { toast } from "sonner";

const GEMINI_API_KEY = "AIzaSyC99WN3lUwRQmd3D8HwUwhsW2fGA7hDWr8";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GenerateContentRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateContentResponse {
  content: string;
  error?: string;
}

export async function generateContent({ prompt, maxTokens = 800, temperature = 0.7 }: GenerateContentRequest): Promise<GenerateContentResponse> {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: temperature,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.error?.message || 'Failed to generate content';
      toast.error(errorMessage);
      return { content: '', error: errorMessage };
    }

    // Extract the generated text from the response
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { content: generatedContent };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    toast.error(`Error generating content: ${errorMessage}`);
    return { content: '', error: errorMessage };
  }
}
