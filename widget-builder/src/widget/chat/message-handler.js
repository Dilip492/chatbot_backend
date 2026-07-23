// chat/message-handler.js
import { icons } from '../core/icons.js';
import { getCurrentTime, markdownToHtml } from '../utils/helpers.js';

export class MessageHandler {
  constructor(messagesContainer) {
    this.messagesContainer = messagesContainer;
  }

  addMessage(text, sender = "bot") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = sender === "bot" ? icons.bot : icons.user;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    if (sender === "bot") {
      const textContent = document.createElement("div");
      textContent.innerHTML = markdownToHtml(text);
      bubble.appendChild(textContent);
    } else {
      const textSpan = document.createElement("span");
      textSpan.textContent = text;
      bubble.appendChild(textSpan);
    }

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = getCurrentTime();
    bubble.appendChild(time);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    msgDiv.appendChild(wrapper);

    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv;
  }

  showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = icons.bot;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const typingContainer = document.createElement("div");
    typingContainer.className = "typing-container";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      dot.className = "typing-dot";
      typingContainer.appendChild(dot);
    }

    bubble.appendChild(typingContainer);
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    typingDiv.appendChild(wrapper);

    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
    return typingDiv;
  }

  showThinking(message = "Saving your info...") {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "thinking-indicator";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const text = document.createElement("span");
    text.textContent = message;

    thinkingDiv.appendChild(spinner);
    thinkingDiv.appendChild(text);

    this.messagesContainer.appendChild(thinkingDiv);
    this.scrollToBottom();
    return thinkingDiv;
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeElement(element) {
    if (element && element.parentNode) {
      element.remove();
    }
  }
}