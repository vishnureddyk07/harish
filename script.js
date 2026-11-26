const siteContent = {
  name: "Kathle Harish Kumar",
  city: "Hyderabad",
  phone: "+91 9398294547",
  email: "kathleharishkumar40@gmail.com",
  address: "[OFFICE ADDRESS]\nHyderabad, [STATE]",
  officeHours: "Monday – Saturday · 10:00 AM – 7:00 PM",
  established: "—",
  stats: [
    { value: "Clear advice", label: "Straightforward guidance" },
    { value: "Strategic", label: "Considered legal approach" },
    { value: "Personal", label: "Focused attention" },
    { value: "Professional", label: "Integrity in practice" }
  ],
  aboutFacts: [
    { label: "Education", value: "[LL.B / LL.M / Qualification]" },
    { label: "Experience", value: "[YEARS OF EXPERIENCE]" },
    { label: "Court practice", value: "[COURTS / JURISDICTION]" },
    { label: "Legal philosophy", value: "Clarity, care & integrity" }
  ],
  practiceAreas: [
    { title: "Civil Litigation", description: "Guidance and representation for civil disputes and proceedings." },
    { title: "Criminal Law", description: "Legal support for criminal matters, with careful attention to due process." },
    { title: "Family & Matrimonial Matters", description: "Considered counsel for sensitive family and matrimonial concerns." },
    { title: "Property & Real Estate", description: "Advice on property transactions, title concerns, and disputes." },
    { title: "Corporate & Commercial", description: "Practical legal support for businesses and commercial matters." },
    { title: "Consumer & Contract", description: "Assistance with consumer concerns and contractual obligations." },
    { title: "Legal Documentation", description: "Drafting and review of agreements and other legal documents." },
    { title: "Legal Consultation", description: "A clear first conversation about your legal options and next steps." }
  ],
  strengths: [
    { icon: "◌", title: "Personal Attention", description: "Every matter receives focused attention and careful consideration." },
    { icon: "⌘", title: "Strategic Thinking", description: "Legal solutions shaped around the facts, risks, and objectives." },
    { icon: "◇", title: "Clear Communication", description: "Straightforward communication without unnecessary legal complexity." },
    { icon: "§", title: "Professional Integrity", description: "Confidentiality, transparency, and ethical representation." }
  ],
  process: [
    { title: "CONSULTATION", description: "Understand your concern, priorities, and objectives." },
    { title: "ANALYSIS", description: "Review the facts and relevant legal considerations." },
    { title: "STRATEGY", description: "Discuss a practical approach and the available options." },
    { title: "REPRESENTATION", description: "Provide continued legal support and representation." }
  ],
  profile: [
    { label: "Education", value: "[LL.B / LL.M / Qualification]" },
    { label: "Bar enrollment", value: "[ENROLLMENT NUMBER]" },
    { label: "Practice", value: "[COURTS / JURISDICTION]" },
    { label: "Experience", value: "[YEARS OF EXPERIENCE]" },
    { label: "Areas", value: "[PRACTICE AREAS]" }
  ]
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

document.querySelectorAll("[data-content]").forEach((element) => {
  const key = element.dataset.content;
  if (Object.prototype.hasOwnProperty.call(siteContent, key)) {
    element.textContent = siteContent[key];
  }
});

const renderList = (selector, items, renderItem) => {
  const container = document.querySelector(selector);
  if (container) container.innerHTML = items.map(renderItem).join("");
};

renderList("#stats-grid", siteContent.stats, (item) => `
  <div class="stat-item reveal">
    <span class="stat-value" data-count-value="${escapeHtml(item.value)}">${escapeHtml(item.value)}</span>
    <span class="stat-label">${escapeHtml(item.label)}</span>
  </div>`);

renderList("#about-facts", siteContent.aboutFacts, (item) => `
  <div class="fact-item"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`);

renderList("#practice-grid", siteContent.practiceAreas, (item, index) => `
  <a class="practice-card" href="#contact">
    <span class="practice-number">${String(index + 1).padStart(2, "0")}</span>
    <h3 class="practice-title">${escapeHtml(item.title)}</h3>
    <p class="practice-description">${escapeHtml(item.description)}</p>
    <span class="practice-arrow" aria-hidden="true">↗</span>
  </a>`);

renderList("#features-grid", siteContent.strengths, (item, index) => `
  <article class="feature-card">
    <span class="feature-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
    <span class="feature-number">0${index + 1}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.description)}</p>
  </article>`);

renderList("#process-grid", siteContent.process, (item, index) => `
  <article class="process-step">
    <span>0${index + 1}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.description)}</p>
  </article>`);

renderList("#profile-details", siteContent.profile, (item) => `
  <div class="profile-detail"><dt>${escapeHtml(item.label)}</dt><dd>${escapeHtml(item.value)}</dd></div>`);

const contactList = document.querySelector("#contact-list");
if (contactList) {
  contactList.innerHTML = [
    ["Phone", siteContent.phone],
    ["Email", siteContent.email],
    ["Office", siteContent.address]
  ].map(([label, value]) => `<dl class="contact-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></dl>`).join("");
}

const phoneDigits = siteContent.phone.replace(/\D/g, "");
document.querySelectorAll('[data-contact-link="phone"], [data-footer-contact="phone"]').forEach((link) => {
  link.href = phoneDigits ? `tel:${phoneDigits}` : "#contact";
});
document.querySelectorAll('[data-contact-link="email"], [data-footer-contact="email"]').forEach((link) => {
  link.href = siteContent.email.includes("@") ? `mailto:${siteContent.email}` : "#contact";
});
document.querySelectorAll('[data-contact-link="whatsapp"]').forEach((link) => {
  link.href = phoneDigits.length >= 10 ? `https://wa.me/${phoneDigits}` : "#contact";
});

const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
  navLinks?.classList.remove("open");
};
menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navLinks?.classList.toggle("open", isOpen);
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealElements = document.querySelectorAll(".reveal, .practice-card, .feature-card, .process-step");
if ("IntersectionObserver" in window) {
  const animateStat = (item) => {
    const value = item.querySelector("[data-count-value]");
    const target = Number.parseInt(value?.dataset.countValue ?? "", 10);
    if (!value || !Number.isFinite(target)) return;
    const suffix = value.dataset.countValue.slice(String(target).length);
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      value.textContent = `${Math.round(target * progress)}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      if (entry.target.matches(".stat-item")) animateStat(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const enquiryForm = document.querySelector("#enquiry-form");
const formSuccess = document.querySelector("#form-success");
const formStatus = document.querySelector("#form-status");
const validateField = (field) => {
  const error = field.parentElement.querySelector(".field-error");
  field.parentElement.classList.remove("invalid");
  if (error) error.textContent = "";
  if (field.name === "phone") {
    const digitCount = field.value.replace(/\D/g, "").length;
    field.setCustomValidity(field.value.trim() && (digitCount < 7 || digitCount > 15) ? "Please enter a valid phone number." : "");
  }
  if (!field.required && !field.value.trim()) return true;
  if (field.validity.valid) return true;
  field.parentElement.classList.add("invalid");
  if (error) {
    error.textContent = field.validity.valueMissing
      ? "Please complete this field."
      : field.validity.customError
        ? field.validationMessage
      : field.validity.typeMismatch
        ? "Please enter a valid email address."
        : `Please enter at least ${field.minLength} characters.`;
  }
  return false;
};

enquiryForm?.querySelectorAll("input[required], textarea[required], input[type='email']").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.parentElement.classList.contains("invalid")) validateField(field);
  });
});

enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...enquiryForm.querySelectorAll("input[required], textarea[required], input[type='email']")];
  const valid = fields.map(validateField).every(Boolean);
  if (!valid) {
    formStatus.textContent = "Please review the highlighted fields and try again.";
    enquiryForm.querySelector(".invalid input, .invalid textarea")?.focus();
    return;
  }
  formStatus.textContent = "";
  enquiryForm.hidden = true;
  formSuccess.hidden = false;
});
