function updateCartUI({ keepOpen = false } = {}) {
  renderCart();
  updateCartCount();

  if (keepOpen) {
    setBodyState("cart-open", true);
  }
}

function addToCart(id) {
  const product = productData.find((item) => item.id === id);

  if (!product || isProductSoldOut(product)) {
    return;
  }

  updateCartState((cart) => {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      return cart;
    }

    return [...cart, buildCartItem(product)];
  });

  updateCartUI({ keepOpen: true });
}

function buyNow(id) {
  const product = productData.find((item) => item.id === id);

  if (!product || isProductSoldOut(product)) {
    return;
  }

  saveCartStorage([buildCartItem(product)]);
  window.location.href = getPageUrl("checkout.html");
}

function removeItem(id) {
  updateCartState((cart) => cart.filter((item) => item.id !== id));
  updateCartUI();
}

function changeCartItemQuantity(id, delta) {
  updateCartState((cart) => {
    const item = cart.find((product) => product.id === id);

    if (!item) {
      return cart;
    }

    item.quantity += delta;
    return cart.filter((product) => product.quantity > 0);
  });

  closeSearch();
  if (typeof closeMenu === "function") {
    closeMenu();
  }
  updateCartUI({ keepOpen: true });
}

function openCart(event) {
  if (event) {
    event.stopPropagation();
  }

  closeSearch();
  if (typeof closeMenu === "function") {
    closeMenu();
  }
  updateCartUI({ keepOpen: true });
}

function closeCart() {
  setBodyState("cart-open", false);
}
