
const APP_CONFIG = {
    API_BASE_URL: "http://localhost:5195",
    ENDPOINTS: {
        RESOURCES: "/api/resources",
        AUTH_LOGIN: "/api/auth/login",
        AUTH_REGISTER: "/api/auth/register",
        UPLOAD: "/api/resources/upload"
    }
};

const API = {
    async request(endpoint, options = {}) {
        const token = sessionStorage.getItem("learnhub_token");
        const headers = options.headers || {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`Server error (${response.status})`);
        }

        return await response.json();
    },

    resources() {
        return this.request("/api/resources");
    },

    login(credentials) {
        return this.request("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
    },

    register(userData) {
        return this.request("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
    },

    upload(formData) {
        return this.request("/api/resources/upload", {
            method: "POST",
            body: formData
        });
    },

    chat(message, history) {
        return this.request("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, history })
        });
    },

    async download(id) {
        window.open(`${APP_CONFIG.API_BASE_URL}/api/resources/${id}/download`, "_blank");
    }
};