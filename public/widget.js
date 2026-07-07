(function () {
  // ============================================================
  // 1. SVG ICONS
  // ============================================================
  const icons = {
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    bot: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    smile: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
    chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    sparkle: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z"/></svg>`,
  };

  // ============================================================
  // 2. GET CONFIGURATION FROM SCRIPT URL
  // ============================================================
  const currentScript = document.currentScript;
  const url = new URL(currentScript.src);
  const widgetKey = url.searchParams.get("wgt");
  const API_BASE = new URL(currentScript.src).origin;

  if (!widgetKey) {
    console.error("❌ Widget key is missing. Please add ?wgt=YOUR_KEY to the script URL.");
    return;
  }

  // ============================================================
  // 3. CREATE SHADOW DOM CONTAINER
  // ============================================================
  // Create a container for the widget
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "support-widget-container";
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999999;
    pointer-events: none;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Create shadow root for complete isolation
  const shadowRoot = widgetContainer.attachShadow({ mode: "closed" });

  // Create a wrapper div inside shadow DOM
  const shadowWrapper = document.createElement("div");
  shadowWrapper.id = "shadow-wrapper";
  shadowWrapper.style.cssText = `
    position: relative;
    pointer-events: auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  shadowRoot.appendChild(shadowWrapper);

  // Append container to body
  document.body.appendChild(widgetContainer);

  // ============================================================
  // 4. CREATE STYLES (Scoped inside Shadow DOM)
  // ============================================================
  const style = document.createElement("style");
  style.textContent = `
    /* Reset all styles inside shadow DOM */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* All styles are scoped to shadow DOM */
    .chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      background: #6366f1;
      color: #fff;
      z-index: 999999;
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
      transition: transform 0.15s, background 0.15s, box-shadow 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    }

    .chat-button:hover {
      transform: scale(1.07);
      box-shadow: 0 10px 28px rgba(99, 102, 241, 0.5);
    }

    .chat-button svg {
      display: block;
      width: 24px;
      height: 24px;
    }

    .notif-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 12px;
      height: 12px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
      transition: opacity 0.2s;
    }

    .chatbox {
      position: fixed;
      bottom: 85px;
      right: 20px;
      width: 340px;
      height: 480px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0,0,0,0.06);
      border: 1px solid rgba(255,255,255,0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999998;
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: auto;
    }

    .chatbox.open {
      display: flex;
    }

    .header {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      color: white;
    }

    .header .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: white;
      font-weight: 600;
      flex-shrink: 0;
    }

    .header .avatar svg {
      width: 18px;
      height: 18px;
    }

    .header .title-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 1px;
    }

    .header .title {
      font-weight: 600;
      font-size: 0.9rem;
      color: white;
      letter-spacing: -0.2px;
    }

    .header .status-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .header .status-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.3);
      animation: pulse-dot 2s infinite;
    }

    .header .status-text {
      font-size: 0.6rem;
      color: rgba(255,255,255,0.8);
      font-weight: 400;
    }

    .header .header-actions {
      display: flex;
      gap: 2px;
    }

    .header .header-actions button {
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.15s;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header .header-actions button:hover {
      background: rgba(255,255,255,0.2);
    }

    .header .header-actions button svg {
      width: 16px;
      height: 16px;
      display: block;
    }

    .messages-container {
      flex: 1;
      background: #f8fafc;
      padding: 12px 12px 8px 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 0;
      scroll-behavior: smooth;
    }

    .messages-container::-webkit-scrollbar {
      width: 3px;
    }
    .messages-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .messages-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    .messages-container::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .message {
      animation: slideIn 0.25s ease-out forwards;
    }

    .message .wrapper {
      display: flex;
      gap: 8px;
    }

    .message.bot .wrapper {
      max-width: 85%;
      align-self: flex-start;
    }

    .message.user .wrapper {
      max-width: 100%;
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .message .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      flex-shrink: 0;
    }

    .message.bot .avatar {
      background: #f1f5f9;
      color: #475569;
    }

    .message.user .avatar {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: #6366f1;
    }

    .message .avatar svg {
      width: 14px;
      height: 14px;
      display: block;
    }

    .message .bubble {
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.85rem;
      line-height: 1.5;
      word-break: break-word;
      position: relative;
      flex: 1;
    }

    .message.bot .bubble {
      border-top-left-radius: 4px;
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }

    .message.user .bubble {
      border-top-right-radius: 4px;
      background: rgba(99, 102, 241, 0.1);
      color: #0f172a;
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .message .bubble .time {
      display: block;
      font-size: 0.55rem;
      opacity: 0.5;
      margin-top: 4px;
      letter-spacing: 0.2px;
      color: #64748b;
    }

    .message .bubble ul {
      padding-left: 10px;
      margin-bottom: 12px;
      margin-top: 4px;
    }

    .message .bubble li {
      margin-bottom: 4px;
    }

    .message .bubble h4 {
      margin: 14px 0 6px 0;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .message .bubble p {
      margin-bottom: 8px;
      margin-top: 0;
    }

    .message .bubble strong {
      font-weight: 600;
    }

    .typing-indicator {
      align-self: flex-start;
    }

    .typing-indicator .wrapper {
      display: flex;
      gap: 8px;
      max-width: 85%;
    }

    .typing-indicator .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #475569;
      font-weight: 500;
      flex-shrink: 0;
    }

    .typing-indicator .bubble {
      padding: 10px 14px;
      border-radius: 12px;
      border-top-left-radius: 4px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
    }

    .typing-container {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 0;
    }

    .typing-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #94a3b8;
      animation: typing-dot 1.4s infinite ease-in-out;
    }

    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    .thinking-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: #f1f5f9;
      border-radius: 12px;
      border-top-left-radius: 4px;
      color: #64748b;
      font-size: 0.8rem;
      animation: thinking-pulse 1.5s infinite;
      max-width: 82%;
      align-self: flex-start;
    }

    .thinking-indicator .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid #e2e8f0;
      border-top: 2px solid #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .input-area {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px 12px 12px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      border-radius: 0 0 16px 16px;
      flex-shrink: 0;
    }

    .input-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f8fafc;
      border-radius: 10px;
      padding: 2px 10px;
      border: 1px solid #e2e8f0;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .input-wrapper:focus-within {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .input-wrapper .emoji-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 2px;
      border-radius: 30px;
      transition: color 0.15s;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input-wrapper .emoji-btn:hover {
      color: #6366f1;
    }

    .input-wrapper .emoji-btn svg {
      width: 16px;
      height: 16px;
      display: block;
    }

    .input-wrapper input {
      flex: 1;
      padding: 8px 0;
      border: none;
      font-size: 0.85rem;
      outline: none;
      background: transparent;
      font-family: inherit;
      color: #0f172a;
    }

    .input-wrapper input::placeholder {
      color: #94a3b8;
    }

    .input-wrapper input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .send-btn {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      border: none;
      color: white;
      width: 34px;
      height: 34px;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .send-btn:hover:not(:disabled) {
      transform: scale(0.95);
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
    }

    .send-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .send-btn svg {
      width: 16px;
      height: 16px;
      display: block;
    }

    /* Animations */
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    @keyframes typing-dot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes thinking-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  shadowWrapper.appendChild(style);

  // ============================================================
  // 5. CREATE CHAT BUTTON
  // ============================================================
  const button = document.createElement("button");
  button.className = "chat-button";
  button.innerHTML = icons.chat;
  button.setAttribute("aria-label", "Open chat");

  // Notification dot
  const notifDot = document.createElement("span");
  notifDot.className = "notif-dot";
  button.appendChild(notifDot);

  shadowWrapper.appendChild(button);

  // ============================================================
  // 6. CREATE CHATBOX
  // ============================================================
  const chatBox = document.createElement("div");
  chatBox.className = "chatbox";

  // ============================================================
  // 7. HEADER
  // ============================================================
  const header = document.createElement("div");
  header.className = "header";

  // Avatar
  const avatarWrap = document.createElement("div");
  avatarWrap.className = "avatar";
  avatarWrap.innerHTML = icons.bot;

  // Title wrapper
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "title-wrapper";

  const title = document.createElement("span");
  title.className = "title";
  title.textContent = "Support Team";

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

  // Header actions
  const headerActions = document.createElement("div");
  headerActions.className = "header-actions";

  const moreBtn = document.createElement("button");
  moreBtn.innerHTML = icons.more;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = icons.close;
  closeBtn.addEventListener("click", () => {
    chatBox.classList.remove("open");
  });

  headerActions.appendChild(moreBtn);
  headerActions.appendChild(closeBtn);

  header.appendChild(avatarWrap);
  header.appendChild(titleWrapper);
  header.appendChild(headerActions);

  // ============================================================
  // 8. MESSAGES CONTAINER
  // ============================================================
  const messagesContainer = document.createElement("div");
  messagesContainer.className = "messages-container";

  // ============================================================
  // 9. INPUT AREA
  // ============================================================
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

  inputWrapper.appendChild(emojiBtn);
  inputWrapper.appendChild(input);

  const sendBtn = document.createElement("button");
  sendBtn.className = "send-btn";
  sendBtn.innerHTML = icons.send;

  inputArea.appendChild(inputWrapper);
  inputArea.appendChild(sendBtn);

  // Assemble chatbox
  chatBox.appendChild(header);
  chatBox.appendChild(messagesContainer);
  chatBox.appendChild(inputArea);
  shadowWrapper.appendChild(chatBox);

  // ============================================================
  // 10. CHAT FUNCTIONS
  // ============================================================

  function addMessage(text, sender = "bot") {
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
      const markdownToHtml = (rawText) => {
        const lines = rawText.split("\n");
        let htmlResult = "";
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim();
          if (!line) {
            if (inList) {
              htmlResult += "</ul>";
              inList = false;
            }
            continue;
          }
          line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          const isBullet = line.startsWith("* ") || line.startsWith("- ");
          if (isBullet) {
            const cleanLineContent = line.replace(/^[\*\-]\s+/, "");
            if (!inList) {
              htmlResult += '<ul>';
              inList = true;
            }
            htmlResult += `<li>${cleanLineContent}</li>`;
          } else {
            if (inList) {
              htmlResult += "</ul>";
              inList = false;
            }
            if (line.startsWith("### ")) {
              const cleanHeading = line.replace(/^###\s+/, "");
              htmlResult += `<h4>${cleanHeading}</h4>`;
            } else {
              htmlResult += `<p>${line}</p>`;
            }
          }
        }
        if (inList) {
          htmlResult += "</ul>";
        }
        return htmlResult;
      };

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
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.appendChild(time);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    msgDiv.appendChild(wrapper);

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
  }

  function showTyping() {
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

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  function showThinking() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "thinking-indicator";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const text = document.createElement("span");
    text.textContent = "Thinking...";

    thinkingDiv.appendChild(spinner);
    thinkingDiv.appendChild(text);

    messagesContainer.appendChild(thinkingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return thinkingDiv;
  }

  // ============================================================
  // 11. APPLY COLORS
  // ============================================================
  function applyColors(color) {
    // Update button
    button.style.background = color;
    button.style.boxShadow = `0 6px 20px ${color}59`;

    // Update header
    header.style.background = `linear-gradient(135deg, ${color}, ${color})`;

    // Update send button
    sendBtn.style.background = `linear-gradient(135deg, ${color}, ${color})`;
    sendBtn.style.boxShadow = `0 3px 10px ${color}4D`;

    // Update focus ring
    const styleTag = shadowRoot.querySelector('style');
    if (styleTag) {
      styleTag.textContent = styleTag.textContent.replace(
        /border-color: #[0-9a-f]{6}/g,
        `border-color: ${color}`
      );
      styleTag.textContent = styleTag.textContent.replace(
        /rgba\(99, 102, 241,/g,
        color.match(/^#([A-Fa-f0-9]{6})$/)?.[0] ? `rgba(${hexToRgb(color)},` : 'rgba(99, 102, 241,'
      );
    }
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
  }

  // ============================================================
  // 12. WIDGET CONFIGURATION
  // ============================================================

  let chatbotConfig = {
    chatbotName: "Support",
    welcomeMessage: "Hi! How can I help you today?",
    themeColor: "#6366f1"
  };

  async function loadWidgetConfig() {
    try {
      const res = await fetch(`${API_BASE}/api/widget/config/${widgetKey}`);
      if (!res.ok) return;
      const data = await res.json();
      chatbotConfig = data;
      applyConfig();
    } catch (err) {
      console.warn("⚠️ Could not load widget config:", err);
    }
  }

  function applyConfig() {
    title.textContent = chatbotConfig.chatbotName || "Support";
    const color = chatbotConfig.themeColor || "#6366f1";
    applyColors(color);
  }

  // ============================================================
  // 13. LEAD MANAGEMENT
  // ============================================================

  let leadState = {
    isCollecting: false,
    currentField: null,
    leadData: {
      name: '',
      email: '',
      phone: ''
    },
    isLeadComplete: false,
    isInitialized: false
  };

  let sessionId = localStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sessionId);
  }

  function getLeadFromSession() {
    try {
      const leadData = localStorage.getItem("chat_lead_data");
      return leadData ? JSON.parse(leadData) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLeadToSession(leadData) {
    try {
      localStorage.setItem("chat_lead_data", JSON.stringify(leadData));
    } catch (e) {
      console.warn("Could not save lead:", e);
    }
  }

  const existingLead = getLeadFromSession();
  if (existingLead && existingLead.name && existingLead.email) {
    leadState.isLeadComplete = true;
    leadState.leadData = existingLead;
  }

  async function saveLeadToBackend(leadData) {
    try {
      const response = await fetch(`${API_BASE}/api/widget/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetKey: widgetKey,
          sessionId: sessionId,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone
        })
      });
      if (response.ok) {
        console.log("✅ Lead saved successfully");
      }
    } catch (error) {
      console.error("🔴 Error saving lead:", error);
    }
  }

  function startLeadCapture() {
    if (leadState.isCollecting || leadState.isInitialized) return;

    leadState.isCollecting = true;
    leadState.isInitialized = true;
    leadState.currentField = 'name';

    addMessage("👋 Hi there! I'm Sarah from support. To better assist you, I need a few details first.", "bot");
    setTimeout(() => {
      addMessage("What's your name?", "bot");
    }, 800);
  }

  async function processLeadResponse(text) {
    const field = leadState.currentField;
    const trimmed = text.trim();

    if (field === 'name') {
      if (trimmed.length < 2) {
        addMessage("Please enter a valid name (at least 2 characters). What's your name?", "bot");
        return false;
      }
      leadState.leadData.name = trimmed;
      leadState.currentField = 'email';
      addMessage(`Great to meet you, ${trimmed}! What's your email address?`, "bot");
      return true;
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        addMessage("Please enter a valid email address (e.g., name@domain.com). What's your email?", "bot");
        return false;
      }
      leadState.leadData.email = trimmed;
      leadState.currentField = 'phone';
      addMessage("Perfect! What's your phone number? (You can type 'skip' if you prefer not to share)", "bot");
      return true;
    } else if (field === 'phone') {
      if (trimmed.toLowerCase() === 'skip') {
        leadState.leadData.phone = 'Not provided';
      } else if (trimmed) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(trimmed)) {
          addMessage("Please enter a valid phone number. Or type 'skip' to continue.", "bot");
          return false;
        }
        leadState.leadData.phone = trimmed;
      } else {
        leadState.leadData.phone = 'Not provided';
      }

      leadState.isCollecting = false;
      leadState.currentField = null;
      leadState.isLeadComplete = true;

      saveLeadToSession(leadState.leadData);

      const thinking = showThinking();
      setTimeout(() => {
        thinking.remove();
        addMessage(`✅ Thanks ${leadState.leadData.name}! I've saved your contact info.`, "bot");
        setTimeout(() => {
          addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
        }, 600);
      }, 1200);

      await saveLeadToBackend(leadState.leadData);
      return true;
    }
    return false;
  }

  // ============================================================
  // 14. MESSAGE HANDLING
  // ============================================================

  async function handleSend() {
    const raw = input.value.trim();
    if (!raw) return;

    input.disabled = true;
    sendBtn.disabled = true;

    if (leadState.isCollecting && leadState.currentField) {
      const success = await processLeadResponse(raw);
      input.value = "";
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      if (!success) return;
      return;
    }

    if (!leadState.isLeadComplete) {
      addMessage("Please wait, I'm still collecting your information. Let's start with your name?", "bot");
      input.disabled = false;
      sendBtn.disabled = false;
      return;
    }

    addMessage(raw, "user");
    input.value = "";

    const thinking = showThinking();

    try {
      const response = await fetch(`${API_BASE}/api/widget/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetKey: widgetKey,
          question: raw,
          sessionId: sessionId
        })
      });

      thinking.remove();

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.answer) {
        addMessage(data.answer, "bot");
      } else if (data && data.message) {
        addMessage(data.message, "bot");
      } else {
        addMessage("I received your message. Let me help you with that!", "bot");
      }

    } catch (error) {
      thinking.remove();
      console.error("🔴 API Error:", error);
      const email = leadState.leadData.email || "our team";
      addMessage(`⚠️ I'm having trouble connecting. Our team will reach out to you at ${email}.`, "bot");
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ============================================================
  // 15. EVENT LISTENERS
  // ============================================================

  sendBtn.addEventListener("click", handleSend);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = !chatBox.classList.contains("open");
    if (isHidden) {
      chatBox.classList.add("open");
      notifDot.style.display = "none";
      setTimeout(() => input.focus(), 200);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else {
      chatBox.classList.remove("open");
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (chatBox.classList.contains("open")) {
      const target = e.target;
      if (!widgetContainer.contains(target)) {
        chatBox.classList.remove("open");
      }
    }
  });

  // ============================================================
  // 16. INITIALIZATION
  // ============================================================

  async function initializeChat() {
    await loadWidgetConfig();

    if (!leadState.isLeadComplete) {
      const thinking = showThinking();
      setTimeout(() => {
        thinking.remove();
        startLeadCapture();
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage(`👋 Welcome back, ${leadState.leadData.name}! How can I help you today?`, "bot");
      }, 500);
    }
  }

  initializeChat().catch(err => {
    console.error("❌ Failed to initialize chat:", err);
  });

  console.log("💬 Support chat widget initialized successfully!");
})();