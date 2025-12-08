import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getHealthAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API 密钥缺失，请配置环境。";
  }

  try {
    const model = 'gemini-2.5-flash';
    // Updated system instruction for Chinese responses suitable for women 30-50
    const systemInstruction = "你是一位专业、温柔且富有同理心的女性乳腺健康助手。你的服务对象是30-50岁的女性。请用中文回答。建议应当清晰、准确且令人安心。回答要简洁（200字以内），避免使用过于晦涩的专业术语，像知心朋友一样交流。请注意：不要提供确切的医疗诊断，若情况严重请建议用户就医。";
    
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
      }
    });

    return response.text || "抱歉，我现在无法生成建议，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "无法获取健康建议，请稍后再试。";
  }
};