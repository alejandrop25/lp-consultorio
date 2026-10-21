const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealElements = document.querySelectorAll(".reveal");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 12);
}

function closeMenu() {
    navMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");

    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
} else {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 1040) {
        closeMenu();
    }
});