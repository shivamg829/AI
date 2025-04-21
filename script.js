
let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#img")
const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=yourAPI"
let user={
    data:null,
}

// Keywords related to meditation and relaxation
const meditationKeywords = [
    'meditation', 'relaxation', 'mindfulness', 'breathing', 'calm', 'peace',
    'stress', 'anxiety', 'focus', 'zen', 'yoga', 'mental', 'wellness',
    'mind', 'body', 'spirit', 'tranquility', 'serenity', 'meditate',
    'relax', 'breathe', 'consciousness', 'awareness', 'present', 'moment',
    'guided', 'practice', 'technique', 'exercise', 'routine', 'session'
];

function isMeditationRelated(text) {
    const lowerText = text.toLowerCase();
    return meditationKeywords.some(keyword => lowerText.includes(keyword));
}

async function generateResponce(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");
    
    // Check if the question is related to meditation
    if (!isMeditationRelated(user.data)) {
        text.innerHTML = "I can only answer questions related to Meditation & Relaxation. Please ask about meditation techniques, breathing exercises, or relaxation tips.";
        chatContainer.scrollTo({top: chatContainer.scrollHeight, behavior: "smooth"});
        return;
    }

    let RequestOption = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "contents": [{
                "parts": [{"text": `You are an AI Meditation and Relaxation Guide. Your purpose is to help users with meditation techniques, breathing exercises, mindfulness practices, and relaxation tips. Please provide guidance that is calming, supportive, and focused on mental well-being. Keep your response under 100 words. User's question: ${user.data}`}]
            }]
        })
    }

    try {
        let response = await fetch(Api_Url, RequestOption);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        
        // Ensure response is under 100 words
        const words = apiResponse.split(/\s+/);
        if (words.length > 100) {
            apiResponse = words.slice(0, 100).join(' ') + '...';
        }
        
        text.innerHTML = apiResponse;
    }
    catch(error) {
        console.log(error);
        text.innerHTML = "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
    finally {
        chatContainer.scrollTo({top: chatContainer.scrollHeight, behavior: "smooth"});
    }
}

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handlechatResponce(message){
    user.data=message
    let html=`<div class="user-chat-area">
            ${user.data}
            </div>
            <img src="user.jpg" alt="" id="userimg" width="50">`
            prompt.value=""
    let userChatBox=createChatBox(html,"user")
    chatContainer.appendChild(userChatBox)
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
    setTimeout(()=>{
        let html=`<img src="ai.jpg" alt="" id="aiimg" width="70">
            <div class="ai-chat-area">
            <img src="loads.gif" alt="" class="load" width="70px">
            </div>`
            let aiChatBox=createChatBox(html,"ai")
            chatContainer.appendChild(aiChatBox)
            generateResponce(aiChatBox)
    },600)
}
prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponce(prompt.value)

    } 
})
imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})
