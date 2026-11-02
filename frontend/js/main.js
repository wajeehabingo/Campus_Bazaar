document.addEventListener("DOMContentLoaded", function () {
    // 1. Create the Transition Overlay dynamically
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

    // 2. Play Reveal Entrance on Page Load (Stays visible for 1.5s after landing)
    overlay.classList.add("active");
    setTimeout(() => {
        overlay.classList.remove("active");
    }, 1500);

    // 3. Intercept Clicks for Page Exit Animation (5-second delay)
    const links = document.querySelectorAll("a[href]");

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // Ignore anchors, JS calls, external links, or new tab links
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("javascript:") ||
                href.startsWith("http") ||
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
});