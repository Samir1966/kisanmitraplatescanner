
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    plantName: {
      type: Type.STRING,
      description: "The common name of the plant species identified in the image."
    },
    isHealthy: {
      type: Type.BOOLEAN,
      description: "A boolean indicating if the plant appears to be healthy."
    },
    disease: {
      type: Type.OBJECT,
      nullable: true,
      description: "Information about the disease if the plant is not healthy. Null if healthy.",
      properties: {
        name: {
          type: Type.STRING,
          description: "The name of the disease affecting the plant."
        },
        description: {
          type: Type.STRING,
          description: "A brief description of the disease, its symptoms, and causes."
        },
        solution: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: "A list of clear, actionable, step-by-step solutions to treat the disease."
        }
      }
    }
  },
  required: ['plantName', 'isHealthy', 'disease']
};


export async function analyzePlantImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  const model = "gemini-2.5-flash";

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };
  
  const textPart = {
    text: "You are an expert botanist and plant pathologist. Analyze the provided image of a plant. First, identify the plant species. Second, determine if the plant is healthy or suffering from any diseases. If a disease is present, identify the disease, provide a brief description of it, and list clear, actionable, step-by-step solutions to treat it. If the plant is healthy, confirm that by setting `isHealthy` to true and `disease` to null. Provide your response in the specified JSON format.",
  };

  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2,
    },
  });
  
  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse JSON response:", jsonText);
    throw new Error("Received an invalid response from the AI model.");
  }
}
