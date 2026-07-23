// lead/lead-manager.js
import { validateEmail, validatePhone } from '../utils/helpers.js';

export class LeadManager {
  constructor(apiClient, messageHandler, leadStorage) {
    this.apiClient = apiClient;
    this.messageHandler = messageHandler;
    this.leadStorage = leadStorage;
    this.state = this.initializeState();
    this.saveLock = false;
  }

  initializeState() {
    const existingLead = this.leadStorage.getLeadFromSession();
    const state = {
      isCollecting: false,
      currentField: null,
      leadData: {
        name: '',
        email: '',
        phone: ''
      },
      isLeadComplete: false,
      isInitialized: false,
      emailAttempts: 0,
      maxEmailAttempts: 3,
      isSaving: false,
      saveError: null,
      isEmailValid: false,
      isProcessingSkip: false,
      isEmailValidated: false,
      isSavingLead: false,
      isEmailSaved: false
    };

    if (existingLead && existingLead.name && existingLead.email) {
      state.isLeadComplete = true;
      state.leadData = existingLead;
      state.isEmailValid = true;
      state.isEmailValidated = true;
      state.isEmailSaved = true;
    }

    return state;
  }

  getState() {
    return this.state;
  }

  isLeadComplete() {
    return this.state.isLeadComplete;
  }

  isCollecting() {
    return this.state.isCollecting;
  }

  getCurrentField() {
    return this.state.currentField;
  }

  getLeadData() {
    return this.state.leadData;
  }

  startLeadCapture() {
    if (this.state.isCollecting || this.state.isInitialized) return;

    this.state.isCollecting = true;
    this.state.isInitialized = true;
    this.state.currentField = 'name';
    this.state.emailAttempts = 0;
    this.state.saveError = null;
    this.state.isEmailValid = false;
    this.state.isProcessingSkip = false;
    this.state.isEmailValidated = false;
    this.state.isSavingLead = false;

    this.messageHandler.addMessage("👋 Hi there! I'm Sarah from support. To better assist you, I need a few details first.", "bot");
    setTimeout(() => {
      this.messageHandler.addMessage("What's your name?", "bot");
    }, 800);
  }

  async processLeadResponse(text) {
    const field = this.state.currentField;
    const trimmed = text.trim();

    if (field === 'email' && trimmed.toLowerCase() === 'skip') {
      this.messageHandler.addMessage("📧 Email is required to continue. Please enter a valid email address:", "bot");
      this.state.currentField = 'email';
      this.state.isCollecting = true;
      return false;
    }

    if (field === 'name') {
      if (trimmed.length < 2) {
        this.messageHandler.addMessage("Please enter a valid name (at least 2 characters). What's your name?", "bot");
        return false;
      }
      this.state.leadData.name = trimmed;
      this.state.currentField = 'email';
      this.state.emailAttempts = 0;
      this.messageHandler.addMessage(`Great to meet you, ${trimmed}! What's your email address?`, "bot");
      return true;

    } else if (field === 'email') {
      if (trimmed.toLowerCase() === 'skip') {
        this.messageHandler.addMessage("📧 Email is required. Please enter a valid email address:", "bot");
        this.state.currentField = 'email';
        this.state.isCollecting = true;
        return false;
      }

      if (!validateEmail(trimmed)) {
        this.messageHandler.addMessage("📧 That doesn't look like a valid email address. Please enter a valid email (e.g., name@domain.com):", "bot");
        this.state.currentField = 'email';
        this.state.isCollecting = true;
        return false;
      }

      this.state.leadData.email = trimmed;
      const thinking = this.messageHandler.showThinking("Checking email...");

      const result = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId());
      this.messageHandler.removeElement(thinking);

      if (result.success) {
        this.state.isEmailValid = true;
        this.state.isEmailValidated = true;
        this.state.isEmailSaved = true;
        this.state.currentField = 'phone';
        this.messageHandler.addMessage("Perfect! What's your phone number? (Type 'skip' if you prefer not to share)", "bot");
        return true;
      } else {
        this.state.leadData.email = '';
        this.state.isEmailValid = false;
        this.state.isEmailValidated = false;
        this.state.isEmailSaved = false;

        if (result.error === 'email_exists') {
          this.state.emailAttempts += 1;
          if (this.state.emailAttempts >= this.state.maxEmailAttempts) {
            this.messageHandler.addMessage(`📧 This email is already registered. Please try a different email address or contact support.`, "bot");
            this.state.emailAttempts = 0;
          } else {
            this.messageHandler.addMessage(`📧 This email is already registered. Please enter a different email (Attempt ${this.state.emailAttempts}/${this.state.maxEmailAttempts}):`, "bot");
          }
        } else if (result.error === 'invalid_email') {
          this.messageHandler.addMessage(result.message, "bot");
        } else {
          this.messageHandler.addMessage(result.message || "⚠️ Please enter a valid email address:", "bot");
        }
        this.state.currentField = 'email';
        this.state.isCollecting = true;
        return false;
      }

    } else if (field === 'phone') {
      if (!this.state.isEmailValidated) {
        this.messageHandler.addMessage("📧 Please provide a valid email address first:", "bot");
        this.state.currentField = 'email';
        this.state.isCollecting = true;
        return false;
      }

      if (this.state.isEmailSaved) {
        this.state.leadData.phone = trimmed.toLowerCase() === 'skip' ? 'Not provided' : trimmed;
        this.leadStorage.saveLeadToSession(this.state.leadData);
        this.state.isCollecting = false;
        this.state.currentField = null;
        this.state.isLeadComplete = true;
        this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, "bot");
        setTimeout(() => {
          this.messageHandler.addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
        }, 600);
        return true;
      }

      if (trimmed.toLowerCase() === 'skip') {
        this.state.leadData.phone = 'Not provided';
        this.state.isProcessingSkip = true;
        this.state.isSavingLead = true;
        this.leadStorage.saveLeadToSession(this.state.leadData);

        const thinking = this.messageHandler.showThinking();
        const result = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId());
        this.messageHandler.removeElement(thinking);
        this.state.isSavingLead = false;

        if (result.success) {
          this.state.isCollecting = false;
          this.state.currentField = null;
          this.state.isLeadComplete = true;
          this.state.isProcessingSkip = false;
          this.state.isEmailSaved = true;
          this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, "bot");
          setTimeout(() => {
            this.messageHandler.addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
          }, 600);
          return true;
        } else {
          this.state.isCollecting = false;
          this.state.currentField = null;
          this.state.isLeadComplete = true;
          this.state.isProcessingSkip = false;
          this.state.isEmailSaved = true;
          this.leadStorage.saveLeadToSession(this.state.leadData);
          this.messageHandler.addMessage(result.message || "✅ Thanks! You can continue chatting.", "bot");
          setTimeout(() => {
            this.messageHandler.addMessage("How can I help you today? 😊", "bot");
          }, 600);
          return true;
        }
      } else if (trimmed) {
        if (!validatePhone(trimmed)) {
          this.messageHandler.addMessage("Please enter a valid phone number. Or type 'skip' to continue.", "bot");
          return false;
        }
        this.state.leadData.phone = trimmed;
      } else {
        this.state.leadData.phone = 'Not provided';
      }

      this.leadStorage.saveLeadToSession(this.state.leadData);
      
      if (!this.state.isEmailSaved) {
        this.state.isSavingLead = true;
        const thinking = this.messageHandler.showThinking();
        const result = await this.apiClient.saveLead(this.state.leadData, this.leadStorage.getSessionId());
        this.messageHandler.removeElement(thinking);
        this.state.isSavingLead = false;

        if (result.success) {
          this.state.isCollecting = false;
          this.state.currentField = null;
          this.state.isLeadComplete = true;
          this.state.isEmailSaved = true;
          this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, "bot");
          setTimeout(() => {
            this.messageHandler.addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
          }, 600);
          return true;
        } else {
          this.state.isCollecting = false;
          this.state.currentField = null;
          this.state.isLeadComplete = true;
          this.leadStorage.saveLeadToSession(this.state.leadData);
          this.messageHandler.addMessage(result.message || "✅ Thanks! You can continue chatting.", "bot");
          setTimeout(() => {
            this.messageHandler.addMessage("How can I help you today? 😊", "bot");
          }, 600);
          return true;
        }
      } else {
        this.state.isCollecting = false;
        this.state.currentField = null;
        this.state.isLeadComplete = true;
        this.messageHandler.addMessage(`✅ Thanks ${this.state.leadData.name}! I've saved your contact info.`, "bot");
        setTimeout(() => {
          this.messageHandler.addMessage("Now, how can I help you today? Feel free to ask me anything! 😊", "bot");
        }, 600);
        return true;
      }
    }
    return false;
  }

  isSavingLead() {
    return this.state.isSavingLead;
  }
}