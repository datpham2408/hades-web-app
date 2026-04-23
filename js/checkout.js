const checkoutCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const CHECKOUT_FIELD_IDS = [
  "fullName",
  "email",
  "phone",
  "address",
  "city",
  "district",
  "ward",
];

function formatCheckoutVND(price) {
  return checkoutCurrencyFormatter.format(price);
}

function getCheckoutCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function getCheckoutElements() {
  return {
    itemsContainer: document.getElementById("checkoutItems"),
    subtotalValue: document.getElementById("subtotalValue"),
    shippingValue: document.getElementById("shippingValue"),
    totalValue: document.getElementById("totalValue"),
    shippingPlaceholder: document.getElementById("shippingPlaceholder"),
    message: document.getElementById("checkoutMessage"),
  };
}

function getCheckoutItemMarkup(item) {
  return `
    <article class="checkout-item">
      <img
        class="checkout-item-image"
        src="${item.imgFront}"
        alt="${item.name}"
      />

      <div class="checkout-item-content">
        <h3 class="checkout-item-name">${item.name}</h3>
        <p class="checkout-item-variant">
          ${[item.category, item.selectedSize].filter(Boolean).join(" / ") || "Standard"}
        </p>
        <p class="checkout-item-quantity">Số lượng: ${item.quantity}</p>
        <span class="checkout-item-price">${formatCheckoutVND(item.price)}</span>
      </div>
    </article>
  `;
}

function renderCheckoutItems() {
  const { itemsContainer } = getCheckoutElements();
  const cart = getCheckoutCart();

  if (!itemsContainer) {
    return 0;
  }

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <p class="checkout-empty">Giỏ hàng của bạn đang trống.</p>
    `;
    return 0;
  }

  itemsContainer.innerHTML = cart.map(getCheckoutItemMarkup).join("");
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCheckoutSummary() {
  const subtotal = renderCheckoutItems();
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;
  const { subtotalValue, shippingValue, totalValue } = getCheckoutElements();

  if (subtotalValue) {
    subtotalValue.textContent = formatCheckoutVND(subtotal);
  }

  if (shippingValue) {
    shippingValue.textContent = formatCheckoutVND(shipping);
  }

  if (totalValue) {
    totalValue.textContent = formatCheckoutVND(total);
  }
}

function updateShippingPlaceholder() {
  const city = document.getElementById("city");
  const district = document.getElementById("district");
  const ward = document.getElementById("ward");
  const { shippingPlaceholder } = getCheckoutElements();

  if (!city || !district || !ward || !shippingPlaceholder) {
    return;
  }

  if (city.value && district.value && ward.value) {
    shippingPlaceholder.textContent =
      "Giao hàng tiêu chuẩn: 30.000 ₫. Dự kiến nhận hàng sau 2-4 ngày làm việc.";
    return;
  }

  shippingPlaceholder.textContent =
    "Vui lòng chọn tỉnh / thành, quận / huyện và phường / xã để hiển thị phương thức vận chuyển.";
}

function validateCheckoutForm() {
  return CHECKOUT_FIELD_IDS.every((id) => {
    const field = document.getElementById(id);
    return field && field.value.trim() !== "";
  });
}

function showCheckoutMessage(message, isError = false) {
  const { message: messageElement } = getCheckoutElements();

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.classList.toggle("is-error", isError);
}

function handlePlaceOrder() {
  const cart = getCheckoutCart();

  if (cart.length === 0) {
    showCheckoutMessage("Giỏ hàng đang trống, không thể thanh toán.", true);
    return;
  }

  if (!validateCheckoutForm()) {
    showCheckoutMessage(
      "Vui lòng điền đầy đủ thông tin giao hàng trước khi hoàn tất đơn hàng.",
      true,
    );
    return;
  }

  showCheckoutMessage("Đặt hàng thành công! Chúng tôi sẽ sớm liên hệ xác nhận.");
}

function initCheckoutEvents() {
  document.getElementById("applyDiscountBtn")?.addEventListener("click", () => {
    showCheckoutMessage("Mã giảm giá chưa khả dụng trong bản demo này.", true);
  });

  document.getElementById("placeOrderBtn")?.addEventListener("click", handlePlaceOrder);

  ["city", "district", "ward"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", updateShippingPlaceholder);
  });
}

function initCheckoutPage() {
  initCheckoutEvents();
  renderCheckoutSummary();
  updateShippingPlaceholder();
}

initCheckoutPage();
