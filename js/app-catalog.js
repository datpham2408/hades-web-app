function sortProducts(list, type) {
  const availableList = getAvailableProducts(list);
  const sorted = [...availableList];

  switch (type) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "new":
      return sorted.sort((a, b) => b.date - a.date);
    case "old":
      return sorted.sort((a, b) => a.date - b.date);
    case "best":
      return sorted.sort((a, b) => b.sold - a.sold);
    default:
      return sorted;
  }
}

function getAvailableProducts(list) {
  return list.filter((product) => Number(product.stock ?? 1) > 0);
}

function getProductsByPage(list, page) {
  const start = (page - 1) * perPage;
  return list.slice(start, start + perPage);
}

function scrollToProductList() {
  const productList = document.getElementById("product-list");

  if (productList) {
    productList.scrollIntoView({ behavior: "smooth" });
  }
}

function renderPagination(list) {
  const container = document.getElementById("pagination");

  if (!container) {
    return;
  }

  const totalPage = Math.ceil(list.length / perPage);
  let html = "";

  if (currentPage > 1) {
    html += `<span class="next" onclick="changePage(${currentPage - 1})"><</span>`;
  }

  for (let i = 1; i <= totalPage; i += 1) {
    const isBoundaryPage =
      i === 1 || i === totalPage || (i >= currentPage - 1 && i <= currentPage + 1);

    if (isBoundaryPage) {
      html += `
        <span class="page ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
          ${i}
        </span>
      `;
      continue;
    }

    if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span class="dots">...</span>`;
    }
  }

  if (currentPage < totalPage) {
    html += `<span class="next" onclick="changePage(${currentPage + 1})">></span>`;
  }

  container.innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  renderProducts(getProductsByPage(currentList, currentPage));
  renderPagination(currentList);
  scrollToProductList();
}

function goToCategory(category) {
  currentList =
    category === "all"
      ? productData
      : productData.filter((product) => product.category === category);

  currentPage = 1;
  renderProducts(getProductsByPage(currentList, currentPage));
  renderPagination(currentList);
  scrollToProductList();
}

function initProductPage(category) {
  const sortSelect = document.getElementById("sort");
  const filteredList = productData.filter((product) => product.category === category);

  perPage = 8;
  currentList = filteredList;
  renderProducts(filteredList);

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentList = sortProducts(filteredList, sortSelect.value);
      renderProducts(currentList);
    });
  }
}

function initShopAllPage() {
  const sortSelect = document.getElementById("sort");
  const productList = document.getElementById("product-list");
  const pagination = document.getElementById("pagination");

  if (!productList) {
    return;
  }

  perPage = 20;
  currentList = productData;
  currentPage = 1;

  renderProducts(getProductsByPage(currentList, currentPage));
  renderPagination(currentList);

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentPage = 1;
      currentList = sortProducts(productData, sortSelect.value);
      renderProducts(getProductsByPage(currentList, currentPage));
      renderPagination(currentList);
    });
  } else if (pagination) {
    renderPagination(currentList);
  }
}

function updateLanguageSelectors() {
  qsa(SELECTORS.navLanguage).forEach((select) => {
    select.innerHTML = `
      <option value="vi">VI</option>
      <option value="en">EN</option>
    `;
    select.value = currentLanguage;
  });
}

function updateStaticText() {
  const login = qs(SELECTORS.navLogin);
  const search = qs(SELECTORS.navSearch);
  const projectInfo = qsa(SELECTORS.navProjectInfo);
  const searchTitle = qs(SELECTORS.searchTitle);
  const searchInput = qs(SELECTORS.searchInput);
  const cartTitle = qs(SELECTORS.cartTitle);
  const totalLabel = qs(SELECTORS.cartTotalLabel);
  const footerDesc = qs(".footer-desc");
  const actionButtons = qsa(".cart-actions button");
  const sortSelect = document.getElementById("sort");

  if (login) {
    login.textContent = t("login");
  }

  if (search) {
    search.textContent = t("search");
  }

  projectInfo.forEach((node) => {
    node.textContent = t("projectInfo");
  });

  if (searchTitle) {
    searchTitle.textContent = t("searchTitle");
  }

  if (searchInput) {
    searchInput.placeholder = t("searchPlaceholder");
  }

  if (cartTitle) {
    cartTitle.textContent = t("cartTitle");
  }

  if (footerDesc) {
    footerDesc.textContent = t("footerDesc");
  }

  if (totalLabel) {
    totalLabel.textContent = t("total");
  }

  if (actionButtons[0]) {
    actionButtons[0].textContent = t("viewCart");
  }

  if (actionButtons[1]) {
    actionButtons[1].textContent = t("checkout");
  }

  if (sortSelect) {
    const optionMap = getSortOptionMap();

    Array.from(sortSelect.options).forEach((option) => {
      const key = optionMap[option.value];

      if (key) {
        option.textContent = t(key);
      }
    });
  }

  if (typeof updateThemeToggleButtons === "function") {
    updateThemeToggleButtons();
  }
}

function refreshVisibleProducts() {
  const productList = document.getElementById("product-list");
  const pagination = document.getElementById("pagination");

  if (!productList || currentList.length === 0) {
    return;
  }

  if (pagination && pagination.children.length > 0) {
    renderProducts(getProductsByPage(currentList, currentPage));
    renderPagination(currentList);
    return;
  }

  renderProducts(currentList);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  updateLanguageSelectors();
  updateStaticText();
  refreshVisibleProducts();
  renderSearchResults(getSearchQuery());
  renderCart();
  updateCartCount();
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem(STORAGE_KEYS.language, language);
  applyLanguage();
  window.dispatchEvent(new CustomEvent("languagechange", { detail: { language } }));
}
