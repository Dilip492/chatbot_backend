// config/widget-config.js
export class WidgetConfig {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.config = {
            chatbotName: "Support",
            welcomeMessage: "Hi! How can I help you today?",
            themeColor: "#6366f1"
        };
    }

    async loadConfig() {
        const data = await this.apiClient.getWidgetConfig();
        if (data) {
            this.config = data;
        }
        console.log("color " , data);
        return this.config;
    }

    getConfig() {
        return this.config;
    }

    getChatbotName() {
        return this.config.chatbotName || "Support";
    }

    getThemeColor() {
        return this.config.themeColor || "#6366f1";
    }

    getWelcomeMessage() {
        return this.config.welcomeMessage || "Hi! How can I help you today?";
    }
}