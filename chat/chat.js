const chatbotIcon = document.querySelector("#chatbotIcon");
const chatbotContainer = document.querySelector("#chatbotContainer");
const chatbotClose = document.querySelector("#chatbotClose");
const chatbotMessages = document.querySelector("#chatbotMessages");
const chatbotInput = document.querySelector("#chatbotInput");
const chatbotSend = document.querySelector("#chatbotSend");

// Add event listeners for chatbot icon and close button
chatbotIcon.addEventListener("click", () => {
    chatbotContainer.classList.add("active");
    chatbotIcon.style.display = "none";
    chatbotInput.focus(); // Focus the input when opening
});

chatbotClose.addEventListener("click", () => {
    chatbotContainer.classList.remove("active");
    setTimeout(() => {
        chatbotIcon.style.display = "flex";
    }, 300); // Wait for the transition to complete
});

// Close chatbot when clicking outside
document.addEventListener("click", (e) => {
    if (!chatbotContainer.contains(e.target) && 
        !chatbotIcon.contains(e.target) && 
        chatbotContainer.classList.contains("active")) {
        chatbotContainer.classList.remove("active");
        setTimeout(() => {
            chatbotIcon.style.display = "flex";
        }, 300);
    }
});

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAHpVzQSfizRkyij5UE7YJLs7rUJT58pHA";
const healthKeywords = [
    'health', 'medical', 'doctor', 'hospital', 'treatment', 'symptoms',
    'medicine', 'disease', 'pain', 'care', 'emergency', 'appointment',
    'specialist', 'surgery', 'checkup', 'consultation', 'diagnosis',
    'therapy', 'prescription', 'wellness', 'healthcare', 'clinic',
    'patient', 'recovery', 'healing', 'examination', 'test', 'procedure'
];

function isHealthRelated(text) {
    const lowerText = text.toLowerCase();
    return healthKeywords.some(keyword => lowerText.includes(keyword));
}

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

async function generateResponse(userMessage) {
    if (!isHealthRelated(userMessage)) {
        addMessage("I can only answer questions related to health and medical services. Please ask about medical conditions, hospital services, or healthcare-related topics.");
        return;
    }

    const typingIndicator = showTypingIndicator();

    const RequestOption = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "contents": [{
                "parts": [{
                    "text": `You are an AI Medical Assistant at Apollo Hospitals. Your purpose is to help users with medical information, hospital services, and healthcare guidance. Keep responses professional, accurate, and under 100 words. Avoid diagnosing but provide general information and always encourage consulting a doctor for specific medical advice. User's question: ${userMessage}`
                }]
            }]
        })
    };

    try {
        const response = await fetch(Api_Url, RequestOption);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Invalid API response format');
        }
        
        let apiResponse = data.candidates[0].content.parts[0].text.trim();
        const words = apiResponse.split(/\s+/);
        if (words.length > 100) {
            apiResponse = words.slice(0, 100).join(' ') + '...';
        }
        
        removeTypingIndicator(typingIndicator);
        addMessage(apiResponse);
    }
    catch(error) {
        console.error('Chatbot error:', error);
        removeTypingIndicator(typingIndicator);
        addMessage("I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment or contact our support team for assistance.");
    }
}

function handleUserInput() {
    const userInput = chatbotInput.value.trim();
    if (userInput) {
        addMessage(userInput, true);
        chatbotInput.value = '';

        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            generateResponse(userInput);
        }, 1000);
    }
}

chatbotSend.addEventListener("click", handleUserInput);

chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleUserInput();
    }
});

const style = document.createElement('style');
style.textContent = `
    .loading-dots {
        display: flex;
        gap: 4px;
        justify-content: center;
        padding: 8px;
    }
    .loading-dots div {
        width: 8px;
        height: 8px;
        background: #4a90e2;
        border-radius: 50%;
        animation: bounce 0.5s ease-in-out infinite;
    }
    .loading-dots div:nth-child(2) { animation-delay: 0.1s; }
    .loading-dots div:nth-child(3) { animation-delay: 0.2s; }
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
`;
document.head.appendChild(style);
