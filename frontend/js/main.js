document.addEventListener("DOMContentLoaded", function () {
    // =========================================================
    // 1. ACADEMIC PAGE TRANSITION OVERLAY
    // =========================================================
    let overlay = document.getElementById("academic-transition-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "academic-transition-overlay";
        overlay.innerHTML = `
            <div class="transition-curtain"></div>
            <div class="transition-content">
                <div class="transition-badge">CB</div>
                <div class="transition-text">Campus Bazaar</div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // Play Reveal Entrance on Page Load (Stays visible for 1.5s after landing)
    overlay.classList.add("active");
    setTimeout(() => {
        overlay.classList.remove("active");
    }, 1500);

    // Intercept Clicks for Page Exit Animation (5-second delay)
    const links = document.querySelectorAll("a[href]");

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // Ignore anchors, JS calls, external/backend links, or new tab links
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("javascript:") ||
                href.startsWith("http") ||
                href.startsWith("/api") ||
                this.target === "_blank"
            ) {
                return;
            }

            e.preventDefault();

            // Trigger Transition Curtain
            document.body.classList.add("page-exiting");
            overlay.classList.add("active");

            // Hold curtain for 5000ms (5 seconds) before opening the next page
            setTimeout(() => {
                window.location.href = href;
            }, 5000);
        });
    });

    // =========================================================
    // 2. INJECT GLOBAL STYLES FOR POLICY BANNER & AI CHATBOT
    // =========================================================
    const currentPage = decodeURIComponent(window.location.pathname.split("/").pop() || "").toLowerCase();
    const isAuthOrLanding =
        currentPage === "" ||
        currentPage === "index.html" ||
        currentPage === "home page.html" ||
        currentPage === "login.html" ||
        currentPage === "register.html";
    const isFullAiPage = currentPage === "ai-assistant.html";

    const globalWidgetStyles = document.createElement("style");
    globalWidgetStyles.textContent = `
        /* GLOBAL CONTENT MODERATION & POLICY BANNER */
        .cb-policy-banner {
            background: #fff9db;
            border-bottom: 2px solid #ffd84d;
            color: #153e63;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12.5px;
            padding: 9px 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            position: relative;
            z-index: 95;
        }
        .cb-policy-badge {
            background: #153e63;
            color: #ffd84d;
            font-weight: 800;
            font-size: 10px;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 4px;
            letter-spacing: 0.4px;
            flex-shrink: 0;
        }
        .cb-policy-close {
            background: transparent;
            border: none;
            color: #153e63;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            padding: 0 6px;
            margin-left: auto;
        }

        /* FLOATING AI CHATBOT WIDGET */
        .cb-ai-launcher {
            position: fixed;
            right: 24px;
            bottom: 24px;
            z-index: 9990;
            background: #153e63;
            color: #ffffff;
            border: 2px solid #ffd84d;
            border-radius: 999px;
            padding: 12px 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 13px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 26px rgba(21, 62, 99, 0.28);
            transition: transform 0.2s, background 0.2s;
        }
        .cb-ai-launcher:hover {
            transform: translateY(-2px);
            background: #0e2e4c;
        }
        .cb-ai-launcher-dot {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #ffd84d;
            color: #153e63;
            display: grid;
            place-items: center;
            font-weight: 900;
            font-size: 11px;
        }

        .cb-ai-drawer {
            position: fixed;
            right: 24px;
            bottom: 84px;
            width: 350px;
            max-width: calc(100vw - 32px);
            background: #ffffff;
            border: 1px solid #e0e5ea;
            border-top: 4px solid #ffd84d;
            border-radius: 14px;
            box-shadow: 0 16px 38px rgba(21, 62, 99, 0.22);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 9991;
            font-family: Arial, Helvetica, sans-serif;
        }
        .cb-ai-drawer.open {
            display: flex;
        }
        .cb-ai-header {
            background: #153e63;
            color: #ffffff;
            padding: 13px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .cb-ai-header-title {
            font-size: 14px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .cb-ai-header-sub {
            font-size: 11px;
            color: #ffd84d;
            font-weight: 700;
        }
        .cb-ai-close {
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
        }
        .cb-ai-messages {
            height: 270px;
            overflow-y: auto;
            padding: 14px;
            background: #f1f3f5;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 13px;
            line-height: 1.45;
        }
        .cb-ai-msg {
            padding: 10px 12px;
            border-radius: 10px;
            max-width: 86%;
            word-wrap: break-word;
        }
        .cb-ai-msg.bot {
            background: #ffffff;
            color: #252a30;
            border: 1px solid #e0e5ea;
            align-self: flex-start;
        }
        .cb-ai-msg.user {
            background: #153e63;
            color: #ffffff;
            align-self: flex-end;
        }
        .cb-ai-form {
            display: flex;
            gap: 8px;
            padding: 10px;
            background: #ffffff;
            border-top: 1px solid #e0e5ea;
        }
        .cb-ai-input {
            flex: 1;
            height: 38px;
            border: 1px solid #e0e5ea;
            border-radius: 8px;
            padding: 0 12px;
            font-size: 13px;
            outline: none;
        }
        .cb-ai-input:focus {
            border-color: #153e63;
        }
        .cb-ai-send {
            background: #ffd84d;
            color: #153e63;
            border: none;
            border-radius: 8px;
            padding: 0 14px;
            height: 38px;
            font-size: 12px;
            font-weight: 800;
            cursor: pointer;
        }
        .cb-ai-send:hover {
            background: #ffcd24;
        }
    `;
    document.head.appendChild(globalWidgetStyles);

    // =========================================================
    // 3. CONTENT MODERATION & POLICY BANNER (STUDENT PAGES)
    // =========================================================
    if (!isAuthOrLanding && sessionStorage.getItem("cb_policy_dismissed") !== "1") {
        const navbar = document.querySelector(".navbar");
        const banner = document.createElement("div");
        banner.className = "cb-policy-banner";
        banner.innerHTML = `
            <span class="cb-policy-badge">Academic Policy</span>
            <span>All shared files are moderated: upload only verified text-based <strong>.pdf</strong>, <strong>.docx</strong>, or <strong>.pptx</strong> documents strictly <strong>below 1 MB</strong>.</span>
            <button type="button" class="cb-policy-close" aria-label="Dismiss policy notice">&times;</button>
        `;

        if (navbar && navbar.parentNode) {
            navbar.parentNode.insertBefore(banner, navbar.nextSibling);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }

        const closeBtn = banner.querySelector(".cb-policy-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                banner.remove();
                sessionStorage.setItem("cb_policy_dismissed", "1");
            });
        }
    }

    // =========================================================
    // 4. GLOBAL FLOATING AI CHATBOT WIDGET (POST /api/ai/ask)
    // =========================================================
    if (!isAuthOrLanding && !isFullAiPage) {
        const launcher = document.createElement("button");
        launcher.type = "button";
        launcher.className = "cb-ai-launcher";
        launcher.setAttribute("aria-label", "Open Campus Bazaar AI Study Assistant");
        launcher.innerHTML = `
            <span class="cb-ai-launcher-dot">AI</span>
            <span>Ask Study Bot</span>
        `;

        const drawer = document.createElement("div");
        drawer.className = "cb-ai-drawer";
        drawer.innerHTML = `
            <div class="cb-ai-header">
                <div>
                    <div class="cb-ai-header-title">Campus Bazaar AI</div>
                    <div class="cb-ai-header-sub">DS &bull; SE &bull; BDA &bull; AC Study Helper</div>
                </div>
                <button type="button" class="cb-ai-close" id="cbAiCloseBtn" aria-label="Close AI chat">&times;</button>
            </div>
            <div class="cb-ai-messages" id="cbAiMessages">
                <div class="cb-ai-msg bot">
                    Assalam-o-Alaikum! Ask me any quick question about your courses, notes, or exam topics.
                </div>
            </div>
            <form class="cb-ai-form" id="cbAiForm">
                <input type="text" class="cb-ai-input" id="cbAiInput" placeholder="Ask a study question..." required>
                <button type="submit" class="cb-ai-send">Ask</button>
            </form>
        `;

        document.body.appendChild(launcher);
        document.body.appendChild(drawer);

        const closeDrawerBtn = drawer.querySelector("#cbAiCloseBtn");
        const aiForm = drawer.querySelector("#cbAiForm");
        const aiInput = drawer.querySelector("#cbAiInput");
        const aiMessages = drawer.querySelector("#cbAiMessages");

        launcher.addEventListener("click", function () {
            drawer.classList.toggle("open");
            if (drawer.classList.contains("open") && aiInput) {
                aiInput.focus();
            }
        });

        if (closeDrawerBtn) {
            closeDrawerBtn.addEventListener("click", function () {
                drawer.classList.remove("open");
            });
        }

        function appendBotMessage(text, isUser) {
            if (!aiMessages) return;
            const bubble = document.createElement("div");
            bubble.className = isUser ? "cb-ai-msg user" : "cb-ai-msg bot";
            bubble.textContent = text;
            aiMessages.appendChild(bubble);
            aiMessages.scrollTop = aiMessages.scrollHeight;
            return bubble;
        }

        function generateLocalStudyReply(promptText) {
            const q = promptText.toLowerCase();
            if (q.includes("upload") || q.includes("size") || q.includes("mb")) {
                return "Campus Bazaar accepts text-based .pdf, .docx, and .pptx documents strictly under 1 MB. Transcribe handwritten notes into a text PDF before uploading.";
            }
            if (q.includes("sql") || q.includes("database") || q.includes("normal")) {
                return "Quick tip: 1NF removes repeating groups, 2NF removes partial dependencies on composite keys, and 3NF removes transitive dependencies.";
            }
            if (q.includes("tree") || q.includes("stack") || q.includes("queue") || q.includes("dsa")) {
                return "Stacks follow LIFO (O(1) push/pop), Queues follow FIFO, and balanced BSTs support O(log n) search, insert, and delete.";
            }
            return "You can open the full AI Assistant tab for document-grounded Q&A and practice quiz generation across DS, SE, BDA, and AC courses!";
        }

        if (aiForm && aiInput) {
            aiForm.addEventListener("submit", async function (e) {
                e.preventDefault();
                const question = String(aiInput["value"] || "").trim();
                if (!question) return;

                appendBotMessage(question, true);
                aiInput["value"] = "";
                const thinkingBubble = appendBotMessage("Thinking...", false);

                const baseUrl = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.API_BASE_URL)
                    ? APP_CONFIG.API_BASE_URL
                    : "http://localhost:5195";

                try {
                    const token = sessionStorage.getItem("campus_bazaar_token");
                    const headers = { "Content-Type": "application/json" };
                    if (token) headers["Authorization"] = `Bearer ${token}`;

                    const response = await fetch(`${baseUrl}/api/ai/ask`, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({ question: question, prompt: question })
                    });

                    if (!response.ok) throw new Error("AI endpoint unavailable");

                    const data = await response.json();
                    const reply = data.answer || data.reply || data.response || data.message || generateLocalStudyReply(question);
                    if (thinkingBubble) thinkingBubble.textContent = reply;
                } catch (err) {
                    if (thinkingBubble) thinkingBubble.textContent = generateLocalStudyReply(question);
                }
            });
        }
    }
});