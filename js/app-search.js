function getSearchQuery() {
  const searchInput = qs(SELECTORS.searchInput);
  return searchInput ? searchInput.value.trim() : "";
}

function getSearchMatches(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return productData.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
}

function renderSearchResults(query = "") {
  const resultsContainer = qs(SELECTORS.searchResults);

  if (!resultsContainer) {
    return;
  }

  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    resultsContainer.innerHTML = `
      <p class="search-empty-state">${t("searchEmpty")}</p>
    `;
    return;
  }

  const matches = getSearchMatches(normalizedQuery);

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <p class="search-empty-state">${t("searchNoResults")}</p>
    `;
    return;
  }

  resultsContainer.innerHTML = matches.map(getSearchResultMarkup).join("");
}

function openSearch(event) {
  if (event) {
    event.stopPropagation();
  }

  closeCart();
  if (typeof closeMenu === "function") {
    closeMenu();
  }
  setBodyState("search-open", true);
  renderSearchResults(getSearchQuery());

  const searchInput = qs(SELECTORS.searchInput);

  if (searchInput) {
    window.setTimeout(() => {
      searchInput.focus();
    }, 150);
  }
}

function closeSearch() {
  setBodyState("search-open", false);
}
