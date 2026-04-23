function getProductPriceMarkup(product) {
  if (product.stock === 0) {
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

function getCartVariantText(item) {
  return [item.category, item.selectedSize].filter(Boolean).join(" / ") || "standard";
}

function getProductCardMarkup(product) {
  const detailUrl = getPageUrl(`product-detail.html?id=${product.id}`);

  return `
    <div class="product-card">
      <a class="product-link" href="${detailUrl}">
        <div class="product-image">
          <img src="${getImageUrl(product.imgFront)}" class="img-front" />
          <img src="${getImageUrl(product.imgBack)}" class="img-back" />
        </div>
      </a>

      <div class="product-image-overlay">
        <div class="product-overlay">
          <button class="buy-now-btn" data-id="${product.id}">
            <span class="btn-icon"><i class="bx bx-shopping-bag"></i></span>
            <span class="btn-text">${t("buyNow")}</span>
          </button>
          <button class="add-cart-btn" data-id="${product.id}">
            <span class="btn-icon"><i class="bx bx-cart"></i></span>
            <span class="btn-text">${t("addToCart")}</span>
          </button>
        </div>
      </div>

      <div class="product-info">
        <a class="product-name-link" href="${detailUrl}">
          <p class="product-name">${product.name}</p>
        </a>
        <div class="product-price ${product.oldPrice ? "is-sale" : ""}">
          ${getProductPriceMarkup(product)}
        </div>
      </div>
    </div>
  `;
}

function getCartItemMarkup(item) {
  return `
    <article class="cart-item">
      <div class="cart-item-media">
        <img class="cart-item-image" src="${getImageUrl(item.imgFront)}" alt="${item.name}">
      </div>

      <div class="cart-item-content">
        <div class="cart-item-top">
          <div>
            <h4 class="cart-item-name">${item.name}</h4>
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

  return `
    <a class="search-result-item" href="${detailUrl}">
      <img
        class="search-result-image"
        src="${getImageUrl(product.imgFront)}"
        alt="${product.name}"
      >

      <div class="search-result-content">
        <h4 class="search-result-name">${product.name}</h4>
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
  const countElement = document.getElementById("cart-count");

  if (!countElement) {
    return;
  }

  const totalItems = getCartCount();
  countElement.innerText = totalItems;

  const cartLabel = qs(SELECTORS.cartLabel);

  if (cartLabel) {
    cartLabel.innerHTML = `${t("cart")} (<span id="cart-count">${totalItems}</span>)`;
  }
}
