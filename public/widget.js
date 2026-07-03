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
  };

  // ============================================================
  // 2. GET CONFIGURATION FROM SCRIPT URL
  // ============================================================
  const currentScript = document.currentScript;
  const url = new URL(currentScript.src);
  const widgetKey = url.searchParams.get("wgt");
  const API_BASE = new URL(currentScript.src).origin;

  // Validate widget key
  if (!widgetKey) {
    console.error("❌ Widget key is missing. Please add ?wgt=YOUR_KEY to the script URL.");
    return; // Exit if no widget key
  }

  // ============================================================
  // 3. CREATE FLOATING CHAT BUTTON
  // ============================================================
  const button = document.createElement("button");
  button.innerHTML = icons.chat;
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "52px";
  button.style.height = "52px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.background = "#6366f1";
  button.style.color = "#fff";
  button.style.zIndex = "999999";
  button.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.35)";
  button.style.transition = "0.15s";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.setAttribute("aria-label", "Open chat");

  // Hover effects
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.07)";
    button.style.background = "#4f52e0";
    button.style.boxShadow = "0 10px 28px rgba(99, 102, 241, 0.5)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.background = "#6366f1";
    button.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.35)";
  });

  // Notification dot
  const notifDot = document.createElement("span");
  Object.assign(notifDot.style, {
    position: "absolute",
    top: "4px",
    right: "4px",
    width: "12px",
    height: "12px",
    background: "#ef4444",
    borderRadius: "50%",
    border: "2px solid white",
    boxShadow: "0 2px 6px rgba(239, 68, 68, 0.4)",
    transition: "0.2s",
  });
  button.appendChild(notifDot);
  document.body.appendChild(button);

  // ============================================================
  // 4. CREATE CHATBOX
  // ============================================================
  const chatBox = document.createElement("div");
  chatBox.id = "support-chatbox";
  Object.assign(chatBox.style, {
    position: "fixed",
    bottom: "85px",
    right: "20px",
    width: "340px",
    height: "480px",
    maxHeight: "calc(100vh - 120px)",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0,0,0,0.06)",
    border: "1px solid rgba(255,255,255,0.2)",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999998",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  });

  // ============================================================
  // 5. HEADER
  // ============================================================
  const header = document.createElement("div");
  const gradientColor = "#6366f1";
  Object.assign(header.style, {
    padding: "12px 16px",
    background: `linear-gradient(135deg, ${gradientColor}, #8b5cf6)`,
    borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: "0",
    color: "white",
  });

  // Avatar
  const avatarWrap = document.createElement("div");
  Object.assign(avatarWrap.style, {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: "white",
    fontWeight: "600",
    flexShrink: "0",
  });
  avatarWrap.innerHTML = icons.bot;

  // Title wrapper
  const titleWrapper = document.createElement("div");
  titleWrapper.style.display = "flex";
  titleWrapper.style.flexDirection = "column";
  titleWrapper.style.flex = "1";
  titleWrapper.style.gap = "1px";

  const title = document.createElement("span");
  title.textContent = "Support Team";
  Object.assign(title.style, {
    fontWeight: "600",
    fontSize: "0.9rem",
    color: "white",
    letterSpacing: "-0.2px",
  });

  // Status row
  const statusRow = document.createElement("div");
  statusRow.style.display = "flex";
  statusRow.style.alignItems = "center";
  statusRow.style.gap = "5px";

  const statusDot = document.createElement("span");
  Object.assign(statusDot.style, {
    display: "inline-block",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.3)",
    animation: "pulse-dot 2s infinite",
  });

  const statusText = document.createElement("span");
  statusText.textContent = "Online";
  Object.assign(statusText.style, {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
  });

  statusRow.appendChild(statusDot);
  statusRow.appendChild(statusText);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(statusRow);
  header.appendChild(avatarWrap);
  header.appendChild(titleWrapper);

  // Header actions (more & close buttons)
  const headerActions = document.createElement("div");
  headerActions.style.display = "flex";
  headerActions.style.gap = "2px";

  const moreBtn = document.createElement("button");
  moreBtn.innerHTML = icons.more;
  Object.assign(moreBtn.style, {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
    transition: "0.15s",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  moreBtn.addEventListener("mouseenter", () => {
    moreBtn.style.background = "rgba(255,255,255,0.2)";
  });
  moreBtn.addEventListener("mouseleave", () => {
    moreBtn.style.background = "rgba(255,255,255,0.1)";
  });

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = icons.close;
  Object.assign(closeBtn.style, {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
    transition: "0.15s",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "rgba(255,255,255,0.2)";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "rgba(255,255,255,0.1)";
  });
  closeBtn.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  headerActions.appendChild(moreBtn);
  headerActions.appendChild(closeBtn);
  header.appendChild(headerActions);

  // ============================================================
  // 6. MESSAGES CONTAINER
  // ============================================================
  const messagesContainer = document.createElement("div");
  messagesContainer.id = "chat-messages";
  Object.assign(messagesContainer.style, {
    flex: "1",
    background: "#f8fafc",
    padding: "12px 12px 8px 12px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minHeight: "0",
    scrollBehavior: "smooth",
  });

  // ============================================================
  // 7. INPUT AREA
  // ============================================================
  const inputArea = document.createElement("div");
  Object.assign(inputArea.style, {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px 12px 12px",
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    borderRadius: "0 0 16px 16px",
    flexShrink: "0",
  });

  const inputWrapper = document.createElement("div");
  Object.assign(inputWrapper.style, {
    flex: "1",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "2px 10px",
    border: "1px solid #e2e8f0",
    transition: "0.15s",
  });

  const input = document.createElement("input");
  input.id = "chat-input";
  input.type = "text";
  input.placeholder = "Type a message...";
  Object.assign(input.style, {
    flex: "1",
    padding: "8px 0",
    border: "none",
    fontSize: "0.85rem",
    outline: "none",
    background: "transparent",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#0f172a",
  });

  // Input focus effects
  input.addEventListener("focus", () => {
    inputWrapper.style.borderColor = "#6366f1";
    inputWrapper.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
  });
  input.addEventListener("blur", () => {
    inputWrapper.style.borderColor = "#e2e8f0";
    inputWrapper.style.boxShadow = "none";
  });

  // Emoji button
  const emojiBtn = document.createElement("button");
  emojiBtn.innerHTML = icons.smile;
  Object.assign(emojiBtn.style, {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    padding: "2px",
    borderRadius: "30px",
    transition: "0.15s",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  emojiBtn.addEventListener("mouseenter", () => {
    emojiBtn.style.color = "#6366f1";
  });
  emojiBtn.addEventListener("mouseleave", () => {
    emojiBtn.style.color = "#94a3b8";
  });

  // Send button
  const sendBtn = document.createElement("button");
  sendBtn.id = "send-btn";
  sendBtn.innerHTML = icons.send;
  Object.assign(sendBtn.style, {
    background: `linear-gradient(135deg, ${gradientColor}, #8b5cf6)`,
    border: "none",
    color: "white",
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    boxShadow: "0 3px 10px rgba(99, 102, 241, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  sendBtn.addEventListener("mouseenter", () => {
    sendBtn.style.transform = "scale(0.95)";
    sendBtn.style.boxShadow = "0 2px 6px rgba(99, 102, 241, 0.4)";
  });
  sendBtn.addEventListener("mouseleave", () => {
    sendBtn.style.transform = "scale(1)";
    sendBtn.style.boxShadow = "0 3px 10px rgba(99, 102, 241, 0.3)";
  });

  // Assemble input area
  inputWrapper.appendChild(emojiBtn);
  inputWrapper.appendChild(input);
  inputArea.appendChild(inputWrapper);
  inputArea.appendChild(sendBtn);

  // Assemble chatbox
  chatBox.appendChild(header);
  chatBox.appendChild(messagesContainer);
  chatBox.appendChild(inputArea);
  document.body.appendChild(chatBox);

  // ============================================================
  // 8. CSS ANIMATIONS
  // ============================================================
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    
    @keyframes typing-dot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-5px); opacity: 1; }
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
    
    .msg-animated {
      animation: slideIn 0.25s ease-out forwards;
    }
    
    @keyframes thinking-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    
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
      border-top: 2px solid ${gradientColor};
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .typing-container {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 0;
    }

    #chat-messages::-webkit-scrollbar {
      width: 3px;
    }
    #chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    #chat-messages::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    #chat-messages::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    button svg {
      display: block;
    }
  `;
  document.head.appendChild(styleSheet);

  // ============================================================
  // 9. CHAT FUNCTIONS
  // ============================================================

  /**
   * Add a message to the chat
   * @param {string} text - Message text
   * @param {string} sender - 'bot' or 'user'
   * @returns {HTMLElement} The message element
   */
  function addMessage(text, sender = "bot") {
    const msgDiv = document.createElement("div");
    msgDiv.className = "msg-animated";

    if (sender === "bot") {
      // Bot message
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.gap = "8px";
      wrapper.style.maxWidth = "85%";
      wrapper.style.alignSelf = "flex-start";

      const avatar = document.createElement("div");
      Object.assign(avatar.style, {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "#475569",
        fontWeight: "500",
        flexShrink: "0",
      });
      avatar.innerHTML = icons.bot;

      const bubble = document.createElement("div");
      Object.assign(bubble.style, {
        padding: "10px 14px",
        borderRadius: "12px",
        borderTopLeftRadius: "4px",
        fontSize: "0.85rem",
        lineHeight: "1.5",
        wordBreak: "break-word",
        background: "#f1f5f9",
        color: "#0f172a",
        border: "1px solid #e2e8f0",
        position: "relative",
        flex: "1",
      });

      const textSpan = document.createElement("span");
      textSpan.textContent = text;
      bubble.appendChild(textSpan);

      const time = document.createElement("span");
      Object.assign(time.style, {
        display: "block",
        fontSize: "0.55rem",
        opacity: "0.5",
        marginTop: "4px",
        letterSpacing: "0.2px",
        color: "#64748b",
      });
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      bubble.appendChild(time);

      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      msgDiv.appendChild(wrapper);
    } else {
      // User message
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.gap = "8px";
      wrapper.style.maxWidth = "100%";
      wrapper.style.alignSelf = "flex-end";
      wrapper.style.flexDirection = "row-reverse";

      const avatar = document.createElement("div");
      Object.assign(avatar.style, {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "rgba(99, 102, 241, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "#6366f1", 
        fontWeight: "500",
        flexShrink: "0",
      });
      avatar.innerHTML = icons.user;

      const bubble = document.createElement("div");
      Object.assign(bubble.style, {
        padding: "10px 14px",
        borderRadius: "12px",
        borderTopRightRadius: "4px",
        fontSize: "0.85rem",
        lineHeight: "1.5",
        wordBreak: "break-word",
        background: "rgba(99, 102, 241, 0.1)",
        color: "#0f172a",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        position: "relative",
        flex: "1",
      });

      const textSpan = document.createElement("span");
      textSpan.textContent = text;
      bubble.appendChild(textSpan);

      const time = document.createElement("span");
      Object.assign(time.style, {
        display: "block",
        fontSize: "0.55rem",
        opacity: "0.5",
        marginTop: "4px",
        letterSpacing: "0.2px",
        color: "#64748b",
      });
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      bubble.appendChild(time);

      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      msgDiv.appendChild(wrapper);
    }

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
  }

  /**
   * Show typing indicator
   * @returns {HTMLElement} The typing indicator element
   */
  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.style.alignSelf = "flex-start";

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "8px";
    wrapper.style.maxWidth = "85%";

    const avatar = document.createElement("div");
    Object.assign(avatar.style, {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      color: "#475569",
      fontWeight: "500",
      flexShrink: "0",
    });
    avatar.innerHTML = icons.bot;

    const bubble = document.createElement("div");
    Object.assign(bubble.style, {
      padding: "10px 14px",
      borderRadius: "12px",
      borderTopLeftRadius: "4px",
      background: "#f1f5f9",
      border: "1px solid #e2e8f0",
    });

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

  /**
   * Show thinking indicator
   * @returns {HTMLElement} The thinking indicator element
   */
  function showThinking() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = "thinking-indicator";
    thinkingDiv.className = "thinking-indicator";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const text = document.createElement("span");
    text.textContent = "Sarah is thinking...";

    thinkingDiv.appendChild(spinner);
    thinkingDiv.appendChild(text);

    messagesContainer.appendChild(thinkingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return thinkingDiv;
  }

  // ============================================================
  // 10. LEAD MANAGEMENT
  // ============================================================

  // Lead state
  let leadState = {
    isCollecting: false,
    currentField: null,
    leadData: {
      name: '',
      email: '',
      phone: ''
    },
    isLeadComplete: false,
    isInitialized: false // Prevents duplicate initialization
  };

  /**
   * Get lead data from localStorage
   * @returns {Object|null} Lead data or null
   */
  function getLeadFromSession() {
    try {
      const leadData = localStorage.getItem("chat_lead_data");
      return leadData ? JSON.parse(leadData) : null;
    } catch (e) {
      console.warn("Could not read lead from session:", e);
      return null;
    }
  }

  /**
   * Save lead data to localStorage
   * @param {Object} leadData - Lead data to save
   */
  function saveLeadToSession(leadData) {
    try {
      localStorage.setItem("chat_lead_data", JSON.stringify(leadData));
    } catch (e) {
      console.warn("Could not save lead to session:", e);
    }
  }

  // Check for existing lead
  const existingLead = getLeadFromSession();
  if (existingLead && existingLead.name && existingLead.email) {
    leadState.isLeadComplete = true;
    leadState.leadData = existingLead;
    console.log("✅ Lead data loaded from session:", existingLead);
  }

  /**
   * Start lead capture process
   */
  function startLeadCapture() {
    // Prevent duplicate calls
    if (leadState.isCollecting || leadState.isInitialized) return;
    
    leadState.isCollecting = true;
    leadState.isInitialized = true;
    leadState.currentField = 'name';
    
    addMessage("👋 Hi there! I'm Sarah from support. To better assist you, I need a few details first.", "bot");
    setTimeout(() => {
      addMessage("What's your name?", "bot");
    }, 800);
  }

  /**
   * Process user response during lead capture
   * @param {string} text - User's response
   * @returns {Promise<boolean>} Success status
   */
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
          addMessage("Please enter a valid phone number (e.g., +1 234 567 8900). Or type 'skip' to continue.", "bot");
          return false;
        }
        leadState.leadData.phone = trimmed;
      } else {
        leadState.leadData.phone = 'Not provided';
      }

      // Complete lead capture
      leadState.isCollecting = false;
      leadState.currentField = null;
      leadState.isLeadComplete = true;

      // Save to session
      saveLeadToSession(leadState.leadData);

      // Show success message
      const thinking = showThinking();
      setTimeout(() => {
        thinking.remove();
        addMessage(`✅ Thanks ${leadState.leadData.name}! I've saved your contact info.`, "bot");
        setTimeout(() => {
          addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
        }, 600);
      }, 1200);

      // Save to backend
      await saveLeadToBackend(leadState.leadData);
      return true;
    }
    return false;
  }

  /**
   * Save lead to backend API
   * @param {Object} leadData - Lead data to save
   */
  async function saveLeadToBackend(leadData) {
    try {
      const response = await fetch(`${API_BASE}/api/widget/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          widgetKey: widgetKey,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone
        })
      });

      if (response.ok) {
        console.log("✅ Lead saved successfully:", leadData);
      } else {
        console.warn("⚠️ Failed to save lead to backend");
      }
    } catch (error) {
      console.error("🔴 Error saving lead:", error);
    }
  }

  // ============================================================
  // 11. WIDGET CONFIGURATION
  // ============================================================

  let chatbotConfig = {
    chatbotName: "Support",
    welcomeMessage: "Hi! How can I help you today?",
    themeColor: "#6366f1"
  };

  /**
   * Load widget configuration from backend
   */
  async function loadWidgetConfig() {
    try {
      const res = await fetch(`${API_BASE}/api/widget/config/${widgetKey}`);
      if (!res.ok) return;
      const data = await res.json();
      chatbotConfig = data;
      console.log("✅ Widget config loaded:", data);
      applyConfig();
    } catch (err) {
      console.warn("⚠️ Could not load widget config:", err);
    }
  }

  /**
   * Apply widget configuration to UI
   */
  function applyConfig() {
    title.textContent = chatbotConfig.chatbotName || "Support";
    
    const color = chatbotConfig.themeColor || "#6366f1";
    header.style.background = `linear-gradient(135deg, ${color}, ${color})`;
    button.style.background = color;
    sendBtn.style.background = color;
    
    // Update spinner color in CSS
    const styleTag = document.querySelector('style');
    if (styleTag) {
      styleTag.textContent = styleTag.textContent.replace(
        /border-top: 2px solid #[0-9a-f]{6}/,
        `border-top: 2px solid ${color}`
      );
    }
  }

  // ============================================================
  // 12. MESSAGE HANDLING
  // ============================================================

  /**
   * Handle sending a message
   */
  async function handleSend() {
    const raw = input.value.trim();
    if (!raw) return;

    // Disable input during processing
    input.disabled = true;
    sendBtn.disabled = true;

    // Check if still collecting lead info
    if (leadState.isCollecting && leadState.currentField) {
      const success = await processLeadResponse(raw);
      input.value = "";
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      if (!success) return;
      return;
    }

    // Check if lead is complete
    if (!leadState.isLeadComplete) {
      addMessage("Please wait, I'm still collecting your information. Let's start with your name?", "bot");
      input.disabled = false;
      sendBtn.disabled = false;
      return;
    }

    // Add user message
    addMessage(raw, "user");
    input.value = "";

    // Show thinking indicator
    const thinking = showThinking();

    // Get or create session ID
    let sessionId = localStorage.getItem("chat_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", sessionId);
    }

    try {
      // Send to API
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
      // Handle errors
      thinking.remove();
      console.error("🔴 API Error:", error);
      
      const email = leadState.leadData.email || "our team";
      addMessage(`⚠️ I'm having trouble connecting to the server. Our team has been notified and will reach out to you shortly at ${email}.`, "bot");

      // Fallback responses
      const fallbackReplies = [
        "Thanks for reaching out! Let me check that for you.",
        "Got it! I'll make sure our team follows up shortly.",
        "I'm here to help! Could you provide more details?",
        "Sure thing! We'll resolve this together.",
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setTimeout(() => {
        addMessage(randomReply, "bot");
      }, 500);
    } finally {
      // Re-enable input
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ============================================================
  // 13. EVENT LISTENERS
  // ============================================================

  // Send button click
  sendBtn.addEventListener("click", handleSend);

  // Enter key in input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });

  // Toggle chatbox on button click
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = chatBox.style.display === "none" || chatBox.style.display === "";
    chatBox.style.display = isHidden ? "flex" : "none";
    if (isHidden) {
      notifDot.style.display = "none";
      setTimeout(() => input.focus(), 200);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  // ============================================================
  // 14. INITIALIZATION
  // ============================================================

  /**
   * Initialize the chat widget
   */
  async function initializeChat() {
    // Load configuration first
    await loadWidgetConfig();

    // Check if lead already exists
    if (!leadState.isLeadComplete) {
      // Show thinking indicator and start lead capture
      const thinking = showThinking();
      setTimeout(() => {
        thinking.remove();
        startLeadCapture();
      }, 1000);
    } else {
      // Lead already exists, show welcome message
      setTimeout(() => {
        addMessage(`👋 Welcome back, ${leadState.leadData.name}! How can I help you today?`, "bot");
      }, 500);
    }
  }

  // Start the chat widget
  initializeChat().catch(err => {
    console.error("❌ Failed to initialize chat:", err);
  });

  console.log("💬 Support chat widget initialized successfully!");
})();