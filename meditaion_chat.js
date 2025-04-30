// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatbotIcon = document.querySelector("#chatbotIcon");
    const chatbotContainer = document.querySelector("#chatbotContainer");
    const chatbotClose = document.querySelector("#chatbotClose");
    const chatbotMessages = document.querySelector("#chatbotMessages");
    const chatbotInput = document.querySelector("#chatbotInput");
    const chatbotSend = document.querySelector("#chatbotSend");
    const meditationBtn = document.querySelector("#meditation-btn");
    const breathingBtn = document.querySelector("#breathing-btn");
    const tipsBtn = document.querySelector("#tips-btn");

    // Gemini API Configuration
    const GEMINI_API_KEY = 'AIzaSyC23KwKAZ1IgRrioxn9rl5qPmeMzeYr7Ro';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    // System prompt for meditation and wellness context
    const SYSTEM_PROMPT = `You are an AI Meditation, Yoga, and Wellness Guide with expertise in both traditional Indian practices and modern techniques. Your knowledge includes:

1. Traditional Indian Yoga (योग):
   - Ashtanga Yoga (अष्टांग योग)
   - Hatha Yoga (हठ योग)
   - Kundalini Yoga (कुंडलिनी योग)
   - Iyengar Yoga (आयंगर योग)
   - Kriya Yoga (क्रिया योग)
   - Mantra Yoga (मंत्र योग)
   - Raja Yoga (राज योग)
   - Jnana Yoga (ज्ञान योग)
   - Bhakti Yoga (भक्ति योग)
   - Karma Yoga (कर्म योग)
   - Traditional Asanas (आसन)
   - Mudras (मुद्रा)
   - Bandhas (बंध)
   - Shatkarmas (षट्कर्म)

2. Indian Meditation Practices:
   - Dhyana (ध्यान)
   - Vipassana (विपश्यना)
   - Transcendental Meditation (TM)
   - Yoga Nidra (योग निद्रा)
   - Antar Mouna (अंतर मौन)
   - Ajapa Japa (अजपा जप)
   - Trataka (त्राटक)
   - Chakra Meditation (चक्र ध्यान)
   - Mantra Meditation (मंत्र ध्यान)
   - Nada Yoga (नाद योग)

3. Pranayama (प्राणायाम):
   - Anulom Vilom (अनुलोम विलोम)
   - Kapalbhati (कपालभाति)
   - Bhastrika (भस्त्रिका)
   - Ujjayi (उज्जायी)
   - Bhramari (भ्रामरी)
   - Sheetali (शीतली)
   - Sheetkari (शीत्कारी)
   - Surya Bhedana (सूर्य भेदन)
   - Chandra Bhedana (चंद्र भेदन)

4. Ayurvedic Practices (आयुर्वेद):
   - Dosha balancing
   - Dinacharya (दिनचर्या)
   - Ritucharya (ऋतुचर्या)
   - Panchakarma (पंचकर्म)
   - Ayurvedic diet
   - Herbal remedies
   - Abhyanga (अभ्यंग)
   - Shirodhara (शिरोधारा)
   - Nasya (नस्य)

5. Traditional Indian Wellness:
   - Shatkriyas (षट्क्रियाएं)
   - Marma points
   - Ayurvedic massage
   - Yoga therapy
   - Traditional Indian diet
   - Seasonal routines
   - Detox practices
   - Energy healing
   - Sound healing with Indian instruments

6. Modern Adaptations:
   - Contemporary yoga styles
   - Fusion practices
   - Modern meditation techniques
   - Wellness technology
   - Scientific research on yoga
   - Integration with modern medicine

Always respond in a calm, soothing tone. When discussing Indian practices:
- Include Sanskrit terms with their meanings
- Explain the traditional context
- Provide proper pronunciation guides
- Mention contraindications and safety
- Share the spiritual and philosophical aspects
- Include step-by-step instructions
- Explain the benefits and purpose

For yoga asanas, include:
- Proper alignment (संरेखण)
- Breathing pattern (श्वास प्रणाली)
- Duration (अवधि)
- Benefits (लाभ)
- Precautions (सावधानियां)
- Modifications (संशोधन)

For meditation, provide:
- Preparation steps
- Sitting posture
- Focus techniques
- Duration guidance
- Common challenges
- Progress indicators

For yoga-related questions, include proper alignment cues and safety precautions.
For meditation, provide step-by-step guidance.
For breathing exercises, include timing and benefits.
For wellness tips, offer practical, actionable advice.`;

    // Debug logs to verify elements
    console.log('Chatbot Elements:', {
        icon: chatbotIcon,
        container: chatbotContainer,
        close: chatbotClose,
        messages: chatbotMessages,
        input: chatbotInput,
        send: chatbotSend,
        meditationBtn,
        breathingBtn,
        tipsBtn
    });

    // Add event listeners for chatbot icon and close button
    chatbotIcon.addEventListener("click", (e) => {
        console.log('Chatbot icon clicked');
        e.stopPropagation();
        chatbotContainer.classList.add("active");
        chatbotIcon.style.display = "none";
        chatbotInput.focus();
    });

    chatbotClose.addEventListener("click", (e) => {
        console.log('Chatbot close clicked');
        e.stopPropagation();
        chatbotContainer.classList.remove("active");
        setTimeout(() => {
            chatbotIcon.style.display = "flex";
        }, 300);
    });

    // Close chatbot when clicking outside
    document.addEventListener("click", (e) => {
        if (!chatbotContainer.contains(e.target) && 
            !chatbotIcon.contains(e.target) && 
            chatbotContainer.classList.contains("active")) {
            console.log('Click outside detected');
            chatbotContainer.classList.remove("active");
            setTimeout(() => {
                chatbotIcon.style.display = "flex";
            }, 300);
        }
    });

    // Prevent clicks inside the chatbot from closing it
    chatbotContainer.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingIndicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator) {
            indicator.remove();
        }
    }

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = content;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function getGeminiResponse(userMessage) {
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nAssistant:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Error fetching from Gemini API:', error);
            throw error;
        }
    }

    async function handleUserInput() {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            addMessage(userInput, true);
            chatbotInput.value = '';

            const typingIndicator = showTypingIndicator();

            try {
                const response = await getGeminiResponse(userInput);
                removeTypingIndicator(typingIndicator);
                addMessage(response);
            } catch (error) {
                console.error('Chatbot error:', error);
                removeTypingIndicator(typingIndicator);
                addMessage("I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment or contact our support team for assistance.");
            }
        }
    }

    // Event Listeners
    chatbotSend.addEventListener("click", handleUserInput);

    chatbotInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleUserInput();
        }
    });

    // Feature button event listeners
    meditationBtn.addEventListener("click", async () => {
        const typingIndicator = showTypingIndicator();
        try {
            const response = await getGeminiResponse("Guide me through a meditation session");
            removeTypingIndicator(typingIndicator);
            addMessage(response);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator(typingIndicator);
            addMessage("I apologize, but I'm having trouble connecting right now. Please try again later.");
        }
    });

    breathingBtn.addEventListener("click", async () => {
        const typingIndicator = showTypingIndicator();
        try {
            const response = await getGeminiResponse("Teach me a breathing exercise");
            removeTypingIndicator(typingIndicator);
            addMessage(response);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator(typingIndicator);
            addMessage("I apologize, but I'm having trouble connecting right now. Please try again later.");
        }
    });

    tipsBtn.addEventListener("click", async () => {
        const typingIndicator = showTypingIndicator();
        try {
            const response = await getGeminiResponse("Give me a relaxation tip");
            removeTypingIndicator(typingIndicator);
            addMessage(response);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator(typingIndicator);
            addMessage("I apologize, but I'm having trouble connecting right now. Please try again later.");
        }
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            display: flex;
            gap: 4px;
            justify-content: center;
            padding: 8px;
        }
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #4a90e2;
            border-radius: 50%;
            animation: bounce 0.5s ease-in-out infinite;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.1s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.2s; }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .user-message {
            background-color: #4a90e2;
            color: white;
            align-self: flex-end;
            border-radius: 15px 15px 0 15px;
            padding: 10px 15px;
            margin: 5px;
            max-width: 80%;
        }
        .bot-message {
            background-color: #f0f0f0;
            color: #333;
            align-self: flex-start;
            border-radius: 15px 15px 15px 0;
            padding: 10px 15px;
            margin: 5px;
            max-width: 80%;
        }
        .feature-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .feature-button {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            background-color: #4a90e2;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .feature-button:hover {
            background-color: #357abd;
        }
    `;
    document.head.appendChild(style);
}); 
