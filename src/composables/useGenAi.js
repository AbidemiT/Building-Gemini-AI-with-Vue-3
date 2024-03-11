import { GoogleGenerativeAI } from '@google/generative-ai'

export const useGenAi = async (modelType) => {
  const VITE_GOOGLE_AI_STUDIO_API_KEY = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY

  const genAI = new GoogleGenerativeAI(VITE_GOOGLE_AI_STUDIO_API_KEY)
  const model = genAI.getGenerativeModel({ model: modelType })

  return model
}
