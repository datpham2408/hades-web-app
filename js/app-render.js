function getProductPriceMarkup(product) {
  if (isProductSoldOut(product)) {
    return t("soldOut");
  }

  if (!product.oldPrice) {
    return `
      <span class="price-current">${formatPrice(product.price)}</span>
    `;
  }

  return `
    <span class="old-price">${formatPrice(product.oldPrice)}</span>
    <span class="sale-price-row">
      <span class="price-current">${formatPrice(product.price)}</span>
      <span class="sale-badge">${t("sale")}</span>
    </span>
  `;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });
}

function getCartVariantText(item) {
  return [item.category, item.selectedSize].filter(Boolean).join(" / ") || "standard";
}

function getProductCardMarkup(product) {
  const detailUrl = getPageUrl(`product-detail.html?id=${product.id}`);
  const soldOut = isProductSoldOut(product);
  const actionDisabled = soldOut ? "disabled aria-disabled=\"true\"" : "";
  const productName = escapeHtml(product.name);

  return `
    <div class="product-card">
      <div class="product-media">
        <a class="product-link" href="${detailUrl}">
          <div class="product-image">
            <img src="${getImageUrl(product.imgFront)}" class="img-front" loading="lazy" alt="${productName}" />
            <img src="${getImageUrl(product.imgBack)}" class="img-back" loading="lazy" alt="${productName}" />
          </div>
        </a>

        <div class="product-image-overlay">
          <div class="product-overlay">
            <button class="buy-now-btn" data-id="${product.id}" ${actionDisabled}>
              <span class="btn-icon"><i class="bx bx-shopping-bag"></i></span>
              <span class="btn-text">${t("buyNow")}</span>
            </button>
            <button class="add-cart-btn" data-id="${product.id}" ${actionDisabled}>
              <span class="btn-icon"><i class="bx bx-cart"></i></span>
              <span class="btn-text">${t("addToCart")}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="product-info">
        <a class="product-name-link" href="${detailUrl}">
          <p class="product-name">${productName}</p>
        </a>
        <div class="product-price ${product.oldPrice ? "is-sale" : ""}">
          ${getProductPriceMarkup(product)}
        </div>
      </div>
    </div>
  `;
}

function getCartItemMarkup(item) {
  const itemName = escapeHtml(item.name);

  return `
    <article class="cart-item">
      <div class="cart-item-media">
        <img class="cart-item-image" src="${getImageUrl(item.imgFront)}" alt="${itemName}" loading="lazy">
      </div>

      <div class="cart-item-content">
        <div class="cart-item-top">
          <div>
            <h4 class="cart-item-name">${itemName}</h4>
            <p class="cart-item-meta">${getCartVariantText(item)}</p>
          </div>

          <button
            class="cart-remove-btn"
            type="button"
            data-id="${item.id}"
            aria-label="Remove ${item.name}"
          >
            x
          </button>
        </div>

        <div class="cart-item-bottom">
          <div class="cart-qty-control">
            <button
              class="cart-qty-btn"
              type="button"
              data-action="decrease"
              data-id="${item.id}"
              aria-label="Decrease quantity"
            >
              -
            </button>

            <span class="cart-qty-value">${item.quantity}</span>

            <button
              class="cart-qty-btn"
              type="button"
              data-action="increase"
              data-id="${item.id}"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <span class="cart-item-price">${formatPrice(item.price)}</span>
        </div>
      </div>
    </article>
  `;
}

function getSearchResultMarkup(product) {
  const detailUrl = getPageUrl(`product-detail.html?id=${product.id}`);
  const productName = escapeHtml(product.name);

  return `
    <a class="search-result-item" href="${detailUrl}">
      <img
        class="search-result-image"
        src="${getImageUrl(product.imgFront)}"
        alt="${productName}"
        loading="lazy"
      >

      <div class="search-result-content">
        <h4 class="search-result-name">${productName}</h4>
        <span class="search-result-price">${formatPrice(product.price)}</span>
      </div>
    </a>
  `;
}

function renderProducts(list) {
  const container = document.getElementById("product-list");

  if (!container) {
    return;
  }

  container.innerHTML = list.map(getProductCardMarkup).join("");
}

function updateTotal(cart = getCartStorage()) {
  const totalElement = qs(SELECTORS.cartTotalValue);

  if (totalElement) {
    totalElement.innerText = formatPrice(getCartTotal(cart));
  }
}

function renderCart() {
  const cart = getCartStorage();
  const container = qs(SELECTORS.cartBody);

  if (!container) {
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>${t("emptyCart")}</p>
      </div>
    `;
    updateTotal(cart);
    return;
  }

  container.innerHTML = cart.map(getCartItemMarkup).join("");
  updateTotal(cart);
}

function updateCartCount() {
  const totalItems = getCartCount();

  document.querySelectorAll("#cart-count, [data-cart-count]").forEach((countElement) => {
    countElement.innerText = totalItems;
  });

  qsa(SELECTORS.cartLabel).forEach((cartLabel) => {
    const textNode = cartLabel.querySelector(".nav-cart-text");
    const countNode = cartLabel.querySelector("#cart-count, [data-cart-count]");

    if (textNode && countNode) {
      textNode.textContent = t("cart");
      cartLabel.setAttribute("aria-label", `${t("cart")} (${totalItems})`);
      cartLabel.title = `${t("cart")} (${totalItems})`;
      return;
    }

    cartLabel.innerHTML = `${t("cart")} (<span id="cart-count">${totalItems}</span>)`;
  });
}
