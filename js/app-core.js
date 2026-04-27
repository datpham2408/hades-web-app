const STORAGE_KEYS = {
  cart: "cart",
  language: "language",
  authMode: "authMode",
  registeredUser: "registeredUser",
  authUsers: "authUsers",
  authUsersManaged: "authUsersManaged",
  authSession: "authSession",
  adminProducts: "adminProducts",
  orders: "orders",
  theme: "theme",
};

const SELECTORS = {
  cartBody: ".cart-body",
  cartLabel: ".nav-cart",
  cartTitle: ".cart-title",
  cartTotalValue: ".cart-total span:last-child",
  cartTotalLabel: ".cart-total span:first-child",
  searchInput: ".search-input",
  searchResults: ".search-results",
  searchTitle: ".search-title",
  navLogin: ".nav-login",
  navSearch: ".nav-search",
  navProjectInfo:
    '.nav-menu a[href$="project-info.html"], .mobile-menu a[href$="project-info.html"], [data-nav-key="project-info"]',
  navLanguage: ".nav-lang, .cart-lang",
  mobileMenu: ".mobile-menu",
  overlay: ".overlay",
  navbar: ".navbar",
};

const AUTH_FIELDS = ["name", "phone", "email", "birthdate", "gender", "password"];
const AUTH_MESSAGES = {
  nameMin: "H\u1ecd t\u00ean ph\u1ea3i c\u00f3 \u00edt nh\u1ea5t 2 k\u00fd t\u1ef1.",
  nameFull: "Vui l\u00f2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 h\u1ecd v\u00e0 t\u00ean.",
  phone: "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i ph\u1ea3i g\u1ed3m 10 s\u1ed1 v\u00e0 b\u1eaft \u0111\u1ea7u b\u1eb1ng 0.",
  email: "Email kh\u00f4ng \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng.",
  birthdateRequired: "Vui l\u00f2ng ch\u1ecdn ng\u00e0y sinh.",
  birthdateInvalid: "Ng\u00e0y sinh kh\u00f4ng h\u1ee3p l\u1ec7.",
  birthdateAge: "B\u1ea1n ph\u1ea3i t\u1eeb 15 tu\u1ed5i tr\u1edf l\u00ean.",
  gender: "Vui l\u00f2ng ch\u1ecdn gi\u1edbi t\u00ednh.",
  passwordMin: "M\u1eadt kh\u1ea9u ph\u1ea3i c\u00f3 \u00edt nh\u1ea5t 8 k\u00fd t\u1ef1.",
  passwordRule: "M\u1eadt kh\u1ea9u c\u1ea7n c\u00f3 c\u1ea3 ch\u1eef v\u00e0 s\u1ed1.",
  success:
    "\u0110\u0103ng k\u00fd h\u1ee3p l\u1ec7. B\u1ea1n c\u00f3 th\u1ec3 \u0111\u0103ng nh\u1eadp.",
};

const translations = {
  vi: {
    login: "\u0110\u0102NG NH\u1eacP",
    logout: "\u0110\u0102NG XU\u1ea4T",
    admin: "ADMIN",
    adminDashboard: "ADMIN DASHBOARD",
    shop: "SHOP",
    info: "INFO",
    account: "T\u00c0I KHO\u1ea2N",
    language: "NG\u00d4N NG\u1eee",
    menu: "MENU",
    search: "T\u00ccM KI\u1ebeM",
    searchTitle: "T\u00ccM KI\u1ebeM",
    searchPlaceholder: "T\u00ecm theo t\u00ean s\u1ea3n ph\u1ea9m",
    searchEmpty: "Nh\u1eadp t\u1eeb kh\u00f3a \u0111\u1ec3 t\u00ecm s\u1ea3n ph\u1ea9m",
    searchNoResults: "Kh\u00f4ng t\u00ecm th\u1ea5y s\u1ea3n ph\u1ea9m ph\u00f9 h\u1ee3p",
    cart: "GI\u1ece H\u00c0NG",
    cartTitle: "GI\u1ece H\u00c0NG",
    total: "T\u1ed4NG",
    viewCart: "XEM GI\u1ece H\u00c0NG",
    checkout: "THANH TO\u00c1N",
    buyNow: "MUA NGAY",
    addToCart: "TH\u00caM V\u00c0O GI\u1ece",
    soldOut: "H\u1ebeT H\u00c0NG",
    sale: "KHUY\u1ebeN M\u00c3I",
    emptyCart: "Hi\u1ec7n ch\u01b0a c\u00f3 s\u1ea3n ph\u1ea9m",
    projectInfo: "TH\u00d4NG TIN",
    footerDesc:
      "Streetwear brand mang phong c\u00e1ch hi\u1ec7n \u0111\u1ea1i, c\u00e1 t\u00ednh v\u00e0 \u0111\u1eadm ch\u1ea5t ri\u00eang.",
    sortNewest: "M\u1edaI NH\u1ea4T",
    sortFeatured: "S\u1ea2N PH\u1ea8M N\u1ed4I B\u1eacT",
    sortPriceAsc: "GI\u00c1: T\u0102NG D\u1ea6N",
    sortPriceDesc: "GI\u00c1: GI\u1ea2M D\u1ea6N",
    sortOldest: "C\u0168 NH\u1ea4T",
    sortBest: "B\u00c1N CH\u1ea0Y NH\u1ea4T",
    themeDark: "N\u00e9n \u0111en",
    themeLight: "N\u00e9n s\u00e1ng",
  },
  en: {
    login: "LOGIN",
    logout: "LOGOUT",
    admin: "ADMIN",
    adminDashboard: "ADMIN DASHBOARD",
    shop: "SHOP",
    info: "INFO",
    account: "ACCOUNT",
    language: "LANGUAGE",
    menu: "MENU",
    search: "SEARCH",
    searchTitle: "SEARCH",
    searchPlaceholder: "Search by product name",
    searchEmpty: "Type to search products",
    searchNoResults: "No matching products found",
    cart: "CART",
    cartTitle: "CART",
    total: "TOTAL",
    viewCart: "VIEW CART",
    checkout: "CHECKOUT",
    buyNow: "BUY NOW",
    addToCart: "ADD TO CART",
    soldOut: "SOLD OUT",
    sale: "SALE",
    emptyCart: "Your cart is empty",
    projectInfo: "PROJECT INFO",
    footerDesc: "A modern streetwear brand with a distinct, confident personality.",
    sortNewest: "NEWEST",
    sortFeatured: "FEATURED",
    sortPriceAsc: "PRICE: LOW TO HIGH",
    sortPriceDesc: "PRICE: HIGH TO LOW",
    sortOldest: "OLDEST",
    sortBest: "BEST SELLING",
    themeDark: "Dark mode",
    themeLight: "Light mode",
  },
};

function readRawStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function getStoredCatalogProducts() {
  const fallbackProducts = typeof products !== "undefined" ? products : [];
  return readRawStorage(STORAGE_KEYS.adminProducts, fallbackProducts);
}

const productData = getStoredCatalogProducts();
let perPage = 8;

let currentList = productData;
let currentPage = 1;
let currentLanguage = localStorage.getItem(STORAGE_KEYS.language) || "vi";

const dom = {
  openBtn: document.querySelector(".menu-open"),
  closeBtn: document.querySelector(".menu-close"),
  menu: document.querySelector(SELECTORS.mobileMenu),
  overlay: document.querySelector(SELECTORS.overlay),
  cartOverlay: document.getElementById("cartOverlay"),
  searchOverlay: document.getElementById("searchOverlay"),
};

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function t(key) {
  return translations[currentLanguage][key] || key;
}

function getCurrencyFormatter() {
  const locale = currentLanguage === "en" ? "en-US" : "vi-VN";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatPrice(price) {
  return `${getCurrencyFormatter().format(price)} ₫`;
}

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getAuthSession() {
  return readStorage(STORAGE_KEYS.authSession, null);
}

function getCurrentUser() {
  const session = getAuthSession();

  if (!session) {
    return null;
  }

  return {
    id: session.id,
    displayName: session.displayName,
    role: session.role,
  };
}

function isLoggedIn() {
  return Boolean(getCurrentUser());
}

function isAdminUser() {
  return getCurrentUser()?.role === "admin";
}

function getAuthPageUrl() {
  return getPageUrl("auth.html");
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.authSession);
  window.location.href = getAuthPageUrl();
}

function setBodyState(className, isActive) {
  document.body.classList.toggle(className, isActive);
}

function getSiteRootPrefix() {
  return window.location.pathname.includes("/html/") ? "" : "html/";
}

function getPageUrl(page) {
  return `${getSiteRootPrefix()}${page}`;
}

function getImageUrl(path) {
  if (!path) {
    return path;
  }

  if (/^(https?:|data:)/i.test(path)) {
    return path;
  }

  const isHtmlPage = window.location.pathname.includes("/html/");

  if (isHtmlPage) {
    return path.startsWith("../") ? path : `../${path}`;
  }

  return path.startsWith("../") ? path.replace(/^\.\.\//, "") : path;
}

function buildCartItem(product, overrides = {}) {
  return {
    ...product,
    ...overrides,
    quantity: overrides.quantity || 1,
  };
}

function isProductSoldOut(product) {
  return Number(product?.stock ?? 1) <= 0;
}

function getCartStorage() {
  return readStorage(STORAGE_KEYS.cart, []);
}

function saveCartStorage(cart) {
  writeStorage(STORAGE_KEYS.cart, cart);
}

function updateCartState(updater) {
  const cart = getCartStorage();
  const nextCart = updater([...cart]);
  saveCartStorage(nextCart);
  return nextCart;
}

function getCartCount(cart = getCartStorage()) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal(cart = getCartStorage()) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getSortOptionMap() {
  return {
    new: "sortNewest",
    featured: "sortFeatured",
    "price-asc": "sortPriceAsc",
    "price-desc": "sortPriceDesc",
    old: "sortOldest",
    best: "sortBest",
  };
}
