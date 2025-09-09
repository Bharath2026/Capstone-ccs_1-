// Play notification sound
function playSound() {
  let audio = document.getElementById("notify-sound");
  if (audio) audio.play();
}

// Append message
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

  // Show bot typing
  appendMessage("bot", "Typing...", true);

  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("bot", "Hello! This is a sample response. Backend will answer real government queries.");
    playSound();
  }, 1000);
}

// Quick reply button handler
function quickReply(text) {
  document.getElementById("user-input").value = text;
  sendMessage();
}

// Show welcome message on page load
window.onload = function() {
  appendMessage("bot", "Welcome to Government Helpdesk Chatbot! How can I assist you today?");
};
