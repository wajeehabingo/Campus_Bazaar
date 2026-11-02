
const API_BASE = ""; // Example: "http://localhost:5000/api"

const ENDPOINTS = {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/me",
    resources: "/resources",
    upload: "/resources",
    chat: "/chat",
    admin: "/admin/resources"
};

async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});

    if (options.body && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    const token = sessionStorage.getItem("learnhub_token");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    let response;

    try {
        response = await fetch(API_BASE + path, {
            ...options,
            headers,
            credentials: "include"
        });
    } catch {
        throw new Error("Cannot connect to the backend server.");
    }

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            `Request failed: ${response.status}`
        );
    }

    return data;
}

const API = {
    login(data) {
        return apiRequest(ENDPOINTS.login, {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    register(data) {
        return apiRequest(ENDPOINTS.register, {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    profile() {
        return apiRequest(ENDPOINTS.profile);
    },

    resources() {
        return apiRequest(ENDPOINTS.resources);
    },

    upload(formData) {
        return apiRequest(ENDPOINTS.upload, {
            method: "POST",
            body: formData
        });
    },

    chat(message, history = []) {
        return apiRequest(ENDPOINTS.chat, {
            method: "POST",
            body: JSON.stringify({ message, history })
        });
    },

    adminResources() {
        return apiRequest(ENDPOINTS.admin);
    },

    async download(id) {
        const response = await fetch(
            `${API_BASE}/resources/${encodeURIComponent(id)}/download`,
            {
                headers: sessionStorage.getItem("learnhub_token")
                    ? {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("learnhub_token")}`
                    }
                    : {},
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Download failed.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `resource-${id}`;
        link.click();

        URL.revokeObjectURL(url);
    }
};
