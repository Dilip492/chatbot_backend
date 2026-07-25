(function () {
  var e = { send: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`, close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`, bot: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>`, user: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, smile: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`, more: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`, chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`, sparkle: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9L12 3Z"/></svg>` }, t = class {
    constructor() { this.shadowRoot = null, this.elements = {} } createWidgetContainer() {
      let e = document.createElement(`div`); return e.id = `support-widget-container`, e.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999999;
      pointer-events: none;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `, e
    } createShadowDOM(e) {
      let t = e.attachShadow({ mode: `closed` }), n = document.createElement(`div`); return n.id = `shadow-wrapper`, n.style.cssText = `
      position: relative;
      pointer-events: auto;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `, t.appendChild(n), this.shadowRoot = t, n
    } injectStyles() {
      let e = document.createElement(`style`); e.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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

  .header-unique {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    
  }

  .header-unique .avatar {
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

  .header-unique .avatar svg {
    width: 18px;
    height: 18px;
  }

  .header-unique .title-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1px;
  }

  .header-unique .title {
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
    letter-spacing: -0.2px;
  }

  .header-unique .status-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .header-unique .status-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.3);
    animation: pulse-dot 2s infinite;
  }

  .header-unique .status-text {
    font-size: 0.6rem;
    color: rgba(255,255,255,0.8);
    font-weight: 400;
  }

  .header-unique .header-unique-actions {
    display: flex;
    gap: 2px;
  }

  .header-unique .header-unique-actions button {
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

  .header-unique .header-unique-actions button:hover {
    background: rgba(255,255,255,0.2);
  }

  .header-unique .header-unique-actions button svg {
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
    display: flex;
    width: 100%;
  }

  .message .wrapper {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  /* Bot messages - left aligned */
  .message.bot {
    justify-content: flex-start;
  }

  .message.bot .wrapper {
    max-width: 85%;
    flex-direction: row;
  }

  /* User messages - right aligned with avatar on right */
  .message.user {
    justify-content: flex-end;
  }

  .message.user .wrapper {
    max-width: 85%;
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
    flex-shrink: 0;
  }

  .message.bot .avatar {
    background: #f1f5f9;
    color: #475569;
  }

  .message.user .avatar {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    color: #475569;
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
    min-width: 0; /* Prevents overflow */
  }

  .message.bot .bubble {
    border-top-left-radius: 4px;
    background: #f1f5f9;
    color: #0f172a;
    border: 1px solid #e2e8f0;
  }

  .message.user .bubble {
    border-top-right-radius: 4px;
    background: #f1f5f9;
    color: #0f172a;
    border: 1px solid #e2e8f0;
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
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }

  .typing-indicator .wrapper {
    display: flex;
    gap: 8px;
    max-width: 85%;
    align-items: flex-start;
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
`, this.shadowRoot.appendChild(e)
    } createChatButton() { let t = document.createElement(`button`); t.className = `chat-button`, t.innerHTML = e.chat, t.setAttribute(`aria-label`, `Open chat`); let n = document.createElement(`span`); return n.className = `notif-dot`, t.appendChild(n), this.elements.button = t, this.elements.notifDot = n, t } createChatBox() { let e = document.createElement(`div`); e.className = `chatbox`; let t = this.createHeader(); e.appendChild(t); let n = document.createElement(`div`); n.className = `messages-container`, this.elements.messagesContainer = n, e.appendChild(n); let r = this.createInputArea(); return e.appendChild(r), this.elements.chatBox = e, e } createHeader() { let t = document.createElement(`div`); t.className = `header-unique`; let n = document.createElement(`div`); n.className = `avatar`, n.innerHTML = e.bot; let r = document.createElement(`div`); r.className = `title-wrapper`; let i = document.createElement(`span`); i.className = `title`, i.textContent = `Support Team`, this.elements.title = i; let a = document.createElement(`div`); a.className = `status-row`; let o = document.createElement(`span`); o.className = `status-dot`; let s = document.createElement(`span`); s.className = `status-text`, s.textContent = `Online`, a.appendChild(o), a.appendChild(s), r.appendChild(i), r.appendChild(a); let c = document.createElement(`div`); c.className = `header-unique-actions`; let l = document.createElement(`button`); l.innerHTML = e.more; let u = document.createElement(`button`); return u.innerHTML = e.close, this.elements.closeBtn = u, c.appendChild(l), c.appendChild(u), t.appendChild(n), t.appendChild(r), t.appendChild(c), t } createInputArea() { let t = document.createElement(`div`); t.className = `input-area`; let n = document.createElement(`div`); n.className = `input-wrapper`; let r = document.createElement(`button`); r.className = `emoji-btn`, r.innerHTML = e.smile; let i = document.createElement(`input`); i.id = `chat-input`, i.type = `text`, i.placeholder = `Type a message...`, this.elements.input = i, n.appendChild(r), n.appendChild(i); let a = document.createElement(`button`); return a.className = `send-btn`, a.innerHTML = e.send, this.elements.sendBtn = a, t.appendChild(n), t.appendChild(a), t } getElement(e) { return this.elements[e] } getMessagesContainer() { return this.elements.messagesContainer }
  }, n = class { constructor(e, t) { this.apiBase = e, this.widgetKey = t, this.saveLock = !1 } async saveLead(e, t) { if (this.saveLock) return console.log(`⚠️ Save already in progress, skipping`), { success: !1, error: `save_in_progress`, message: `Save already in progress` }; try { this.saveLock = !0, console.log(`📤 Saving lead to backend:`, e); let n = `${this.apiBase}/api/widget/lead`; console.log(`📡 API URL:`, n); let r = await fetch(n, { method: `POST`, headers: { "Content-Type": `application/json`, Accept: `application/json` }, body: JSON.stringify({ widgetKey: this.widgetKey, sessionId: t, name: e.name, email: e.email, phone: e.phone || `` }) }); console.log(`📊 Response status:`, r.status); let i; try { i = await r.json(), console.log(`📦 Response data:`, i) } catch (e) { console.error(`❌ Failed to parse response:`, e); let t = await r.text(); return console.log(`📄 Response text:`, t), { success: !1, error: `parse_error`, message: `Server returned an unexpected response` } } if (r.ok) return console.log(`✅ Lead saved successfully`), this.saveLock = !1, { success: !0, data: i }; if (r.status === 400) { console.log(`❌ Validation error:`, i.message), this.saveLock = !1; let e = i.message || `Please check your information and try again.`; return e.toLowerCase().includes(`already exists`) || e.toLowerCase().includes(`duplicate`) ? { success: !1, error: `email_exists`, message: `📧 This email is already registered. Please use a different email address.` } : e.toLowerCase().includes(`invalid`) || e.toLowerCase().includes(`valid`) ? { success: !1, error: `invalid_email`, message: `📧 That doesn't look like a valid email. Please enter a valid email address.` } : { success: !1, error: `validation_error`, message: `⚠️ ${e}` } } return r.status === 404 ? { success: !1, error: `endpoint_not_found`, message: `⚠️ The API endpoint was not found. Please check your configuration.` } : r.status === 500 ? { success: !1, error: `server_error`, message: `⚠️ There was a server error. Please try again later.` } : (this.saveLock = !1, { success: !1, error: `unknown_error`, message: `⚠️ An unexpected error occurred (Status: ${r.status}). Please try again.` }) } catch (e) { return console.error(`🔴 Network error saving lead:`, e), this.saveLock = !1, { success: !1, error: `network_error`, message: `⚠️ Having trouble connecting. Please check your internet connection and try again.` } } } async askQuestion(e, t, n) { try { let r = await fetch(`${this.apiBase}/api/widget/ask`, { method: `POST`, headers: { "Content-Type": `application/json`, Accept: `application/json` }, body: JSON.stringify({ widgetKey: this.widgetKey, question: e, sessionId: t, leadData: n }) }); if (!r.ok) throw Error(`API Error: ${r.status}`); return await r.json() } catch (e) { throw console.error(`🔴 API Error:`, e), e } } async getWidgetConfig() { try { let e = await fetch(`${this.apiBase}/api/widget/config/${this.widgetKey}`); return e.ok ? await e.json() : null } catch (e) { return console.warn(`⚠️ Could not load widget config:`, e), null } } }; function r() { return crypto.randomUUID() } function i() { return new Date().toLocaleTimeString([], { hour: `2-digit`, minute: `2-digit` }) } function a(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) } function o(e) { return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(e) } function s(e) {
    let t = e.split(`
`), n = ``, r = !1; for (let e = 0; e < t.length; e++) { let i = t[e].trim(); if (!i) { r &&= (n += `</ul>`, !1); continue } if (i = i.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`), i.startsWith(`* `) || i.startsWith(`- `)) { let e = i.replace(/^[\*\-]\s+/, ``); r ||= (n += `<ul>`, !0), n += `<li>${e}</li>` } else if (r &&= (n += `</ul>`, !1), i.startsWith(`### `)) { let e = i.replace(/^###\s+/, ``); n += `<h4>${e}</h4>` } else n += `<p>${i}</p>` } return r && (n += `</ul>`), n
  } var c = class { constructor() { this.sessionId = this.getOrCreateSessionId() } getOrCreateSessionId() { let e = localStorage.getItem(`chat_session_id`); return e || (e = r(), localStorage.setItem(`chat_session_id`, e)), e } getLeadFromSession() { try { let e = localStorage.getItem(`chat_lead_data`); return e ? JSON.parse(e) : null } catch { return null } } saveLeadToSession(e) { try { localStorage.setItem(`chat_lead_data`, JSON.stringify(e)) } catch (e) { console.warn(`Could not save lead:`, e) } } getSessionId() { return this.sessionId } }, l = class { constructor(e) { this.messagesContainer = e } addMessage(t, n = `bot`) { let r = document.createElement(`div`); r.className = `message ${n}`; let a = document.createElement(`div`); a.className = `wrapper`; let o = document.createElement(`div`); o.className = `avatar`, o.innerHTML = n === `bot` ? e.bot : e.user; let c = document.createElement(`div`); if (c.className = `bubble`, n === `bot`) { let e = document.createElement(`div`); e.innerHTML = s(t), c.appendChild(e) } else { let e = document.createElement(`span`); e.textContent = t, c.appendChild(e) } let l = document.createElement(`span`); return l.className = `time`, l.textContent = i(), c.appendChild(l), a.appendChild(o), a.appendChild(c), r.appendChild(a), this.messagesContainer.appendChild(r), this.scrollToBottom(), r } showTyping() { let t = document.createElement(`div`); t.className = `typing-indicator`; let n = document.createElement(`div`); n.className = `wrapper`; let r = document.createElement(`div`); r.className = `avatar`, r.innerHTML = e.bot; let i = document.createElement(`div`); i.className = `bubble`; let a = document.createElement(`div`); a.className = `typing-container`; for (let e = 0; e < 3; e++) { let e = document.createElement(`span`); e.className = `typing-dot`, a.appendChild(e) } return i.appendChild(a), n.appendChild(r), n.appendChild(i), t.appendChild(n), this.messagesContainer.appendChild(t), this.scrollToBottom(), t } showThinking(e = `Saving your info...`) { let t = document.createElement(`div`); t.className = `thinking-indicator`; let n = document.createElement(`div`); n.className = `spinner`; let r = document.createElement(`span`); return r.textContent = e, t.appendChild(n), t.appendChild(r), this.messagesContainer.appendChild(t), this.scrollToBottom(), t } scrollToBottom() { this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight } removeElement(e) { e && e.parentNode && e.remove() } }, u = class { constructor(e, t, n) { this.apiClient = e, this.messageHandler = t, this.leadStorage = n, this.state = this.initializeState(), this.saveLock = !1 } initializeState() { let e = this.leadStorage.getLeadFromSession(), t = { isCollecting: !1, currentField: null, leadData: { name: ``, email: ``, phone: `` }, isLeadComplete: !1, isInitialized: !1, emailAttempts: 0, maxEmailAttempts: 3, isSaving: !1, saveError: null, isEmailValid: !1, isProcessingSkip: !1, isEmailValidated: !1, isSavingLead: !1, isEmailSaved: !1 }; return e && e.name && e.email && (t.isLeadComplete = !0, t.leadData = e, t.isEmailValid = !0, t.isEmailValidated = !0, t.isEmailSaved = !0), t } getState() { return this.state } isLeadComplete() { return this.state.isLeadComplete } isCollecting() { return this.state.isCollecting } getCurrentField() { return this.state.currentField } getLeadData() { return this.state.leadData } startLeadCapture() { this.state.isCollecting || this.state.isInitialized || (this.state.isCollecting = !0, this.state.isInitialized = !0, this.state.currentField = `name`, this.state.emailAttempts = 0, this.state.saveError = null, this.state.isEmailValid = !1, this.state.isProcessingSkip = !1, this.state.isEmailValidated = !1, this.state.isSavingLead = !1, this.messageHandler.addMessage(`👋 Hi there! I'm Sarah from support. To better assist you, I need a few details first.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`What's your name?`, `bot`) }, 800)) } async processLeadResponse(e) { let t = this.state.currentField, n = e.trim(); if (t === `email` && n.toLowerCase() === `skip`) return this.messageHandler.addMessage(`📧 Email is required to continue. Please enter a valid email address:`, `bot`), this.state.currentField = `email`, this.state.isCollecting = !0, !1; if (t === `name`) return n.length < 2 ? (this.messageHandler.addMessage(`Please enter a valid name (at least 2 characters). What's your name?`, `bot`), !1) : (this.state.leadData.name = n, this.state.currentField = `email`, this.state.emailAttempts = 0, this.messageHandler.addMessage(`Great to meet you, ${n}! What's your email address?`, `bot`), !0); if (t === `email`) { if (n.toLowerCase() === `skip`) return this.messageHandler.addMessage(`📧 Email is required. Please enter a valid email address:`, `bot`), this.state.currentField = `email`, this.state.isCollecting = !0, !1; if (!a(n)) return this.messageHandler.addMessage(`📧 That doesn't look like a valid email address. Please enter a valid email (e.g., name@domain.com):`, `bot`), this.state.currentField = `email`, this.state.isCollecting = !0, !1; this.state.leadData.email = n; let e = this.messageHandler.showThinking(`Checking email...`), t = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId()); return this.messageHandler.removeElement(e), t.success ? (this.state.isEmailValid = !0, this.state.isEmailValidated = !0, this.state.isEmailSaved = !0, this.state.currentField = `phone`, this.messageHandler.addMessage(`Perfect! What's your phone number? (Type 'skip' if you prefer not to share)`, `bot`), !0) : (this.state.leadData.email = ``, this.state.isEmailValid = !1, this.state.isEmailValidated = !1, this.state.isEmailSaved = !1, t.error === `email_exists` ? (this.state.emailAttempts += 1, this.state.emailAttempts >= this.state.maxEmailAttempts ? (this.messageHandler.addMessage(`📧 This email is already registered. Please try a different email address or contact support.`, `bot`), this.state.emailAttempts = 0) : this.messageHandler.addMessage(`📧 This email is already registered. Please enter a different email (Attempt ${this.state.emailAttempts}/${this.state.maxEmailAttempts}):`, `bot`)) : t.error === `invalid_email` ? this.messageHandler.addMessage(t.message, `bot`) : this.messageHandler.addMessage(t.message || `⚠️ Please enter a valid email address:`, `bot`), this.state.currentField = `email`, this.state.isCollecting = !0, !1) } else if (t === `phone`) { if (!this.state.isEmailValidated) return this.messageHandler.addMessage(`📧 Please provide a valid email address first:`, `bot`), this.state.currentField = `email`, this.state.isCollecting = !0, !1; if (this.state.isEmailSaved) return this.state.leadData.phone = n.toLowerCase() === `skip` ? `Not provided` : n, this.leadStorage.saveLeadToSession(this.state.leadData), this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`Now, how can I help you today? Feel free to ask me anything! 😊`, `bot`) }, 600), !0; if (n.toLowerCase() === `skip`) { this.state.leadData.phone = `Not provided`, this.state.isProcessingSkip = !0, this.state.isSavingLead = !0, this.leadStorage.saveLeadToSession(this.state.leadData); let e = this.messageHandler.showThinking(), t = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId()); return this.messageHandler.removeElement(e), this.state.isSavingLead = !1, t.success ? (this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.state.isProcessingSkip = !1, this.state.isEmailSaved = !0, this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`Now, how can I help you today? Feel free to ask me anything! 😊`, `bot`) }, 600), !0) : (this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.state.isProcessingSkip = !1, this.state.isEmailSaved = !0, this.leadStorage.saveLeadToSession(this.state.leadData), this.messageHandler.addMessage(t.message || `✅ Thanks! You can continue chatting.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`How can I help you today? 😊`, `bot`) }, 600), !0) } else if (n) { if (!o(n)) return this.messageHandler.addMessage(`Please enter a valid phone number. Or type 'skip' to continue.`, `bot`), !1; this.state.leadData.phone = n } else this.state.leadData.phone = `Not provided`; if (this.leadStorage.saveLeadToSession(this.state.leadData), this.state.isEmailSaved) return this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`Now, how can I help you today? Feel free to ask me anything! 😊`, `bot`) }, 600), !0; { this.state.isSavingLead = !0; let e = this.messageHandler.showThinking(), t = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId()); return this.messageHandler.removeElement(e), this.state.isSavingLead = !1, t.success ? (this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.state.isEmailSaved = !0, this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`Now, how can I help you today? Feel free to ask me anything! 😊`, `bot`) }, 600), !0) : (this.state.isCollecting = !1, this.state.currentField = null, this.state.isLeadComplete = !0, this.leadStorage.saveLeadToSession(this.state.leadData), this.messageHandler.addMessage(t.message || `✅ Thanks! You can continue chatting.`, `bot`), setTimeout(() => { this.messageHandler.addMessage(`How can I help you today? 😊`, `bot`) }, 600), !0) } } return !1 } isSavingLead() { return this.state.isSavingLead } }, d = class { constructor(e, t, n, r) { this.messageHandler = e, this.leadManager = t, this.apiClient = n, this.leadStorage = r } async handleSend(e) { if (!e) return; if (this.leadManager.isSavingLead()) { this.messageHandler.addMessage(`⏳ Please wait, I'm saving your information...`, `bot`); return } if (this.leadManager.isCollecting() && this.leadManager.getCurrentField() && (!await this.leadManager.processLeadResponse(e) || this.leadManager.isCollecting() || this.leadManager.isLeadComplete())) return; if (!this.leadManager.isLeadComplete()) { this.leadManager.isCollecting() || this.messageHandler.addMessage(`Let's start over. What's your name?`, `bot`); return } this.messageHandler.addMessage(e, `user`); let t = this.messageHandler.showThinking(`Thinking...`); try { let n = await this.apiClient.askQuestion(e, this.leadStorage.getSessionId(), this.leadManager.getLeadData()); this.messageHandler.removeElement(t), n && n.answer ? this.messageHandler.addMessage(n.answer, `bot`) : n && n.message ? this.messageHandler.addMessage(n.message, `bot`) : this.messageHandler.addMessage(`I received your message. Let me help you with that!`, `bot`) } catch (e) { this.messageHandler.removeElement(t), console.error(`🔴 API Error:`, e); let n = this.leadManager.getLeadData().email || `our team`; this.messageHandler.addMessage(`⚠️ I'm having trouble connecting. Our team will reach out to you at ${n}.`, `bot`) } } }, f = class { constructor(e) { this.apiClient = e, this.config = { chatbotName: `Support`, welcomeMessage: `Hi! How can I help you today?`, themeColor: `#6366f1` } } async loadConfig() { let e = await this.apiClient.getWidgetConfig(); return e && (this.config = e), console.log(`color `, e), this.config } getConfig() { return this.config } getChatbotName() { return this.config.chatbotName || `Support` } getThemeColor() { return this.config.themeColor || `#6366f1` } getWelcomeMessage() { return this.config.welcomeMessage || `Hi! How can I help you today?` } }; (function () { let e = document.currentScript, r = new URL(e.src).searchParams.get(`wgt`), i = new URL(e.src).origin; if (!r) { console.error(`❌ Widget key is missing. Please add ?wgt=YOUR_KEY to the script URL.`); return } let a = new n(i, r), o = new c, s = new t, p = s.createWidgetContainer(), m = s.createShadowDOM(p); s.injectStyles(); let h = s.createChatButton(), g = s.createChatBox(); m.appendChild(h), m.appendChild(g), document.body.appendChild(p); let _ = new l(s.getMessagesContainer()), v = new u(a, _, o), y = new d(_, v, a, o), b = new f(a); async function x() { await b.loadConfig(); let e = s.getElement(`title`); e && (e.textContent = b.getChatbotName()), S(b.getThemeColor()) } function S(e) { let t = s.getElement(`button`), n = s.getElement(`sendBtn`), r = s.shadowRoot.querySelector(`.header-unique`); t && (t.style.background = e, t.style.boxShadow = `0 6px 20px ${e}59`), n && (n.style.background = `linear-gradient(135deg, ${e}, ${e})`, n.style.boxShadow = `0 3px 10px ${e}4D`), r && (r.style.background = `linear-gradient(135deg, ${e}, ${e})`) } function C() { let e = s.getElement(`sendBtn`), t = s.getElement(`input`), n = s.getElement(`closeBtn`), r = s.getElement(`notifDot`); e.addEventListener(`click`, async () => { let n = t.value.trim(); n && (t.value = ``, t.disabled = !0, e.disabled = !0, await y.handleSend(n), t.disabled = !1, e.disabled = !1, t.focus()) }), t.addEventListener(`keydown`, t => { t.key === `Enter` && (t.preventDefault(), e.click()) }), h.addEventListener(`click`, e => { e.stopPropagation(), g.classList.contains(`open`) ? g.classList.remove(`open`) : (g.classList.add(`open`), r && (r.style.display = `none`), setTimeout(() => t.focus(), 200), _.scrollToBottom()) }), n.addEventListener(`click`, () => { g.classList.remove(`open`) }), document.addEventListener(`click`, e => { g.classList.contains(`open`) && (p.contains(e.target) || g.classList.remove(`open`)) }) } async function w() { if (await x(), C(), v.isLeadComplete()) setTimeout(() => { let e = v.getLeadData().name; _.addMessage(`👋 Welcome back, ${e}! How can I help you today?`, `bot`) }, 500); else { let e = _.showThinking(); setTimeout(() => { _.removeElement(e), v.startLeadCapture() }, 1e3) } } w().catch(e => { console.error(`❌ Failed to initialize chat:`, e) }), console.log(`💬 Support chat widget initialized successfully!`) })()
})();