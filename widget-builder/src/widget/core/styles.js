// core/styles.js
export const styles = `
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

  .header {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    
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