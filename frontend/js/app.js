
const app = document.getElementById("app");
const pageTitle = document.getElementById("pageTitle");
const sidebar = document.getElementById("sidebar");

const pageNames = {
    dashboard: "Dashboard",
    catalogue: "Resource Catalogue",
    upload: "Upload Resource",
    chat: "AI Assistant",
    profile: "My Profile",
    login: "Login",
    register: "Registration",
    admin: "Admin Panel",
    details: "Resource Details"
};

const sampleResources = [
    {
        id: "1",
        title: "Introduction to Data Structures",
        category: "Computer Science",
        type: "PDF",
        author: "Ayesha Khan",
        description: "Beginner notes about arrays, stacks, queues and trees.",
        downloads: 124
    },
    {
        id: "2",
        title: "Statistics Revision Notes",
        category: "Mathematics",
        type: "DOC",
        author: "Ali Raza",
        description: "Probability, distributions and descriptive statistics.",
        downloads: 87
    },
    {
        id: "3",
        title: "Web Development Slides",
        category: "Web Development",
        type: "PPT",
        author: "Sara Ahmed",
        description: "An introduction to HTML, CSS and responsive design.",
        downloads: 69
    },
    {
        id: "4",
        title: "Python Practice Questions",
        category: "Programming",
        type: "PDF",
        author: "Hamza Noor",
        description: "Practice variables, loops, functions and lists.",
        downloads: 203
    }
];

let resources = [...sampleResources];
let currentPage = "dashboard";
let currentUser = null;
let selectedResource = null;
let chatHistory = [];
let demoMode = true;

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.getElementById("toastRegion").appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

function initials(name = "Student") {
    return name.split(/\s+/)
        .slice(0, 2)
        .map(word => word[0] || "")
        .join("")
        .toUpperCase();
}

function updateNavigation() {
    document.querySelectorAll("[data-page]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === currentPage
        );
    });

    document.querySelectorAll(".admin-only").forEach(button => {
        button.classList.toggle(
            "hidden",
            currentUser?.role !== "admin"
        );
    });

    document.getElementById("profileShortcut").textContent =
        initials(currentUser?.name || "Student");
}

function goTo(page) {
    currentPage = page;
    pageTitle.textContent = pageNames[page] || "Dashboard";
    sidebar.classList.remove("open");
    renderPage();
}

function heading(label, title, description, button = "") {
    return `
        <div class="heading-row">
            <div>
                <p class="eyebrow">${label}</p>
                <h1>${title}</h1>
                <p class="subtitle">${description}</p>
            </div>
            ${button}
        </div>
    `;
}

function renderDashboard() {
    const name = currentUser?.name || "Student";

    return `
        <section class="welcome">
            <div>
                <p class="eyebrow">YOUR LEARNING SPACE</p>
                <h1>Welcome, ${escapeHTML(name.split(" ")[0])}!</h1>
                <p>Discover study materials and learn with your community.</p>
                <button class="button button-lime" data-page="catalogue">
                    Explore Resources →
                </button>
            </div>
            <div class="welcome-mark">L</div>
        </section>

        <div class="stats-grid">
            <article class="card">
                <p class="stat-label">Available Resources</p>
                <div class="stat-number">${resources.length}</div>
                <p class="stat-label">In the sample catalogue</p>
            </article>
            <article class="card">
                <p class="stat-label">Your Uploads</p>
                <div class="stat-number">${
                    resources.filter(r => r.author === name).length
                }</div>
                <p class="stat-label">Shared by you</p>
            </article>
            <article class="card">
                <p class="stat-label">Total Downloads</p>
                <div class="stat-number">${
                    resources.reduce((sum, r) => sum + r.downloads, 0)
                }</div>
                <p class="stat-label">Sample resource activity</p>
            </article>
            <article class="card">
                <p class="stat-label">Study Assistant</p>
                <div class="stat-number">Ready</div>
                <p class="stat-label">Open the chat interface</p>
            </article>
        </div>

        <div class="dashboard-grid">
            <section class="card">
                <div class="section-heading">
                    <div>
                        <h2>Recently Shared</h2>
                        <p class="subtitle">Popular learning resources</p>
                    </div>
                    <button class="link-button" data-page="catalogue">
                        View all →
                    </button>
                </div>

                <div class="resource-list">
                    ${resources.slice(0, 3).map(resource => `
                        <div class="resource-row">
                            <div class="file-icon">
                                ${escapeHTML(resource.type)}
                            </div>
                            <div class="resource-info">
                                <strong>${escapeHTML(resource.title)}</strong>
                                <span>${escapeHTML(resource.category)}</span>
                            </div>
                            <button class="button button-outline"
                                data-resource="${escapeHTML(resource.id)}">
                                Open
                            </button>
                        </div>
                    `).join("")}
                </div>
            </section>

            <section class="card">
                <h2>Quick Actions</h2>
                <p class="subtitle">What would you like to do?</p>

                <div class="quick-grid" style="margin-top:16px">
                    <button class="quick-action" data-page="catalogue">
                        <strong>⌕ Find Resources</strong>
                        <span>Search study materials</span>
                    </button>
                    <button class="quick-action" data-page="upload">
                        <strong>↑ Upload File</strong>
                        <span>Share your notes</span>
                    </button>
                    <button class="quick-action" data-page="chat">
                        <strong>✳ AI Assistant</strong>
                        <span>Ask study questions</span>
                    </button>
                    <button class="quick-action" data-page="profile">
                        <strong>◎ My Profile</strong>
                        <span>Manage your details</span>
                    </button>
                </div>
            </section>
        </div>
    `;
}

function renderCatalogue() {
    const categories = [...new Set(resources.map(r => r.category))];

    return `
        ${heading(
            "LIBRARY",
            "Resource Catalogue",
            "Search notes, presentations and study guides.",
            '<button class="button button-lime" data-page="upload">+ Upload Resource</button>'
        )}

        <div class="toolbar">
            <input class="search-input" id="searchInput"
                placeholder="Search by title, topic or author..."
                aria-label="Search resources">

            <select id="categoryFilter" aria-label="Category filter">
                <option value="">All Categories</option>
                ${categories.map(category => `
                    <option value="${escapeHTML(category)}">
                        ${escapeHTML(category)}
                    </option>
                `).join("")}
            </select>
        </div>

        <div class="section-heading">
            <h2 id="resultCount">${resources.length} Resources</h2>
        </div>

        <div class="resource-grid" id="resourceGrid">
            ${resources.map(resourceCard).join("")}
        </div>
    `;
}

function resourceCard(resource) {
    return `
        <article class="resource-card">
            <span class="tag">${escapeHTML(resource.category)}</span>
            <div class="file-icon">${escapeHTML(resource.type)}</div>
            <h3>${escapeHTML(resource.title)}</h3>
            <p>${escapeHTML(resource.description)}</p>
            <p>By ${escapeHTML(resource.author)}</p>
            <button class="button button-outline"
                data-resource="${escapeHTML(resource.id)}">
                View Details →
            </button>
        </article>
    `;
}

function filterResources() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;

    const filtered = resources.filter(resource => {
        const text = [
            resource.title,
            resource.category,
            resource.author,
            resource.description
        ].join(" ").toLowerCase();

        return text.includes(query) &&
            (!category || resource.category === category);
    });

    document.getElementById("resultCount").textContent =
        `${filtered.length} Resources`;

    document.getElementById("resourceGrid").innerHTML = filtered.length
        ? filtered.map(resourceCard).join("")
        : '<div class="empty-state">No resources found. Try another search.</div>';
}

function renderUpload() {
    return `
        ${heading(
            "CONTRIBUTE",
            "Upload a Resource",
            "Share useful study material with other students."
        )}

        <div class="form-layout">
            <form class="card" id="uploadForm">
                <h2>Resource Information</h2>

                <div class="form-field">
                    <label for="resourceTitle">Resource Title *</label>
                    <input id="resourceTitle" name="title" required
                        maxlength="120"
                        placeholder="e.g. Statistics Notes">
                </div>

                <div class="form-grid">
                    <div class="form-field">
                        <label for="resourceCategory">Category *</label>
                        <select id="resourceCategory" name="category" required>
                            <option value="">Choose category</option>
                            <option>Computer Science</option>
                            <option>Mathematics</option>
                            <option>Programming</option>
                            <option>Web Development</option>
                            <option>Business</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="form-field">
                        <label for="resourceType">File Type *</label>
                        <select id="resourceType" name="type" required>
                            <option value="">Choose type</option>
                            <option>PDF</option>
                            <option>DOC</option>
                            <option>PPT</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div class="form-field">
                    <label for="resourceDescription">Description *</label>
                    <textarea id="resourceDescription" name="description"
                        rows="4" maxlength="700" required
                        placeholder="Describe the resource..."></textarea>
                </div>

                <div class="form-field">
                    <label for="resourceFile">Select File *</label>
                    <input id="resourceFile" name="file" type="file" required
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt">
                    <p class="help-text">Choose a supported study document.</p>
                </div>

                <div class="notice notice-warning">
                    Only upload files you have permission to share.
                </div>

                <button class="button button-lime" type="submit">
                    Submit Resource ↑
                </button>
            </form>

            <aside class="card">
                <h2>Upload Tips</h2>
                <p class="subtitle">Help other students find your material.</p>
                <br>
                <p>✓ Use a clear title.</p><br>
                <p>✓ Select the correct category.</p><br>
                <p>✓ Write a useful description.</p><br>
                <p>✓ Check the file before uploading.</p>
            </aside>
        </div>
    `;
}

function renderProfile() {
    const user = currentUser || {
        name: "Student Demo",
        email: "student@example.com",
        role: "student"
    };

    return `
        ${heading("YOUR ACCOUNT", "My Profile",
            "Manage your account information.")}

        <div class="profile-layout">
            <section class="card profile-card">
                <div class="profile-avatar">${initials(user.name)}</div>
                <h2>${escapeHTML(user.name)}</h2>
                <p class="subtitle">${escapeHTML(user.email)}</p>
                <br>
                <span class="tag tag-lime">${escapeHTML(user.role)}</span>
            </section>

            <form class="card" id="profileForm">
                <h2>Edit Profile</h2>

                <div class="form-field">
                    <label for="profileName">Full Name</label>
                    <input id="profileName" name="name" required
                        value="${escapeHTML(user.name)}">
                </div>

                <div class="form-field">
                    <label for="profileEmail">Email</label>
                    <input id="profileEmail" name="email" type="email"
                        required value="${escapeHTML(user.email)}">
                </div>

                <div class="notice">
                    Profile changes are stored in this browser demo only.
                </div>

                <button class="button button-lime" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    `;
}

function renderChat() {
    const messages = chatHistory.length ? chatHistory : [{
        role: "assistant",
        content: "Hi! Ask me a study question. Connect the AI backend to receive real answers."
    }];

    return `
        ${heading("LEARN SMARTER", "AI Assistant",
            "Get support with your learning and revision.")}

        <div class="chat-layout">
            <section class="card chat-window">
                <div class="chat-header">
                    <h2>✳ LearnHub AI</h2>
                    <p class="subtitle">Study support assistant</p>
                </div>

                <div class="chat-messages" id="chatMessages">
                    ${messages.map(message => `
                        <div class="message ${message.role === "user" ? "user" : "assistant"}">
                            ${escapeHTML(message.content)}
                        </div>
                    `).join("")}
                </div>

                <form class="chat-form" id="chatForm">
                    <input id="chatInput" required maxlength="2000"
                        placeholder="Ask a study question...">
                    <button class="button button-lime" type="submit">Send</button>
                </form>
            </section>

            <aside class="card">
                <h2>Suggested Prompts</h2>
                <button class="suggestion" data-prompt="Explain data structures in simple words.">
                    Explain a concept
                </button>
                <button class="suggestion" data-prompt="Create a five-day revision plan.">
                    Create a revision plan
                </button>
                <button class="suggestion" data-prompt="Give me five beginner Python questions.">
                    Practice questions
                </button>
            </aside>
        </div>
    `;
}

function renderAuth(mode) {
    const register = mode === "register";

    return `
        <div style="max-width:450px;margin:25px auto">
            <form class="card" id="authForm">
                <div class="brand" style="margin:0 0 20px;color:var(--blue)">
                    <span class="brand-icon">L</span>
                    Learn<span style="color:var(--blue)">Hub</span>
                </div>

                <h1>${register ? "Create Account" : "Welcome Back"}</h1>
                <p class="subtitle" style="margin-bottom:22px">
                    ${register ? "Join the student resource community." : "Log in to your learning space."}
                </p>

                ${register ? `
                    <div class="form-field">
                        <label for="authName">Full Name</label>
                        <input id="authName" name="name" required>
                    </div>
                ` : ""}

                <div class="form-field">
                    <label for="authEmail">Email Address</label>
                    <input id="authEmail" name="email" type="email" required>
                </div>

                <div class="form-field">
                    <label for="authPassword">Password</label>
                    <input id="authPassword" name="password" type="password"
                        required minlength="8">
                </div>

                <div class="notice">
                    Demo mode only: do not use a real password.
                </div>

                <button class="button button-lime" type="submit">
                    ${register ? "Create Account" : "Log In"}
                </button>

                <p style="margin-top:18px;font-size:12px">
                    ${register ? "Already registered?" : "New to LearnHub?"}
                    <button class="link-button" type="button"
                        data-page="${register ? "login" : "register"}">
                        ${register ? "Log in" : "Create account"}
                    </button>
                </p>
            </form>
        </div>
    `;
}

function renderDetails() {
    const r = selectedResource;

    if (!r) return "<div class='card'>Resource not found.</div>";

    return `
        ${heading("RESOURCE DETAILS", escapeHTML(r.title),
            escapeHTML(r.description))}

        <section class="card">
            <span class="tag">${escapeHTML(r.category)}</span>
            <br><br>
            <p><strong>File type:</strong> ${escapeHTML(r.type)}</p>
            <p><strong>Uploaded by:</strong> ${escapeHTML(r.author)}</p>
            <p><strong>Downloads:</strong> ${r.downloads}</p>

            <button class="button button-lime" id="downloadBtn">
                ↓ Download Resource
            </button>

            <button class="button button-outline" data-page="catalogue">
                Back to Catalogue
            </button>
        </section>
    `;
}

function renderAdmin() {
    if (currentUser?.role !== "admin") {
        return '<div class="card">Administrator access is required.</div>';
    }

    return `
        ${heading("ADMINISTRATION", "Admin Panel",
            "View the current resource catalogue.")}

        <div class="notice notice-warning">
            This is a UI preview. Real admin permissions must be enforced by the backend.
        </div>

        <section class="card table-wrap">
            <table>
                <thead>
                    <tr><th>Resource</th><th>Category</th><th>Author</th></tr>
                </thead>
                <tbody>
                    ${resources.map(r => `
                        <tr>
                            <td>${escapeHTML(r.title)}</td>
                            <td>${escapeHTML(r.category)}</td>
                            <td>${escapeHTML(r.author)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </section>
    `;
}

function renderPage() {
    updateNavigation();

    const pages = {
        dashboard: renderDashboard,
        catalogue: renderCatalogue,
        upload: renderUpload,
        profile: renderProfile,
        chat: renderChat,
        login: () => renderAuth("login"),
        register: () => renderAuth("register"),
        details: renderDetails,
        admin: renderAdmin
    };

    app.innerHTML = (pages[currentPage] || renderDashboard)();
}

function openResource(id) {
    selectedResource = resources.find(r => String(r.id) === String(id));
    goTo("details");
}

function filterResourceEvents() {
    const search = document.getElementById("searchInput");
    const category = document.getElementById("categoryFilter");

    if (search) search.addEventListener("input", filterResources);
    if (category) category.addEventListener("change", filterResources);
}

async function handleAuth(form) {
    const values = Object.fromEntries(new FormData(form).entries());

    try {
        if (!demoMode) {
            const result = currentPage === "register"
                ? await API.register(values)
                : await API.login(values);

            if (result.token || result.access_token) {
                sessionStorage.setItem(
                    "learnhub_token",
                    result.token || result.access_token
                );
            }

            currentUser = result.user || result;
        } else {
            currentUser = {
                name: values.name || values.email.split("@")[0],
                email: values.email,
                role: "student"
            };

            showToast("Demo session started. Backend auth is not connected.");
        }

        goTo("dashboard");
    } catch (error) {
        showToast(error.message);
    }
}

async function handleUpload(form) {
    const data = new FormData(form);
    const file = data.get("file");

    if (!file || !file.name) {
        showToast("Please select a file.");
        return;
    }

    if (!/\.(pdf|doc|docx|ppt|pptx|txt)$/i.test(file.name)) {
        showToast("Unsupported file format.");
        return;
    }

    try {
        if (!demoMode) {
            await API.upload(data);
            await loadResources();
        } else {
            resources.unshift({
                id: String(Date.now()),
                title: data.get("title"),
                category: data.get("category"),
                type: data.get("type"),
                author: currentUser?.name || "Student",
                description: data.get("description"),
                downloads: 0
            });

            showToast("Added to this demo session only.");
        }

        goTo("catalogue");
    } catch (error) {
        showToast(error.message);
    }
}

async function loadResources() {
    try {
        const result = await API.resources();

        resources = Array.isArray(result)
            ? result
            : result.resources || result.data || [];

        demoMode = false;
        renderPage();
    } catch (error) {
        showToast("Using sample data: " + error.message);
    }
}

async function sendMessage(message) {
    chatHistory.push({ role: "user", content: message });
    renderPage();

    try {
        if (demoMode) {
            chatHistory.push({
                role: "assistant",
                content: "This is a demo response. Connect the documented AI backend endpoint to receive real answers."
            });
        } else {
            const result = await API.chat(message, chatHistory);
            chatHistory.push({
                role: "assistant",
                content: result.reply || result.response || result.message
            });
        }
    } catch (error) {
        chatHistory.push({
            role: "assistant",
            content: "Unable to get a response: " + error.message
        });
    }

    renderPage();
}

document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");

    if (pageButton) {
        event.preventDefault();
        goTo(pageButton.dataset.page);
        return;
    }

    const resourceButton = event.target.closest("[data-resource]");

    if (resourceButton) {
        openResource(resourceButton.dataset.resource);
        return;
    }

    const prompt = event.target.closest("[data-prompt]");

    if (prompt) {
        sendMessage(prompt.dataset.prompt);
        return;
    }

    if (event.target.closest("#menuToggle")) {
        sidebar.classList.toggle("open");
    }

    if (event.target.closest("#profileShortcut")) {
        goTo("profile");
    }

    if (event.target.closest("#logoutBtn")) {
        currentUser = null;
        sessionStorage.removeItem("learnhub_token");
        goTo("login");
    }

    if (event.target.closest("#downloadBtn")) {
        if (demoMode) {
            showToast("Connect the backend download endpoint first.");
        } else {
            API.download(selectedResource.id).catch(error =>
                showToast(error.message)
            );
        }
    }
});

document.addEventListener("submit", async event => {
    event.preventDefault();

    const form = event.target;

    if (form.id === "authForm") {
        await handleAuth(form);
    }

    if (form.id === "uploadForm") {
        await handleUpload(form);
    }

    if (form.id === "profileForm") {
        const values = Object.fromEntries(new FormData(form).entries());

        currentUser = { ...currentUser, ...values };

        showToast("Profile updated for this session.");
        goTo("profile");
    }

    if (form.id === "chatForm") {
        const input = document.getElementById("chatInput");
        const message = input.value.trim();

        if (message) await sendMessage(message);
    }
});

document.addEventListener("input", event => {
    if (event.target.id === "searchInput") filterResources();
});

document.addEventListener("change", event => {
    if (event.target.id === "categoryFilter") filterResources();
});

const originalRenderPage = renderPage;

renderPage = function () {
    originalRenderPage();
    filterResourceEvents();
};

document.getElementById("profileShortcut").textContent = "S";
renderPage();
