// core/dom-manager.js
import { styles } from './styles.js';
import { icons } from './icons.js';

export class DOMManager {
    constructor() {
        this.shadowRoot = null;
        this.elements = {};
    }

    createWidgetContainer() {
        const container = document.createElement("div");
        container.id = "support-widget-container";
        container.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999999;
      pointer-events: none;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
        return container;
    }

    createShadowDOM(container) {
        const shadowRoot = container.attachShadow({ mode: "closed" });
        const wrapper = document.createElement("div");
        wrapper.id = "shadow-wrapper";
        wrapper.style.cssText = `
      position: relative;
      pointer-events: auto;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
        shadowRoot.appendChild(wrapper);
        this.shadowRoot = shadowRoot;
        return wrapper;
    }

    injectStyles() {
        const style = document.createElement("style");
        style.textContent = styles;
        this.shadowRoot.appendChild(style);
    }

    createChatButton() {
        const button = document.createElement("button");
        button.className = "chat-button";
        button.innerHTML = icons.chat;
        button.setAttribute("aria-label", "Open chat");

        const notifDot = document.createElement("span");
        notifDot.className = "notif-dot";
        button.appendChild(notifDot);

        this.elements.button = button;
        this.elements.notifDot = notifDot;
        return button;
    }

    createChatBox() {
        const chatBox = document.createElement("div");
        chatBox.className = "chatbox";

        // Create header
        const header = this.createHeader();
        chatBox.appendChild(header);

        // Create messages container
        const messagesContainer = document.createElement("div");
        messagesContainer.className = "messages-container";
        this.elements.messagesContainer = messagesContainer;
        chatBox.appendChild(messagesContainer);

        // Create input area
        const inputArea = this.createInputArea();
        chatBox.appendChild(inputArea);

        this.elements.chatBox = chatBox;
        return chatBox;
    }

    createHeader() {
        const header = document.createElement("div");
        header.className = "header-unique";

        const avatarWrap = document.createElement("div");
        avatarWrap.className = "avatar";
        avatarWrap.innerHTML = icons.bot;

        const titleWrapper = document.createElement("div");
        titleWrapper.className = "title-wrapper";

        const title = document.createElement("span");
        title.className = "title";
        title.textContent = "Support Team";
        this.elements.title = title;

        const statusRow = document.createElement("div");
        statusRow.className = "status-row";

        const statusDot = document.createElement("span");
        statusDot.className = "status-dot";

        const statusText = document.createElement("span");
        statusText.className = "status-text";
        statusText.textContent = "Online";

        statusRow.appendChild(statusDot);
        statusRow.appendChild(statusText);
        titleWrapper.appendChild(title);
        titleWrapper.appendChild(statusRow);

        const headerActions = document.createElement("div");
        headerActions.className = "header-unique-actions";

        const moreBtn = document.createElement("button");
        moreBtn.innerHTML = icons.more;

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = icons.close;
        this.elements.closeBtn = closeBtn;

        headerActions.appendChild(moreBtn);
        headerActions.appendChild(closeBtn);

        header.appendChild(avatarWrap);
        header.appendChild(titleWrapper);
        header.appendChild(headerActions);

        return header;
    }

    createInputArea() {
        const inputArea = document.createElement("div");
        inputArea.className = "input-area";

        const inputWrapper = document.createElement("div");
        inputWrapper.className = "input-wrapper";

        const emojiBtn = document.createElement("button");
        emojiBtn.className = "emoji-btn";
        emojiBtn.innerHTML = icons.smile;

        const input = document.createElement("input");
        input.id = "chat-input";
        input.type = "text";
        input.placeholder = "Type a message...";
        this.elements.input = input;

        inputWrapper.appendChild(emojiBtn);
        inputWrapper.appendChild(input);

        const sendBtn = document.createElement("button");
        sendBtn.className = "send-btn";
        sendBtn.innerHTML = icons.send;
        this.elements.sendBtn = sendBtn;

        inputArea.appendChild(inputWrapper);
        inputArea.appendChild(sendBtn);

        return inputArea;
    }

    getElement(key) {
        return this.elements[key];
    }

    getMessagesContainer() {
        return this.elements.messagesContainer;
    }
}