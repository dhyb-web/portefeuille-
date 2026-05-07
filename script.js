const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".site-nav a");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Merci, ton message est pret. Il reste a connecter un vrai service d'envoi.";
  form.reset();
});

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
