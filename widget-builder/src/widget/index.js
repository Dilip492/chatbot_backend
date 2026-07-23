// index.js
import { DOMManager } from './core/dom-manager.js';
import { ApiClient } from './api/api-client.js';
import { LeadStorage } from './lead/lead-storage.js';
import { MessageHandler } from './chat/message-handler.js';
import { LeadManager } from './lead/lead-manager.js';
import { ChatManager } from './chat/chat-manager.js';
import { WidgetConfig } from './config/widget-config.js';
import { hexToRgb } from './utils/helpers.js';

(function() {
  // Get configuration from script URL
  const currentScript = document.currentScript;
  const url = new URL(currentScript.src);
  const widgetKey = url.searchParams.get("wgt");
  const API_BASE = new URL(currentScript.src).origin;

  if (!widgetKey) {
    console.error("❌ Widget key is missing. Please add ?wgt=YOUR_KEY to the script URL.");
    return;
  }

  // Initialize components
  const apiClient = new ApiClient(API_BASE, widgetKey);
  const leadStorage = new LeadStorage();
  const domManager = new DOMManager();

  // Setup DOM
  const container = domManager.createWidgetContainer();
  const wrapper = domManager.createShadowDOM(container);
  domManager.injectStyles();

  const button = domManager.createChatButton();
  const chatBox = domManager.createChatBox();

  wrapper.appendChild(button);
  wrapper.appendChild(chatBox);

  document.body.appendChild(container);

  // Initialize chat components
  const messageHandler = new MessageHandler(domManager.getMessagesContainer());
  const leadManager = new LeadManager(apiClient, messageHandler, leadStorage);
  const chatManager = new ChatManager(messageHandler, leadManager, apiClient, leadStorage);
  const widgetConfig = new WidgetConfig(apiClient);

  // Apply configuration
  async function applyConfig() {
    await widgetConfig.loadConfig();
    const title = domManager.getElement('title');
    if (title) {
      title.textContent = widgetConfig.getChatbotName();
    }
    const color = widgetConfig.getThemeColor();
    applyColors(color);
  }

  function applyColors(color) {
    const buttonEl = domManager.getElement('button');
    const sendBtn = domManager.getElement('sendBtn');
    const header = domManager.shadowRoot.querySelector(".header");

    console.log("header" , header)
    
    if (buttonEl) {
      buttonEl.style.background = color;
      buttonEl.style.boxShadow = `0 6px 20px ${color}59`;
    }

    if (sendBtn) {
      sendBtn.style.background = `linear-gradient(135deg, ${color}, ${color})`;
      sendBtn.style.boxShadow = `0 3px 10px ${color}4D`;
    }

    if (header) {
      header.style.background = `linear-gradient(135deg, ${color}, ${color})`;
    }
  }

  // Event listeners
  function setupEventListeners() {
    const sendBtn = domManager.getElement('sendBtn');
    const input = domManager.getElement('input');
    const closeBtn = domManager.getElement('closeBtn');
    const notifDot = domManager.getElement('notifDot');

    sendBtn.addEventListener("click", async () => {
      const message = input.value.trim();
      if (message) {
        input.value = "";
        input.disabled = true;
        sendBtn.disabled = true;
        await chatManager.handleSend(message);
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
      }
    });

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = !chatBox.classList.contains("open");
      if (isHidden) {
        chatBox.classList.add("open");
        if (notifDot) notifDot.style.display = "none";
        setTimeout(() => input.focus(), 200);
        messageHandler.scrollToBottom();
      } else {
        chatBox.classList.remove("open");
      }
    });

    closeBtn.addEventListener("click", () => {
      chatBox.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (chatBox.classList.contains("open")) {
        if (!container.contains(e.target)) {
          chatBox.classList.remove("open");
        }
      }
    });
  }

  // Initialize chat
  async function initializeChat() {
    await applyConfig();
    setupEventListeners();

    if (!leadManager.isLeadComplete()) {
      const thinking = messageHandler.showThinking();
      setTimeout(() => {
        messageHandler.removeElement(thinking);
        leadManager.startLeadCapture();
      }, 1000);
    } else {
      setTimeout(() => {
        const name = leadManager.getLeadData().name;
        messageHandler.addMessage(`👋 Welcome back, ${name}! How can I help you today?`, "bot");
      }, 500);
    }
  }

  initializeChat().catch(err => {
    console.error("❌ Failed to initialize chat:", err);
  });

  console.log("💬 Support chat widget initialized successfully!");
})();