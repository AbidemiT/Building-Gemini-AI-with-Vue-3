import {useGenAi} from './useGenAi.js'
import {useFileToGeneratePart} from './useFileToGeneratePart.js';

export const useGetGenerativeModelGPV = async (prompt, files) => {
    const model = await useGenAi("gemini-pro-vision");

    console.log({model});

  const imageParts = await Promise.all(
    [...files].map(useFileToGeneratePart)
  );
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  
  return text;
}