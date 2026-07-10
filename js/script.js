document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (menuButton && mobileMenu && menuIcon) {
        menuButton.addEventListener("click", () => {
            const isOpen = !mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden");
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            menuIcon.textContent = isOpen ? "☰" : "✕";
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                menuButton.setAttribute("aria-expanded", "false");
                menuIcon.textContent = "☰";
            });
        });
    }

    const params = new URLSearchParams(window.location.search);
    const selectedPlan = params.get("plan");
    const selectedProject = params.get("project");
    const messageField = document.getElementById("message");

    if (messageField && selectedPlan) {
        messageField.value = `I am interested in the ${selectedPlan} website plan. Please share the next steps.`;
    } else if (messageField && selectedProject) {
        messageField.value = `I want a website similar to the ${selectedProject} project. Please share the next steps.`;
    }

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const phone = document.getElementById("phone")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            const subject = encodeURIComponent(`Website enquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nProject details:\n${message}`
            );

            if (formStatus) {
                formStatus.textContent = "Opening your email application...";
                formStatus.classList.remove("hidden");
            }

            window.location.href = `mailto:novaforgeai@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
