// lead/lead-storage.js
import { generateSessionId } from '../utils/helpers.js';

export class LeadStorage {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem("chat_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem("chat_session_id", sessionId);
    }
    return sessionId;
  }

  getLeadFromSession() {
    try {
      const leadData = localStorage.getItem("chat_lead_data");
      return leadData ? JSON.parse(leadData) : null;
    } catch (e) {
      return null;
    }
  }

  saveLeadToSession(leadData) {
    try {
      localStorage.setItem("chat_lead_data", JSON.stringify(leadData));
    } catch (e) {
      console.warn("Could not save lead:", e);
    }
  }

  getSessionId() {
    return this.sessionId;
  }
}