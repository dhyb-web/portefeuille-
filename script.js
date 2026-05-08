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
  const formData = new FormData(form);
  const submitButton = form.querySelector("button[type='submit']");

  submitButton.disabled = true;
  formNote.textContent = "Envoi du message...";

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur d'envoi");
      }

      form.reset();
      formNote.textContent = "Merci, votre message a bien ete envoye.";
    })
    .catch(() => {
      formNote.textContent = "L'envoi a echoue. Vous pouvez me contacter par email ou WhatsApp.";
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
