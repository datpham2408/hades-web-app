function closeMenu() {
  if (dom.menu) {
    dom.menu.classList.remove("active");
  }

  if (dom.overlay) {
    dom.overlay.classList.remove("active");
  }
}

function isSearchTrigger(target) {
  return (
    target.classList.contains("nav-search") ||
    target.classList.contains("mobile-search-trigger")
  );
}

function isOpenCartClickOutside(target) {
  return (
    document.body.classList.contains("cart-open") &&
    !target.closest(".cart-drawer") &&
    !target.closest(".nav-cart") &&
    !target.closest(".mobile-cart-trigger")
  );
}

function isOpenSearchClickOutside(target) {
  return (
    document.body.classList.contains("search-open") &&
    !target.closest(".search-drawer") &&
    !target.closest(".nav-search") &&
    !target.closest(".mobile-search-trigger")
  );
}

let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || "light";

function getThemeLabel() {
  return currentTheme === "dark" ? t("themeLight") : t("themeDark");
}

function updateThemeToggleButtons() {
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(currentTheme === "dark"));
    button.dataset.theme = currentTheme;

    const label = button.querySelector(".theme-toggle-label");
    const icon = button.querySelector(".theme-toggle-icon");

    if (label) {
      label.textContent = getThemeLabel();
    } else {
      button.textContent = getThemeLabel();
    }

    if (icon) {
      icon.className =
        currentTheme === "dark"
          ? "bx bx-sun theme-toggle-icon"
          : "bx bx-moon theme-toggle-icon";
    }
  });
}

function applyTheme() {
  document.body.classList.toggle("dark-theme", currentTheme === "dark");
  document.documentElement.dataset.theme = currentTheme;
  updateThemeToggleButtons();
}

function setTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
  applyTheme();
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: currentTheme } }));
}

function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function createThemeToggleButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.setAttribute("aria-pressed", String(currentTheme === "dark"));
  button.innerHTML = `
    <i class="bx ${currentTheme === "dark" ? "bx-sun" : "bx-moon"} theme-toggle-icon" aria-hidden="true"></i>
    <span class="theme-toggle-label">${getThemeLabel()}</span>
  `;
  return button;
}

function createMobileLoginLink() {
  const link = document.createElement("a");
  link.className = "mobile-login-trigger";
  link.href = getPageUrl("auth.html");
  link.setAttribute("aria-label", t("login"));
  link.innerHTML = '<i class="bx bx-user-circle" aria-hidden="true"></i>';
  return link;
}

function injectThemeToggle() {
  const containers = [
    {
      container: document.querySelector(".nav-actions"),
      before: ".nav-lang",
    },
    {
      container: document.querySelector(".auth-nav"),
      before: ".auth-lang",
    },
  ];

  containers.forEach(({ container, before }) => {
    if (!container || container.querySelector(".theme-toggle")) {
      return;
    }

    const button = createThemeToggleButton();
    const anchor = before ? container.querySelector(before) : null;

    if (anchor) {
      container.insertBefore(button, anchor);
    } else {
      container.appendChild(button);
    }
  });
}

function injectMobileLoginLink() {
  const mobileIcons = document.querySelector(".mobile-icons");

  if (!mobileIcons || mobileIcons.querySelector(".mobile-login-trigger")) {
    return;
  }

  const searchTrigger = mobileIcons.querySelector(".mobile-search-trigger");

  if (searchTrigger) {
    mobileIcons.insertBefore(createMobileLoginLink(), searchTrigger.nextSibling);
    return;
  }

  mobileIcons.appendChild(createMobileLoginLink());
}

function handleDocumentClick(event) {
  const { target } = event;

  if (isSearchTrigger(target)) {
    openSearch(event);
    return;
  }

  if (target.classList.contains("buy-now-btn")) {
    buyNow(Number(target.dataset.id));
    return;
  }

  if (target.classList.contains("add-cart-btn")) {
    addToCart(Number(target.dataset.id));
    return;
  }

  if (target.closest(".theme-toggle")) {
    toggleTheme();
    return;
  }

  if (target.classList.contains("cart-qty-btn")) {
    const delta = target.dataset.action === "increase" ? 1 : -1;
    changeCartItemQuantity(Number(target.dataset.id), delta);
    return;
  }

  if (target.classList.contains("cart-remove-btn")) {
    removeItem(Number(target.dataset.id));
    return;
  }

  const cartActionButton = target.closest(".cart-actions button");

  if (cartActionButton) {
    const actions = Array.from(
      cartActionButton.closest(".cart-actions").querySelectorAll("button"),
    );
    const buttonIndex = actions.indexOf(cartActionButton);

    if (buttonIndex === 1) {
      window.location.href = getPageUrl("checkout.html");
      return;
    }
  }

  if (isOpenCartClickOutside(target)) {
    closeCart();
  }

  if (isOpenSearchClickOutside(target)) {
    closeSearch();
  }
}

function handleDocumentChange(event) {
  if (
    event.target.classList.contains("nav-lang") ||
    event.target.classList.contains("cart-lang")
  ) {
    setLanguage(event.target.value);
  }
}

function handleDocumentInput(event) {
  if (event.target.classList.contains("search-input")) {
    renderSearchResults(event.target.value);
  }
}

function initLoader() {
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-wrapper");

    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");
      }, 3000);
    }
  });
}

function initMobileMenu() {
  if (dom.openBtn && dom.menu && dom.overlay) {
    dom.openBtn.addEventListener("click", () => {
      dom.menu.classList.add("active");
      dom.overlay.classList.add("active");
    });
  }

  if (dom.closeBtn) {
    dom.closeBtn.addEventListener("click", closeMenu);
  }

  if (dom.overlay) {
    dom.overlay.addEventListener("click", closeMenu);
  }
}

function initNavbar() {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = qs(SELECTORS.navbar);

    if (!navbar) {
      return;
    }

    window.addEventListener("scroll", () => {
      navbar.style.transform = "translateY(0)";
    });
  });
}

function initOverlays() {
  if (dom.cartOverlay) {
    dom.cartOverlay.addEventListener("click", closeCart);
  }

  if (dom.searchOverlay) {
    dom.searchOverlay.addEventListener("click", closeSearch);
  }
}

function initGlobalEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("change", handleDocumentChange);
  document.addEventListener("input", handleDocumentInput);
}

function initApp() {
  initLoader();
  initMobileMenu();
  initNavbar();
  injectThemeToggle();
  injectMobileLoginLink();
  initOverlays();
  initGlobalEvents();

  applyTheme();
  renderSearchResults();
  renderCart();
  updateCartCount();
  applyLanguage();
  initAuthForm();
}

initApp();
