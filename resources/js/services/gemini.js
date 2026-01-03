import { GoogleGenerativeAI } from "@google/generative-ai";

// Choose a model that supports generateContent
const MODEL_NAME = "gemini-2.0-flash"; 

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Sleep/delay utility function
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in milliseconds
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if it's a rate limit error (429) or resource exhausted error
      // Handle various error formats from Google Generative AI SDK
      const errorMessage = error.message || error.toString() || '';
      const errorStatus = error.status || error.statusCode || error.code;
      
      const isRateLimitError = 
        errorStatus === 429 ||
        errorMessage.includes('429') ||
        errorMessage.includes('Resource exhausted') ||
        errorMessage.includes('RESOURCE_EXHAUSTED') ||
        errorMessage.includes('resource exhausted') ||
        errorMessage.includes('quota') ||
        errorMessage.includes('rate limit');
      
      const isNetworkError = 
        errorMessage.includes('network') ||
        errorMessage.includes('ECONNRESET') ||
        errorMessage.includes('ETIMEDOUT') ||
        errorMessage.includes('timeout');
      
      // Retry on rate limit errors with exponential backoff
      if (isRateLimitError && attempt < maxRetries) {
        // Exponential backoff with longer delays for rate limits
        // Delay: 2s, 4s, 8s for attempts 1, 2, 3
        const delay = initialDelay * Math.pow(2, attempt);
        console.warn(`Rate limit hit. Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      
      // Retry on network errors with shorter delays
      if (isNetworkError && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.warn(`Network error. Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      
      // If we've exhausted retries or it's not a retryable error, throw
      throw error;
    }
  }
  
  throw lastError;
}

export async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    return "Configuration error: missing API key.";
  }

  try {
    return await retryWithBackoff(async () => {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      // Create a system prompt that restricts responses to health, family, relationships, and SRHR topics
      const systemPrompt = `You are a helpful AI assistant specialized in health, family planning, relationships, and Sexual and Reproductive Health and Rights (SRHR) topics. 

IMPORTANT: You should ONLY respond to questions related to:
- Health and wellness
- Family planning and contraception
- Relationships and communication
- Sexual and reproductive health
- Mental health and emotional wellbeing
- Pregnancy and parenting
- Gender and sexuality
- Consent and safety
- Healthcare access and information

If the user asks about topics outside these areas (like technology, cooking, travel, etc.), politely redirect them by saying: "I'm specialized in health, family, relationships, and SRHR topics. I'd be happy to help you with questions about health, family planning, relationships, or sexual and reproductive health instead. What would you like to know about these topics?"

User's question: ${prompt}`;

      const response = await model.generateContent(systemPrompt);

      // The SDK response may vary, this extracts the generated text
      const text = response.response.text() || "⚠️ No response from Gemini.";

      return text;
    });
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    
    // Check for rate limit errors
    const errorMessage = error.message || error.toString() || '';
    const errorStatus = error.status || error.statusCode || error.code;
    
    const isRateLimitError = 
      errorStatus === 429 ||
      errorMessage.includes('429') ||
      errorMessage.includes('Resource exhausted') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.includes('resource exhausted') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('rate limit');
    
    if (isRateLimitError) {
      return "⚠️ The AI service is currently experiencing high demand. Please wait a moment and try again. If the issue persists, please try again in a few minutes.";
    }
    
    return `⚠️ Error communicating with Gemini: ${errorMessage || 'Unknown error'}`;
  }
}

/**
 * Generate quiz questions using Google Gemini AI
 * @param {string} category - Category/topic for the quiz
 * @param {string} content - Lesson content to base questions on
 * @param {number} count - Number of questions to generate (default: 5)
 * @returns {Promise<Array>} Array of quiz questions
 */
export async function generateQuizQuestions(category, content, count = 5) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is required');
  }

  try {
    return await retryWithBackoff(async () => {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      // Build the prompt
      const categoryPart = category ? ` about ${category}` : '';
      let contentInstruction = '';
      
      if (content && content.trim().length > 10) {
        // Strip HTML tags and clean the content
        let cleanContent = content.replace(/<[^>]*>/g, '');
        cleanContent = cleanContent.replace(/\s+/g, ' ').trim();
        // Limit to 2000 characters
        cleanContent = cleanContent.substring(0, 2000);
        contentInstruction = `\n\nBased on the following lesson content:\n${cleanContent}\n\n`;
      }

      const baseInstruction = contentInstruction 
        ? 'Each question should be educational, appropriate, and directly based on the lesson content provided above.'
        : `Each question should be educational and appropriate${categoryPart}.`;

      const prompt = `Generate exactly ${count} different quiz questions${categoryPart} related to family planning, reproductive health, or sexual education.${contentInstruction}Return ONLY a valid JSON array in this exact format (no markdown, no code blocks, no extra text):
[
    {
        "question": "The question text here",
        "type": "multiple_choice",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer": "The correct option text exactly as it appears in options",
        "explanation": "Brief explanation of the correct answer",
        "points": 1
    }
]

${baseInstruction} Each question should be different from the others. Ensure each correct_answer matches exactly one of the options array values for that question. Use "multiple_choice" for single-select questions, "true_false" for true/false questions, or "multiple_select" for questions with multiple correct answers.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Clean the response - remove markdown code blocks if present
      let cleanText = text.trim();
      cleanText = cleanText.replace(/^```json\s*/i, '');
      cleanText = cleanText.replace(/^```\s*/i, '');
      cleanText = cleanText.replace(/\s*```$/i, '');
      cleanText = cleanText.trim();

      // Parse JSON
      const data = JSON.parse(cleanText);

      // If single object, wrap in array
      if (data.question) {
        return [data];
      }

      // Ensure it's an array
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid response format from AI');
      }

      // Validate and format quizzes
      const quizzes = [];
      for (let i = 0; i < data.length; i++) {
        const quizData = data[i];
        
        if (!quizData.question || !quizData.options || !quizData.correct_answer) {
          continue;
        }

        if (!Array.isArray(quizData.options) || quizData.options.length === 0) {
          continue;
        }

        if (!quizData.options.includes(quizData.correct_answer)) {
          continue;
        }

        quizzes.push({
          id: i + 1,
          question: quizData.question,
          type: quizData.type || 'multiple_choice',
          options: quizData.options,
          correct_answer: quizData.correct_answer,
          correct_answers: Array.isArray(quizData.correct_answers) ? quizData.correct_answers : [quizData.correct_answer],
          explanation: quizData.explanation || null,
          points: quizData.points || 1,
        });
      }

      if (quizzes.length === 0) {
        throw new Error('No valid quizzes generated');
      }

      return quizzes;
    }, 3, 2000); // 3 retries with 2 second initial delay
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    
    // Check for rate limit errors and provide user-friendly message
    const errorMessage = error.message || error.toString() || '';
    const errorStatus = error.status || error.statusCode || error.code;
    
    const isRateLimitError = 
      errorStatus === 429 ||
      errorMessage.includes('429') ||
      errorMessage.includes('Resource exhausted') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.includes('resource exhausted') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('rate limit');
    
    if (isRateLimitError) {
      const rateLimitError = new Error(
        'The AI service is currently experiencing high demand. Please wait a moment and try again. If the issue persists, please try again in a few minutes.'
      );
      rateLimitError.isRateLimit = true;
      throw rateLimitError;
    }
    
    throw error;
  }
}
