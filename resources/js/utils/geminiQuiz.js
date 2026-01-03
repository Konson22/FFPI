import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Generate quiz questions using Google Gemini AI
 * @param {string} apiKey - Gemini API key
 * @param {string} category - Category/topic for the quiz
 * @param {string} content - Lesson content to base questions on
 * @param {number} count - Number of questions to generate (default: 5)
 * @returns {Promise<Array>} Array of quiz questions
 */
export async function generateQuizQuestions(apiKey, category, content, count = 5) {
    if (!apiKey) {
        throw new Error('Gemini API key is required');
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
        "type": "single_choice",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer": "The correct option text exactly as it appears in options",
        "explanation": "Brief explanation of the correct answer",
        "points": 10
    }
]

${baseInstruction} Each question should be different from the others. Ensure each correct_answer matches exactly one of the options array values for that question.`;

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
                type: quizData.type || 'single_choice',
                options: quizData.options,
                correct_answer: quizData.correct_answer,
                correct_answers: [quizData.correct_answer],
                explanation: quizData.explanation || null,
                points: quizData.points || 10,
            });
        }

        if (quizzes.length === 0) {
            throw new Error('No valid quizzes generated');
        }

        return quizzes;
    } catch (error) {
        console.error('Error generating quiz questions:', error);
        throw error;
    }
}

