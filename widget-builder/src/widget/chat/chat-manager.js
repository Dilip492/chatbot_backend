// chat/chat-manager.js
export class ChatManager {
  constructor(messageHandler, leadManager, apiClient, leadStorage) {
    this.messageHandler = messageHandler;
    this.leadManager = leadManager;
    this.apiClient = apiClient;
    this.leadStorage = leadStorage;
  }

  async handleSend(message) {
    if (!message) return;

    if (this.leadManager.isSavingLead()) {
      this.messageHandler.addMessage("⏳ Please wait, I'm saving your information...", "bot");
      return;
    }

    if (this.leadManager.isCollecting() && this.leadManager.getCurrentField()) {
      const success = await this.leadManager.processLeadResponse(message);
      if (!success) return;
      if (this.leadManager.isCollecting()) return;
      if (this.leadManager.isLeadComplete()) return;
    }

    if (!this.leadManager.isLeadComplete()) {
      if (!this.leadManager.isCollecting()) {
        this.messageHandler.addMessage("Let's start over. What's your name?", "bot");
      }
      return;
    }

    this.messageHandler.addMessage(message, "user");

    const thinking = this.messageHandler.showThinking("Thinking...");

    try {
      const data = await this.apiClient.askQuestion(
        message,
        this.leadStorage.getSessionId(),
        this.leadManager.getLeadData()
      );

      this.messageHandler.removeElement(thinking);

      if (data && data.answer) {
        this.messageHandler.addMessage(data.answer, "bot");
      } else if (data && data.message) {
        this.messageHandler.addMessage(data.message, "bot");
      } else {
        this.messageHandler.addMessage("I received your message. Let me help you with that!", "bot");
      }

    } catch (error) {
      this.messageHandler.removeElement(thinking);
      console.error("🔴 API Error:", error);
      const email = this.leadManager.getLeadData().email || "our team";
      this.messageHandler.addMessage(`⚠️ I'm having trouble connecting. Our team will reach out to you at ${email}.`, "bot");
    }
  }
}