// api/api-client.js
export class ApiClient {
  constructor(apiBase, widgetKey) {
    this.apiBase = apiBase;
    this.widgetKey = widgetKey;
    this.saveLock = false;
  }

  async saveLead(leadData, sessionId) {
    if (this.saveLock) {
      console.log("⚠️ Save already in progress, skipping");
      return { success: false, error: 'save_in_progress', message: "Save already in progress" };
    }

    try {
      this.saveLock = true;
      console.log("📤 Saving lead to backend:", leadData);

      const apiUrl = `${this.apiBase}/api/widget/lead`;
      console.log("📡 API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          widgetKey: this.widgetKey,
          sessionId: sessionId,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || ''
        })
      });

      console.log("📊 Response status:", response.status);

      let data;
      try {
        data = await response.json();
        console.log("📦 Response data:", data);
      } catch (parseError) {
        console.error("❌ Failed to parse response:", parseError);
        const text = await response.text();
        console.log("📄 Response text:", text);
        return {
          success: false,
          error: 'parse_error',
          message: "Server returned an unexpected response"
        };
      }

      if (response.ok) {
        console.log("✅ Lead saved successfully");
        this.saveLock = false;
        return { success: true, data };
      }

      if (response.status === 400) {
        console.log("❌ Validation error:", data.message);
        this.saveLock = false;

        let errorMessage = data.message || "Please check your information and try again.";

        if (errorMessage.toLowerCase().includes('already exists') ||
          errorMessage.toLowerCase().includes('duplicate')) {
          return {
            success: false,
            error: 'email_exists',
            message: "📧 This email is already registered. Please use a different email address."
          };
        } else if (errorMessage.toLowerCase().includes('invalid') ||
          errorMessage.toLowerCase().includes('valid')) {
          return {
            success: false,
            error: 'invalid_email',
            message: "📧 That doesn't look like a valid email. Please enter a valid email address."
          };
        } else {
          return {
            success: false,
            error: 'validation_error',
            message: `⚠️ ${errorMessage}`
          };
        }
      }

      if (response.status === 404) {
        return {
          success: false,
          error: 'endpoint_not_found',
          message: "⚠️ The API endpoint was not found. Please check your configuration."
        };
      }

      if (response.status === 500) {
        return {
          success: false,
          error: 'server_error',
          message: "⚠️ There was a server error. Please try again later."
        };
      }

      this.saveLock = false;
      return {
        success: false,
        error: 'unknown_error',
        message: `⚠️ An unexpected error occurred (Status: ${response.status}). Please try again.`
      };

    } catch (error) {
      console.error("🔴 Network error saving lead:", error);
      this.saveLock = false;
      return {
        success: false,
        error: 'network_error',
        message: "⚠️ Having trouble connecting. Please check your internet connection and try again."
      };
    }
  }

  async askQuestion(question, sessionId, leadData) {
    try {
      const response = await fetch(`${this.apiBase}/api/widget/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          widgetKey: this.widgetKey,
          question: question,
          sessionId: sessionId,
          leadData: leadData
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("🔴 API Error:", error);
      throw error;
    }
  }

  async getWidgetConfig() {
    try {
      const res = await fetch(`${this.apiBase}/api/widget/config/${this.widgetKey}`);
      if (!res.ok) return null;
    //   console.log(res);
      return await res.json();
    } catch (err) {
      console.warn("⚠️ Could not load widget config:", err);
      return null;
    }
  }
}