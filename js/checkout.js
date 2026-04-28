const CHECKOUT_FIELD_IDS = [
  "fullName",
  "email",
  "phone",
  "address",
  "city",
  "district",
  "ward",
];

const getCheckoutImageUrl =
  typeof getImageUrl === "function" ? getImageUrl : (path) => path;

const CHECKOUT_TRANSLATIONS = {
  vi: {
    title: "Thanh toán",
    back: "Tiếp tục mua sắm",
    shippingTitle: "Thông tin giao hàng",
    shippingMethodTitle: "Phương thức vận chuyển",
    paymentTitle: "Phương thức thanh toán",
    orderTitle: "Đơn hàng của bạn",
    discountLabel: "Mã giảm giá",
    discountPlaceholder: "Nhập mã giảm giá",
    discountButton: "Sử dụng",
    subtotal: "Tạm tính",
    shipping: "Phí vận chuyển",
    total: "Tổng cộng",
    placeOrder: "Hoàn tất đơn hàng",
    shippingHint:
      "Vui lòng chọn tỉnh / thành, quận / huyện và phường / xã để hiển thị phương thức vận chuyển.",
    shippingReady:
      "Giao hàng tiêu chuẩn: 30.000 ₫. Dự kiến nhận hàng sau 2-4 ngày làm việc.",
    cashOnDelivery: "Thanh toán khi nhận hàng",
    cashOnDeliveryDesc: "Bạn sẽ thanh toán cho đơn vị vận chuyển khi nhận được hàng.",
    bankTransfer: "Chuyển khoản ngân hàng",
    bankTransferDesc: "Nhận thông tin tài khoản ngay sau khi đặt hàng",
    bankTransferInfoTitle: "Thông tin chuyển khoản",
    bankTransferInfoBank: "Ngân hàng: HADES Studio Bank",
    bankTransferInfoAccount: "Số tài khoản: 0912 345 678",
    bankTransferInfoHolder: "Chủ tài khoản: HADES STUDIO",
    bankTransferInfoNote: "Nội dung chuyển khoản: Họ tên + Số điện thoại + Mã đơn hàng.",
    orderEmpty: "Giỏ hàng của bạn đang trống.",
    orderSuccess: "Đặt hàng thành công",
    orderSuccessBank: "chuyển khoản ngân hàng",
    orderSuccessCod: "COD",
    orderSuccessMessage:
      "Đặt hàng thành công bằng phương thức {method}. Chúng tôi sẽ sớm liên hệ xác nhận.",
    discountSoon: "Mã giảm giá chưa khả dụng trong bản demo này.",
    formRequired: "Vui lòng điền đầy đủ thông tin giao hàng trước khi hoàn tất đơn hàng.",
    cartEmptyError: "Giỏ hàng đang trống, không thể thanh toán.",
    themeDark: "Nền đen",
    themeLight: "Nền sáng",
    footerDesc:
      "Streetwear brand mang phong cách hiện đại, cá tính và đậm chất riêng.",
    emptyFieldName: "Vui lòng nhập họ và tên.",
    fullNameInvalid: "Họ và tên phải có ít nhất 2 ký tự.",
    emptyFieldEmail: "Vui lòng nhập email.",
    emailInvalid: "Email chưa đúng định dạng.",
    emptyFieldPhone: "Vui lòng nhập số điện thoại.",
    phoneInvalid: "Số điện thoại phải gồm 10 số và bắt đầu bằng 0.",
    emptyFieldAddress: "Vui lòng nhập địa chỉ giao hàng.",
    addressInvalid: "Địa chỉ quá ngắn, vui lòng nhập đầy đủ hơn.",
    cityRequired: "Vui lòng chọn tỉnh / thành.",
    districtRequired: "Vui lòng chọn quận / huyện.",
    wardRequired: "Vui lòng chọn phường / xã.",
    fieldValid: "Đã hợp lệ",
    quantity: "Số lượng",
    standard: "Tiêu chuẩn",
  },
  en: {
    title: "Checkout",
    back: "Continue shopping",
    shippingTitle: "Shipping information",
    shippingMethodTitle: "Shipping method",
    paymentTitle: "Payment method",
    orderTitle: "Your order",
    discountLabel: "Discount code",
    discountPlaceholder: "Enter discount code",
    discountButton: "Apply",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    placeOrder: "Place order",
    shippingHint:
      "Please choose province / city, district, and ward to show shipping methods.",
    shippingReady:
      "Standard delivery: 30,000 ₫. Estimated arrival in 2-4 business days.",
    cashOnDelivery: "Cash on delivery",
    cashOnDeliveryDesc: "You pay the carrier when your order arrives.",
    bankTransfer: "Bank transfer",
    bankTransferDesc: "Receive account details right after ordering",
    bankTransferInfoTitle: "Transfer details",
    bankTransferInfoBank: "Bank: HADES Studio Bank",
    bankTransferInfoAccount: "Account number: 0912 345 678",
    bankTransferInfoHolder: "Account holder: HADES STUDIO",
    bankTransferInfoNote: "Transfer note: Full name + Phone number + Order code.",
    orderEmpty: "Your cart is empty.",
    orderSuccess: "Order placed successfully",
    orderSuccessBank: "bank transfer",
    orderSuccessCod: "COD",
    orderSuccessMessage:
      "Order placed successfully using {method}. We will contact you shortly to confirm.",
    discountSoon: "Discount codes are not available in this demo.",
    formRequired: "Please complete all shipping details before placing the order.",
    cartEmptyError: "Your cart is empty, checkout is not available.",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    footerDesc: "A modern streetwear brand with a distinct, confident personality.",
    emptyFieldName: "Please enter your full name.",
    fullNameInvalid: "Full name must be at least 2 characters.",
    emptyFieldEmail: "Please enter your email.",
    emailInvalid: "Email format is invalid.",
    emptyFieldPhone: "Please enter your phone number.",
    phoneInvalid: "Phone number must be 10 digits and start with 0.",
    emptyFieldAddress: "Please enter a shipping address.",
    addressInvalid: "Address is too short, please provide more details.",
    cityRequired: "Please choose a province / city.",
    districtRequired: "Please choose a district.",
    wardRequired: "Please choose a ward.",
    fieldValid: "Looks good",
    quantity: "Quantity",
    standard: "Standard",
  },
};

function getCheckoutLanguage() {
  return localStorage.getItem("language") === "en" ? "en" : "vi";
}

function c(key) {
  return CHECKOUT_TRANSLATIONS[getCheckoutLanguage()][key];
}

let currentCheckoutTheme = localStorage.getItem(STORAGE_KEYS.theme) || "light";

function getCheckoutThemeLabel() {
  return currentCheckoutTheme === "dark" ? c("themeLight") : c("themeDark");
}

function updateCheckoutThemeToggle() {
  const button = document.querySelector(".checkout-theme-toggle");

  if (!button) {
    return;
  }

  button.setAttribute("aria-pressed", String(currentCheckoutTheme === "dark"));
  button.dataset.theme = currentCheckoutTheme;

  const label = button.querySelector(".theme-toggle-label");
  const icon = button.querySelector(".theme-toggle-icon");

  if (label) {
    label.textContent = getCheckoutThemeLabel();
  }

  if (icon) {
    icon.className =
      currentCheckoutTheme === "dark"
        ? "bx bx-sun theme-toggle-icon"
        : "bx bx-moon theme-toggle-icon";
  }
}

function applyCheckoutTheme() {
  document.body.classList.toggle("dark-theme", currentCheckoutTheme === "dark");
  updateCheckoutThemeToggle();
}

function setCheckoutTheme(theme) {
  currentCheckoutTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(STORAGE_KEYS.theme, currentCheckoutTheme);
  applyCheckoutTheme();
}

function toggleCheckoutTheme() {
  setCheckoutTheme(currentCheckoutTheme === "dark" ? "light" : "dark");
}

function renderCheckoutCurrencyLabel(amount) {
  return formatCheckoutVND(amount);
}

function getShippingReadyText() {
  const shippingFee = formatCheckoutVND(30000);

  if (getCheckoutLanguage() === "en") {
    return `Standard delivery: ${shippingFee}. Estimated arrival in 2-4 business days.`;
  }

  return `Giao hàng tiêu chuẩn: ${shippingFee}. Dự kiến nhận hàng sau 2-4 ngày làm việc.`;
}

function getPaymentDetailsMarkup(method) {
  if (method === "bank") {
    return `
      <div class="payment-details-card">
        <strong>${c("bankTransferInfoTitle")}</strong>
        <p>${c("bankTransferInfoBank")}</p>
        <p>${c("bankTransferInfoAccount")}</p>
        <p>${c("bankTransferInfoHolder")}</p>
        <p class="payment-details-note">${c("bankTransferInfoNote")}</p>
      </div>
    `;
  }

  return `
    <div class="payment-details-card">
      <strong>${c("cashOnDelivery")}</strong>
      <p>${c("cashOnDeliveryDesc")}</p>
      <p class="payment-details-note">
        ${getCheckoutLanguage() === "en" ? "No additional payment fee applies." : "Phương thức này không phát sinh thêm phí thanh toán."}
      </p>
    </div>
  `;
}

function getFieldErrorMessage(id, value) {
  const trimmedValue = value.trim();

  switch (id) {
    case "fullName":
      if (!trimmedValue) {
        return c("emptyFieldName");
      }

      if (trimmedValue.length < 2) {
        return c("fullNameInvalid");
      }

      return "";
    case "email":
      if (!trimmedValue) {
        return c("emptyFieldEmail");
      }

      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedValue)) {
        return c("emailInvalid");
      }

      return "";
    case "phone":
      if (!trimmedValue) {
        return c("emptyFieldPhone");
      }

      if (!/^0\d{9}$/.test(trimmedValue)) {
        return c("phoneInvalid");
      }

      return "";
    case "address":
      if (!trimmedValue) {
        return c("emptyFieldAddress");
      }

      if (trimmedValue.length < 5) {
        return c("addressInvalid");
      }

      return "";
    case "city":
      return trimmedValue ? "" : c("cityRequired");
    case "district":
      return trimmedValue ? "" : c("districtRequired");
    case "ward":
      return trimmedValue ? "" : c("wardRequired");
    default:
      return "";
  }
}

function formatCheckoutVND(price) {
  const locale = getCheckoutLanguage() === "en" ? "en-US" : "vi-VN";
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)} ₫`;
}

function getCheckoutCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    return [];
  }
}

function saveCheckoutCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCheckoutOrders() {
  return readStorage(STORAGE_KEYS.orders, []);
}

function saveCheckoutOrders(orders) {
  writeStorage(STORAGE_KEYS.orders, orders);
}

function createCheckoutOrder(cart, paymentMethod) {
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const now = new Date();
  const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;

  return {
    id: `order-${Date.now()}`,
    code: `HD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Date.now()).slice(-5)}`,
    userId: currentUser?.id || null,
    customer: {
      fullName: getCheckoutField("fullName")?.value.trim() || "",
      email: getCheckoutField("email")?.value.trim() || "",
      phone: getCheckoutField("phone")?.value.trim() || "",
      address: [
        getCheckoutField("address")?.value.trim(),
        getCheckoutField("ward")?.value,
        getCheckoutField("district")?.value,
        getCheckoutField("city")?.value,
      ]
        .filter(Boolean)
        .join(", "),
    },
    items: cart,
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethod,
    status: "pending",
    createdAt: now.toISOString(),
  };
}

function getCheckoutElements() {
  return {
    title: document.querySelector("title"),
    back: document.querySelector(".checkout-back"),
    shippingTitle: document.querySelector(".checkout-form-panel .checkout-page-title"),
    shippingMethodTitle: document.querySelectorAll(".checkout-section-title")[1],
    paymentTitle: document.querySelectorAll(".checkout-section-title")[2],
    orderTitle: document.querySelectorAll(".checkout-section-title")[0],
    discountLabel: document.querySelector(".discount-label"),
    discountInput: document.getElementById("discountCode"),
    discountButton: document.getElementById("applyDiscountBtn"),
    subtotalLabel: document.querySelector(".summary-row span:first-child"),
    shippingLabel: document.querySelectorAll(".summary-row span:first-child")[1],
    totalLabel: document.querySelector(".summary-row-total span:first-child"),
    form: document.getElementById("checkoutForm"),
    itemsContainer: document.getElementById("checkoutItems"),
    subtotalValue: document.getElementById("subtotalValue"),
    shippingValue: document.getElementById("shippingValue"),
    totalValue: document.getElementById("totalValue"),
    shippingPlaceholder: document.getElementById("shippingPlaceholder"),
    paymentDetails: document.getElementById("paymentDetails"),
    placeOrderBtn: document.getElementById("placeOrderBtn"),
    message: document.getElementById("checkoutMessage"),
    footerDesc: document.querySelector(".footer-desc"),
  };
}

function updateCheckoutText() {
  const isEnglish = getCheckoutLanguage() === "en";
  document.documentElement.lang = isEnglish ? "en" : "vi";

  const {
    title,
    back,
    shippingTitle,
    shippingMethodTitle,
    paymentTitle,
    orderTitle,
    discountLabel,
    discountInput,
    discountButton,
    subtotalLabel,
    shippingLabel,
    totalLabel,
    placeOrderBtn,
    shippingPlaceholder,
    paymentDetails,
    footerDesc,
  } = getCheckoutElements();

  if (title) title.textContent = c("title");
  if (back) back.textContent = c("back");
  if (shippingTitle) shippingTitle.textContent = c("shippingTitle");
  if (shippingMethodTitle) shippingMethodTitle.textContent = c("shippingMethodTitle");
  if (paymentTitle) paymentTitle.textContent = c("paymentTitle");
  if (orderTitle) orderTitle.textContent = c("orderTitle");
  if (discountLabel) discountLabel.textContent = c("discountLabel");
  if (discountInput) discountInput.placeholder = c("discountPlaceholder");
  if (discountButton) discountButton.textContent = c("discountButton");
  if (subtotalLabel) subtotalLabel.textContent = c("subtotal");
  if (shippingLabel) shippingLabel.textContent = c("shipping");
  if (totalLabel) totalLabel.textContent = c("total");
  if (placeOrderBtn) placeOrderBtn.textContent = c("placeOrder");
  if (shippingPlaceholder && !shippingPlaceholder.textContent.trim()) {
    shippingPlaceholder.textContent = c("shippingHint");
  }

  document
    .querySelectorAll(".payment-option-content strong")
    .forEach((node, index) => {
      if (index === 0) node.textContent = c("cashOnDelivery");
      if (index === 1) node.textContent = c("bankTransfer");
    });

  document
    .querySelectorAll(".payment-option-content span")
    .forEach((node, index) => {
      if (index === 0) node.textContent = c("cashOnDeliveryDesc");
      if (index === 1) node.textContent = c("bankTransferDesc");
    });

  if (paymentDetails) {
    updatePaymentDetails();
  }

  if (footerDesc) {
    footerDesc.textContent = c("footerDesc");
  }

  updateCheckoutThemeToggle();
}

function getCheckoutField(id) {
  return document.getElementById(id);
}

function ensureFieldFeedback(field) {
  const wrapper = field.closest(".checkout-field");

  if (!wrapper) {
    return null;
  }

  let feedback = wrapper.querySelector(".checkout-field-error");

  if (!feedback) {
    feedback = document.createElement("small");
    feedback.className = "checkout-field-error";
    feedback.setAttribute("aria-live", "polite");
    feedback.hidden = true;
    wrapper.appendChild(feedback);
  }

  return feedback;
}

function validateCheckoutField(field) {
  if (!field) {
    return true;
  }

  const message = getFieldErrorMessage(field.id, field.value);
  const wrapper = field.closest(".checkout-field");
  const feedback = ensureFieldFeedback(field);
  const isValid = message === "";

  if (wrapper) {
    wrapper.classList.toggle("is-invalid", !isValid);
    wrapper.classList.toggle("is-valid", isValid && field.value.trim() !== "");
  }

  field.setAttribute("aria-invalid", String(!isValid));

  if (feedback) {
    feedback.textContent = isValid ? c("fieldValid") : message;
    feedback.hidden = false;
    feedback.classList.toggle("is-valid", isValid);
    feedback.classList.toggle("is-error", !isValid);
  }

  return isValid;
}

function isCheckoutFormValid() {
  return CHECKOUT_FIELD_IDS.every((id) => {
    const field = getCheckoutField(id);
    return field ? getFieldErrorMessage(id, field.value) === "" : false;
  });
}

function syncPlaceOrderState() {
  const hasItems = getCheckoutCart().length > 0;
  setPlaceOrderState(hasItems && isCheckoutFormValid());
}

function getCheckoutItemMarkup(item) {
  return `
    <article class="checkout-item">
      <img
        class="checkout-item-image"
        src="${getCheckoutImageUrl(item.imgFront)}"
        alt="${item.name}"
      />

      <div class="checkout-item-content">
        <h3 class="checkout-item-name">${item.name}</h3>
        <p class="checkout-item-variant">
          ${[item.category, item.selectedSize].filter(Boolean).join(" / ") || c("standard")}
        </p>
        <p class="checkout-item-quantity">${c("quantity")}: ${item.quantity}</p>
        <span class="checkout-item-price">${renderCheckoutCurrencyLabel(item.price)}</span>
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
      <p class="checkout-empty">${c("orderEmpty")}</p>
    `;
    return 0;
  }

  itemsContainer.innerHTML = cart.map(getCheckoutItemMarkup).join("");
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function setPlaceOrderState(isEnabled) {
  const { placeOrderBtn } = getCheckoutElements();

  if (placeOrderBtn) {
    placeOrderBtn.disabled = !isEnabled;
  }
}

function renderCheckoutSummary() {
  const subtotal = renderCheckoutItems();
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;
  const { subtotalValue, shippingValue, totalValue } = getCheckoutElements();

  if (subtotalValue) {
    subtotalValue.textContent = renderCheckoutCurrencyLabel(subtotal);
  }

  if (shippingValue) {
    shippingValue.textContent = renderCheckoutCurrencyLabel(shipping);
  }

  if (totalValue) {
    totalValue.textContent = renderCheckoutCurrencyLabel(total);
  }

  syncPlaceOrderState();
}

function getSelectedPaymentMethod() {
  const selected = document.querySelector(
    'input[name="paymentMethod"]:checked',
  );
  return selected ? selected.value : "cod";
}

function updatePaymentDetails() {
  const { paymentDetails } = getCheckoutElements();

  if (!paymentDetails) {
    return;
  }

  paymentDetails.innerHTML = getPaymentDetailsMarkup(getSelectedPaymentMethod());
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
    shippingPlaceholder.textContent = getShippingReadyText();
    return;
  }

  shippingPlaceholder.textContent = c("shippingHint");
}

function validateCheckoutForm() {
  return CHECKOUT_FIELD_IDS.every((id) => validateCheckoutField(getCheckoutField(id)));
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
    showCheckoutMessage(c("cartEmptyError"), true);
    return;
  }

  if (!validateCheckoutForm()) {
    showCheckoutMessage(c("formRequired"), true);
    return;
  }

  const paymentMethod = getSelectedPaymentMethod();
  const order = createCheckoutOrder(cart, paymentMethod);
  const paymentLabel =
    paymentMethod === "bank" ? c("orderSuccessBank") : c("orderSuccessCod");

  saveCheckoutOrders([order, ...getCheckoutOrders()]);
  saveCheckoutCart([]);
  renderCheckoutSummary();
  updatePaymentDetails();

  showCheckoutMessage(
    c("orderSuccessMessage").replace("{method}", paymentLabel),
  );
}

function initCheckoutEvents() {
  const form = document.getElementById("checkoutForm");

  document
    .querySelector(".checkout-theme-toggle")
    ?.addEventListener("click", toggleCheckoutTheme);

  document.getElementById("applyDiscountBtn")?.addEventListener("click", () => {
    showCheckoutMessage(c("discountSoon"), true);
  });

  document.getElementById("placeOrderBtn")?.addEventListener("click", handlePlaceOrder);

  CHECKOUT_FIELD_IDS.forEach((id) => {
    const field = getCheckoutField(id);

    if (!field) {
      return;
    }

    const eventName = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => {
      validateCheckoutField(field);
      syncPlaceOrderState();

      if (id === "city" || id === "district" || id === "ward") {
        updateShippingPlaceholder();
      }
    });

    field.addEventListener("blur", () => {
      validateCheckoutField(field);
      syncPlaceOrderState();
    });

    ensureFieldFeedback(field);
  });

  document
    .querySelectorAll('input[name="paymentMethod"]')
    .forEach((input) => input.addEventListener("change", updatePaymentDetails));

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    handlePlaceOrder();
  });
}

function initCheckoutPage() {
  initCheckoutEvents();
  applyCheckoutTheme();
  updateCheckoutText();
  renderCheckoutSummary();
  updateShippingPlaceholder();
  updatePaymentDetails();
  syncPlaceOrderState();

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.theme) {
      currentCheckoutTheme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
      applyCheckoutTheme();
    }

    if (event.key !== STORAGE_KEYS.language) {
      return;
    }

    updateCheckoutText();
    renderCheckoutSummary();
    updateShippingPlaceholder();
    updatePaymentDetails();
    syncPlaceOrderState();
  });
}

initCheckoutPage();
