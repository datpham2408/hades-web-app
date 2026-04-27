function closeMenu() {
  const menu = qs(SELECTORS.mobileMenu);
  const overlay = qs(SELECTORS.overlay);
  const openButton = qs(".menu-open");

  if (menu) {
    menu.classList.remove("active");
    menu.setAttribute("aria-hidden", "true");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }

  if (openButton) {
    openButton.setAttribute("aria-expanded", "false");
  }

  document.body.classList.remove("mobile-menu-open");
}

function openMenu() {
  const menu = qs(SELECTORS.mobileMenu);
  const overlay = qs(SELECTORS.overlay);
  const openButton = qs(".menu-open");

  if (menu) {
    menu.classList.add("active");
    menu.setAttribute("aria-hidden", "false");
  }

  if (overlay) {
    overlay.classList.add("active");
  }

  if (openButton) {
    openButton.setAttribute("aria-expanded", "true");
  }

  document.body.classList.add("mobile-menu-open");
}

function isSearchTrigger(target) {
  return Boolean(target.closest(".nav-search, .mobile-search-trigger"));
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

const HADES_LOGO_SRC =
  "https://theme.hstatic.net/1000306633/1001194548/14/logo_menu_no_scroll.png?v=506";

function getHomeUrl(hash = "") {
  const isHtmlPage = window.location.pathname.includes("/html/");
  return `${isHtmlPage ? "../index.html" : "index.html"}${hash}`;
}

function getCatalogUrl(page) {
  return `${getPageUrl(page)}#product-list`;
}

function getPrimaryNav() {
  return {
    shop: [
      { label: "SHOP ALL", href: getHomeUrl("#product-list") },
      { label: "TOPS", href: getCatalogUrl("tops.html") },
      { label: "BOTTOMS", href: getCatalogUrl("bottoms.html") },
      { label: "OUTERWEARS", href: getCatalogUrl("outerwear.html") },
      { label: "UNDERWEARS", href: getCatalogUrl("underwear.html") },
      { label: "BAGS", href: getCatalogUrl("bags.html") },
      { label: "ACCESSORIES", href: getCatalogUrl("accessory.html") },
    ],
    sale: { label: "SALE", href: getCatalogUrl("sale.html") },
    info: [
      { label: "RECRUITMENT", href: getPageUrl("recruitment.html") },
      { label: t("projectInfo"), href: getPageUrl("project-info.html"), key: "project-info" },
    ],
  };
}

function getNavLinkMarkup(item, className = "nav-dropdown-link") {
  const keyAttr = item.key ? ` data-nav-key="${item.key}"` : "";
  return `<a class="${className}" href="${item.href}"${keyAttr}>${item.label}</a>`;
}

function getDesktopDropdownMarkup(labelKey, label, items) {
  return `
    <li class="nav-dropdown">
      <button class="nav-menu-button" type="button" aria-haspopup="true" aria-expanded="false">
        <span data-nav-label="${labelKey}">${label}</span>
        <i class="bx bx-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="nav-dropdown-panel">
        ${items.map((item) => getNavLinkMarkup(item)).join("")}
      </div>
    </li>
  `;
}

function upgradeNavbar() {
  const navbar = qs(SELECTORS.navbar);

  if (!navbar || navbar.dataset.enhanced === "true") {
    return;
  }

  const nav = getPrimaryNav();
  const logoSrc = navbar.querySelector(".nav-logo img")?.getAttribute("src") || HADES_LOGO_SRC;

  navbar.dataset.enhanced = "true";
  navbar.innerHTML = `
    <button class="nav-icon-button menu-open" type="button" aria-label="${t("menu")}" aria-expanded="false">
      <i class="bx bx-menu" aria-hidden="true"></i>
    </button>

    <div class="nav-logo">
      <a href="${getHomeUrl()}" aria-label="HADES">
        <img src="${logoSrc}" alt="HADES" />
      </a>
    </div>

    <ul class="nav-menu" aria-label="Primary navigation">
      ${getDesktopDropdownMarkup("shop", t("shop"), nav.shop)}
      <li><a class="nav-menu-link nav-sale-link" href="${nav.sale.href}">${nav.sale.label}</a></li>
      ${getDesktopDropdownMarkup("info", t("info"), nav.info)}
    </ul>

    <div class="nav-actions">
      <button class="nav-search" type="button" aria-label="${t("search")}" title="${t("search")}">
        <i class="bx bx-search" aria-hidden="true"></i>
        <span class="nav-search-text">${t("search")}</span>
      </button>

      <button class="nav-cart" type="button" onclick="openCart(event)" aria-label="${t("cart")} (0)" title="${t("cart")} (0)">
        <i class="bx bx-shopping-bag" aria-hidden="true"></i>
        <span class="nav-cart-text">${t("cart")}</span>
        <span class="nav-cart-count" id="cart-count">0</span>
      </button>

      <select class="nav-lang" aria-label="${t("language")}">
        <option value="vi">VI</option>
        <option value="en">EN</option>
      </select>

      <div class="nav-account">
        <a href="${getPageUrl("auth.html")}" class="nav-login" data-auth-action="login" aria-label="${t("login")}">
          <i class="bx bx-user-circle" aria-hidden="true"></i>
          <span class="nav-login-text">${t("login")}</span>
        </a>
        <div class="nav-account-menu" hidden></div>
      </div>
    </div>

    <button class="nav-icon-button mobile-cart-trigger" type="button" onclick="openCart(event)" aria-label="${t("cart")}">
      <i class="bx bx-shopping-bag" aria-hidden="true"></i>
      <span class="mobile-cart-badge" data-cart-count>0</span>
    </button>
  `;
}

function upgradeMobileMenu() {
  const navbar = qs(SELECTORS.navbar);
  const menu = qs(SELECTORS.mobileMenu);

  if (!navbar || !menu || menu.dataset.enhanced === "true") {
    return;
  }

  const nav = getPrimaryNav();

  menu.dataset.enhanced = "true";
  menu.setAttribute("aria-hidden", "true");
  menu.innerHTML = `
    <div class="mobile-menu-head">
      <a class="mobile-menu-logo" href="${getHomeUrl()}" aria-label="HADES">
        <img src="${HADES_LOGO_SRC}" alt="HADES" />
      </a>
      <button class="menu-close nav-icon-button" type="button" aria-label="Close menu">
        <i class="bx bx-x" aria-hidden="true"></i>
      </button>
    </div>

    <nav class="mobile-menu-nav" aria-label="Mobile navigation">
      <details class="mobile-nav-group" open>
        <summary>
          <span data-nav-label="shop">${t("shop")}</span>
          <i class="bx bx-chevron-down" aria-hidden="true"></i>
        </summary>
        <ul>
          ${nav.shop.map((item) => `<li>${getNavLinkMarkup(item, "mobile-sub-link")}</li>`).join("")}
        </ul>
      </details>

      <a class="mobile-menu-link mobile-sale-link" href="${nav.sale.href}">
        <span>${nav.sale.label}</span>
        <i class="bx bx-right-arrow-alt" aria-hidden="true"></i>
      </a>

      <details class="mobile-nav-group">
        <summary>
          <span data-nav-label="info">${t("info")}</span>
          <i class="bx bx-chevron-down" aria-hidden="true"></i>
        </summary>
        <ul>
          ${nav.info.map((item) => `<li>${getNavLinkMarkup(item, "mobile-sub-link")}</li>`).join("")}
        </ul>
      </details>

      <button class="mobile-menu-link mobile-search-trigger" type="button">
        <span class="mobile-search-label">${t("search")}</span>
        <i class="bx bx-search" aria-hidden="true"></i>
      </button>

      <a class="mobile-menu-link mobile-account-link" href="${getPageUrl("auth.html")}">
        <span class="mobile-account-label">${t("account")}</span>
        <i class="bx bx-user-circle" aria-hidden="true"></i>
      </a>

      <div class="mobile-account-panel" hidden></div>
    </nav>

    <div class="mobile-menu-tools">
      <span class="mobile-tools-label">${t("language")}</span>
      <select class="nav-lang mobile-nav-lang" aria-label="${t("language")}">
        <option value="vi">VI</option>
        <option value="en">EN</option>
      </select>
    </div>
  `;
}

function upgradeNavigation() {
  upgradeNavbar();
  upgradeMobileMenu();
}

function getThemeLabel() {
  return currentTheme === "dark" ? t("themeLight") : t("themeDark");
}

function updateThemeToggleButtons() {
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(currentTheme === "dark"));
    button.dataset.theme = currentTheme;

    const label = button.querySelector(".theme-toggle-label");
    const icon = button.querySelector(".theme-toggle-icon");

    button.setAttribute("aria-label", getThemeLabel());
    button.title = getThemeLabel();

    if (label) {
      label.remove();
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
  button.setAttribute("aria-label", getThemeLabel());
  button.title = getThemeLabel();
  button.innerHTML = `
    <i class="bx ${currentTheme === "dark" ? "bx-sun" : "bx-moon"} theme-toggle-icon" aria-hidden="true"></i>
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

function getEscapedDisplayName(user) {
  if (!user) {
    return "";
  }

  if (typeof escapeHtml === "function") {
    return escapeHtml(user.displayName);
  }

  return String(user.displayName).replace(/[&<>"']/g, "");
}

function createLegacyMobileAccountPanel(user) {
  const panel = document.createElement("div");
  panel.className = "mobile-account-panel";
  panel.innerHTML = `
    <div class="mobile-account-main">
      <span class="mobile-account-avatar"><i class="bx bx-user"></i></span>
      <span class="mobile-account-copy">
        <strong>${getEscapedDisplayName(user)}</strong>
        <small>${user.role === "admin" ? "ADMIN" : "USER"}</small>
      </span>
    </div>
    <div class="mobile-account-actions">
      ${
        user.role === "admin"
          ? `<a class="mobile-account-admin" href="${getPageUrl("admin.html")}">${t("adminDashboard")}</a>`
          : ""
      }
      <button type="button" data-auth-action="logout">ĐĂNG XUẤT</button>
    </div>
  `;
  return panel;
}

function syncLegacyMobileAccountUI() {
  const user = getCurrentUser();
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLoginLink = document.querySelector(".mobile-login-trigger");
  const existingPanel = document.querySelector(".mobile-account-panel");

  existingPanel?.remove();

  if (mobileLoginLink) {
    mobileLoginLink.href = user ? "#" : getPageUrl("auth.html");
    mobileLoginLink.dataset.authAction = user ? "logout" : "login";
    mobileLoginLink.setAttribute("aria-label", user ? t("logout") : t("login"));
    mobileLoginLink.innerHTML = user
      ? '<i class="bx bx-user-check" aria-hidden="true"></i>'
      : '<i class="bx bx-user-circle" aria-hidden="true"></i>';
  }

  if (user && mobileMenu) {
    const menuList = mobileMenu.querySelector("ul");
    const panel = createLegacyMobileAccountPanel(user);
    mobileMenu.insertBefore(panel, menuList);
  }
}

function getAccountPanelMarkup(user, { compact = false } = {}) {
  if (!user) {
    return "";
  }

  const adminLink =
    user.role === "admin"
      ? `<a class="${compact ? "mobile-account-admin" : "nav-admin-dashboard"}" href="${getPageUrl("admin.html")}">
          <i class="bx bx-grid-alt" aria-hidden="true"></i>
          <span>${t("adminDashboard")}</span>
        </a>`
      : "";

  return `
    <div class="mobile-account-main">
      <span class="mobile-account-avatar"><i class="bx bx-user"></i></span>
      <span class="mobile-account-copy">
        <strong>${getEscapedDisplayName(user)}</strong>
        <small>${user.role === "admin" ? "ADMIN" : "USER"}</small>
      </span>
    </div>
    <div class="mobile-account-actions">
      ${adminLink}
      <button type="button" data-auth-action="logout">
        <i class="bx bx-log-out" aria-hidden="true"></i>
        <span>${t("logout")}</span>
      </button>
    </div>
  `;
}

function syncDesktopAccountUI() {
  const user = getCurrentUser();
  const account = qs(".nav-account");
  const login = qs(SELECTORS.navLogin);
  const menu = qs(".nav-account-menu");

  if (!account || !login) {
    return;
  }

  account.classList.toggle("is-authenticated", Boolean(user));

  if (!user) {
    login.classList.remove("is-authenticated");
    login.href = getPageUrl("auth.html");
    login.dataset.authAction = "login";
    login.setAttribute("aria-label", t("login"));
    login.title = t("login");
    login.innerHTML = `
      <i class="bx bx-user-circle" aria-hidden="true"></i>
      <span class="nav-login-text">${t("login")}</span>
    `;

    if (menu) {
      menu.hidden = true;
      menu.innerHTML = "";
    }

    return;
  }

  login.classList.add("is-authenticated");
  login.href = "#";
  login.dataset.authAction = "account";
  login.setAttribute("aria-label", `${t("account")}: ${user.displayName}`);
  login.title = user.displayName;
  login.innerHTML = `
    <span class="nav-account-avatar"><i class="bx bx-user"></i></span>
    <span class="nav-account-copy">
      <strong>${getEscapedDisplayName(user)}</strong>
      <small>${user.role === "admin" ? "ADMIN" : "USER"}</small>
    </span>
    <i class="bx bx-chevron-down nav-account-chevron" aria-hidden="true"></i>
  `;

  if (menu) {
    menu.hidden = false;
    menu.innerHTML = getAccountPanelMarkup(user);
  }
}

function syncMobileAccountUI() {
  const user = getCurrentUser();
  const mobileLoginLink = document.querySelector(".mobile-login-trigger");
  const mobileAccountLink = document.querySelector(".mobile-account-link");
  const mobileAccountLabel = document.querySelector(".mobile-account-label");
  const mobileAccountPanel = document.querySelector(".mobile-account-panel");

  if (mobileLoginLink) {
    mobileLoginLink.href = user ? "#" : getPageUrl("auth.html");
    mobileLoginLink.dataset.authAction = user ? "logout" : "login";
    mobileLoginLink.setAttribute("aria-label", user ? t("logout") : t("login"));
    mobileLoginLink.innerHTML = user
      ? '<i class="bx bx-user-check" aria-hidden="true"></i>'
      : '<i class="bx bx-user-circle" aria-hidden="true"></i>';
  }

  if (mobileAccountLink) {
    mobileAccountLink.href = user ? "#" : getPageUrl("auth.html");
    mobileAccountLink.dataset.authAction = user ? "account" : "login";
    mobileAccountLink.setAttribute("aria-label", user ? user.displayName : t("account"));
  }

  if (mobileAccountLabel) {
    mobileAccountLabel.textContent = user ? getEscapedDisplayName(user) : t("account");
  }

  if (mobileAccountPanel) {
    mobileAccountPanel.hidden = !user;
    mobileAccountPanel.innerHTML = user ? getAccountPanelMarkup(user, { compact: true }) : "";
  }
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
    {
      container: document.querySelector(".mobile-menu-tools"),
      before: ".nav-lang",
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

  if (target.closest(".menu-open")) {
    event.preventDefault();
    openMenu();
    return;
  }

  if (target.closest(".menu-close")) {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (target.closest(".overlay") && document.body.classList.contains("mobile-menu-open")) {
    closeMenu();
    return;
  }

  if (isSearchTrigger(target)) {
    openSearch(event);
    return;
  }

  const mobileMenuLink = target.closest(".mobile-menu a");

  if (mobileMenuLink && mobileMenuLink.dataset.authAction !== "account") {
    closeMenu();
  }

  const buyNowButton = target.closest(".buy-now-btn");

  if (buyNowButton && !buyNowButton.disabled) {
    buyNow(Number(buyNowButton.dataset.id));
    return;
  }

  const addCartButton = target.closest(".add-cart-btn");

  if (addCartButton && !addCartButton.disabled) {
    addToCart(Number(addCartButton.dataset.id));
    return;
  }

  if (target.closest(".theme-toggle")) {
    toggleTheme();
    return;
  }

  const accountTrigger = target.closest("[data-auth-action='account']");

  if (accountTrigger) {
    event.preventDefault();
    const account = accountTrigger.closest(".nav-account");

    if (account) {
      account.classList.toggle("is-open");
    }

    return;
  }

  if (target.closest("[data-auth-action='logout']")) {
    event.preventDefault();
    logoutUser();
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

  if (!target.closest(".nav-account")) {
    document.querySelectorAll(".nav-account.is-open").forEach((account) => {
      account.classList.remove("is-open");
    });
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
  qs(".menu-open")?.addEventListener("click", openMenu);
  qs(".menu-close")?.addEventListener("click", closeMenu);
  qs(SELECTORS.overlay)?.addEventListener("click", closeMenu);
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
  upgradeNavigation();
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
  syncMobileAccountUI();
}

initApp();
