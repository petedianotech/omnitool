import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function generateOgImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A professional, modern, and beautiful abstract graphic for a productivity app called OmaxTool. The design should be clean, minimalist, and use a vibrant blue and indigo color palette. High quality, 1200x630 aspect ratio.',
        },
      ],
    },
    config: {
      imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
        },
    },
  });
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      const imageUrl = `data:image/png;base64,${base64EncodeString}`;
      console.log(imageUrl);
    }
  }
}

generateOgImage();
