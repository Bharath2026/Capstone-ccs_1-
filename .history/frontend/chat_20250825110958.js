// Play notification sound
function playSound() {
    let audio = document.getElementById("notify-sound");
    if (audio) audio.play();
}

// Bot responses in multiple languages (placeholders)
const responses = {
    en: {
        welcome: "Welcome to Government Helpdesk Chatbot! How can I assist you today?",
        sample: "Hello! This is a sample response. Backend will answer real government queries."
    },
    kn: {
        welcome: "ಸರ್ಕಾರಿ ಸಹಾಯವಾಣಿ ಚಾಟ್‌ಬಾಟ್‌ಗೆ ಸ್ವಾಗತ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        sample: "ಹಲೋ! ಇದು ಒಂದು ಮಾದರಿ ಪ್ರತಿಕ್ರಿಯೆ. ನಿಜವಾದ ಉತ್ತರಗಳು ಬ್ಯಾಕ್‌ಎಂಡ್ ಮೂಲಕ ಬರುತ್ತವೆ."
    },
    hi: {
        welcome: "सरकारी हेल्पडेस्क चैटबोट में आपका स्वागत है! मैं आपकी कैसे मदद कर सकता हूँ?",
        sample: "नमस्ते! यह एक नमूना उत्तर है। वास्तविक उत्तर बैकएंड द्वारा प्रदान किए जाएंगे।"
    }
};

// Get selected language
function getLanguage() {
    let langSelect = document.getElementById("language-selector");
    return langSelect.value || "en";
}

// Append message to chat
function appendMessage(sender, text, isTyping = false) {
    let chatBox = document.getElementById("chat-box");
    let msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    if (isTyping) msg.classList.add("typing");
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    let typingMsg = document.querySelector(".message.bot.typing");
    if (typingMsg) typingMsg.remove();
}

// Send user message
function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();
    if (message === "") return;

    appendMessage("user", message);
    input.value = "";

    // Show bot typing indicator
    appendMessage("bot", "Typing...", true);

    setTimeout(() => {
        removeTypingIndicator();
        let lang = getLanguage();
        appendMessage("bot", responses[lang].sample);
        playSound();
    }, 1000);
}

// Quick reply button handler
function quickReply(text) {
    document.getElementById("user-input").value = text;
    sendMessage();
}

// Show welcome message on page load
window.onload = function () {
    let lang = getLanguage();
    appendMessage("bot", responses[lang].welcome);
};

// Update welcome message when language changes
document.getElementById("language-selector").addEventListener("change", () => {
    let lang = getLanguage();
    appendMessage("bot", responses[lang].welcome);
});
