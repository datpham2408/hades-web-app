const ADMIN_PRODUCT_PAGE_SIZE = 8;
const ADMIN_MAX_IMAGE_SIZE = 1024 * 1024;
const ORDER_STATUSES = ["pending", "processing", "shipped", "completed", "cancelled"];

let adminProductPage = 1;
let selectedOrderId = null;
let pendingConfirmAction = null;

function guardAdminPage() {
  if (!isLoggedIn()) {
    window.location.href = `auth.html?redirect=${encodeURIComponent("admin.html")}`;
    return false;
  }

  if (!isAdminUser()) {
    window.location.href = "../index.html";
    return false;
  }

  return true;
}

function getAdminProducts() {
  return readStorage(STORAGE_KEYS.adminProducts, productData);
}

function saveAdminProducts(productsList) {
  writeStorage(STORAGE_KEYS.adminProducts, productsList);
}

function getAdminOrders() {
  return readStorage(STORAGE_KEYS.orders, getSeedOrders());
}

function saveAdminOrders(orders) {
  writeStorage(STORAGE_KEYS.orders, orders);
}

function getAdminUsers() {
  return typeof getAuthUsers === "function" ? getAuthUsers() : [];
}

function saveManagedUsers(users) {
  if (typeof saveAuthUsers === "function") {
    saveAuthUsers(users);
  }
}

function getSeedOrders() {
  return [
    {
      id: "seed-order-1",
      code: "HD-DEMO-001",
      customer: {
        fullName: "Demo Customer",
        email: "demo@hades.local",
        phone: "0900000000",
        address: "HADES Studio Demo",
      },
      items: productData.slice(0, 2).map((product) => ({ ...product, quantity: 1 })),
      subtotal: productData.slice(0, 2).reduce((sum, product) => sum + Number(product.price || 0), 0),
      shipping: 30000,
      total: productData.slice(0, 2).reduce((sum, product) => sum + Number(product.price || 0), 30000),
      paymentMethod: "cod",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ];
}

function formatAdminPrice(price) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(price) || 0)}  VND`;
}

function getAdminImageUrl(path) {
  if (!path) {
    return "";
  }

  if (/^(https?:|data:)/i.test(path) || path.startsWith("../")) {
    return path;
  }

  return `../${path}`;
}

function escapeAdminHtml(value = "") {
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

function setActiveAdminTab(tabName) {
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.id === `adminTab${tabName[0].toUpperCase()}${tabName.slice(1)}`);
  });

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminTab === tabName);
  });

  const titles = {
    dashboard: "Dashboard",
    products: "Product Management",
    orders: "Order Management",
    users: "User Management",
  };
  document.getElementById("adminPageTitle").textContent = titles[tabName] || "Dashboard";
}

function openConfirmModal({ title, message, actionLabel = "Delete", onConfirm }) {
  pendingConfirmAction = onConfirm;
  document.getElementById("adminConfirmTitle").textContent = title;
  document.getElementById("adminConfirmMessage").textContent = message;
  document.getElementById("adminConfirmAccept").textContent = actionLabel;
  document.getElementById("adminConfirmModal").hidden = false;
}

function closeConfirmModal() {
  pendingConfirmAction = null;
  document.getElementById("adminConfirmModal").hidden = true;
}

function acceptConfirmModal() {
  if (typeof pendingConfirmAction === "function") {
    pendingConfirmAction();
  }

  closeConfirmModal();
}

function getFilteredProducts() {
  const query = document.getElementById("productSearch")?.value.trim().toLowerCase() || "";
  const productsList = getAdminProducts();

  if (!query) {
    return productsList;
  }

  return productsList.filter((product) =>
    [product.name, product.category, product.description]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query)),
  );
}

function setProductFieldError(fieldId, message = "") {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  if (field) {
    field.classList.toggle("is-invalid", Boolean(message));
  }

  if (error) {
    error.textContent = message;
  }
}

function clearProductErrors() {
  ["productName", "productPrice", "productImage"].forEach((fieldId) => {
    setProductFieldError(fieldId, "");
  });
}

function validateProductForm() {
  clearProductErrors();

  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();
  let isValid = true;

  if (name.length < 3) {
    setProductFieldError("productName", "Product name must be at least 3 characters.");
    isValid = false;
  }

  if (!Number.isFinite(price) || price <= 0) {
    setProductFieldError("productPrice", "Price must be greater than 0.");
    isValid = false;
  }

  if (image.length < 5) {
    setProductFieldError("productImage", "Image path or uploaded image is required.");
    isValid = false;
  }

  return isValid;
}

function getProductFormValue() {
  const idValue = document.getElementById("productId").value;
  const image = document.getElementById("productImage").value.trim();
  const sizes = document
    .getElementById("productSizes")
    .value.split(",")
    .map((size) => size.trim())
    .filter(Boolean);

  return {
    id: idValue ? Number(idValue) : Date.now(),
    name: document.getElementById("productName").value.trim(),
    category: document.getElementById("productCategory").value,
    price: Number(document.getElementById("productPrice").value),
    description: document.getElementById("productDescription").value.trim(),
    sizes,
    stock: Math.max(0, Number(document.getElementById("productStock").value) || 0),
    date: Date.now(),
    sold: 0,
    featured: false,
    imgFront: image,
    imgBack: image,
  };
}

function resetProductForm() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("productFormTitle").textContent = "Add product";
  document.getElementById("productFormSuccess").textContent = "";
  renderImagePreview("");
  clearProductErrors();
}

function fillProductForm(product) {
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productImage").value = product.imgFront || "";
  document.getElementById("productCategory").value = product.category || "tops";
  document.getElementById("productSizes").value = (product.sizes || []).join(", ");
  document.getElementById("productStock").value = Number(product.stock ?? 1);
  document.getElementById("productDescription").value = product.description || "";
  document.getElementById("productFormTitle").textContent = "Edit product";
  document.getElementById("productFormSuccess").textContent = "";
  renderImagePreview(product.imgFront || "");
  setActiveAdminTab("products");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProductPagination(totalItems) {
  const container = document.getElementById("productPagination");
  const totalPages = Math.max(1, Math.ceil(totalItems / ADMIN_PRODUCT_PAGE_SIZE));

  if (!container) {
    return;
  }

  if (adminProductPage > totalPages) {
    adminProductPage = totalPages;
  }

  container.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="${page === adminProductPage ? "active" : ""}" data-product-page="${page}">${page}</button>`;
  }).join("");
}

function renderAdminProducts() {
  const productsList = getFilteredProducts();
  const tbody = document.getElementById("adminProductList");
  const count = document.getElementById("productCount");
  const start = (adminProductPage - 1) * ADMIN_PRODUCT_PAGE_SIZE;
  const pagedProducts = productsList.slice(start, start + ADMIN_PRODUCT_PAGE_SIZE);

  if (count) {
    count.textContent = `${productsList.length} products`;
  }

  tbody.innerHTML = pagedProducts.length
    ? pagedProducts
        .map((product) => {
          const productName = escapeAdminHtml(product.name);
          const description = escapeAdminHtml(product.description || "No description");
          const category = escapeAdminHtml(product.category || "-");

          return `
            <tr>
              <td><img class="admin-product-thumb" src="${getAdminImageUrl(product.imgFront)}" alt="${productName}"></td>
              <td>
                <div class="admin-product-name">${productName}</div>
                <div class="admin-product-desc">${description}</div>
              </td>
              <td>${category}</td>
              <td>${formatAdminPrice(product.price)}</td>
              <td>${Number(product.stock ?? 1)}</td>
              <td>
                <div class="admin-row-actions">
                  <button type="button" data-action="edit-product" data-id="${product.id}">Edit</button>
                  <button type="button" data-action="delete-product" data-id="${product.id}">Delete</button>
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6">No products found.</td></tr>`;

  renderProductPagination(productsList.length);
}

function upsertProduct(event) {
  event.preventDefault();

  if (!validateProductForm()) {
    return;
  }

  const product = getProductFormValue();
  const productsList = getAdminProducts();
  const index = productsList.findIndex((item) => Number(item.id) === Number(product.id));

  if (index >= 0) {
    productsList[index] = { ...productsList[index], ...product };
  } else {
    productsList.unshift(product);
  }

  saveAdminProducts(productsList);
  resetProductForm();
  document.getElementById("productFormSuccess").textContent = "Product saved.";
  renderAdminProducts();
  renderDashboard();
}

function handleProductTableClick(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const productsList = getAdminProducts();

  if (button.dataset.action === "edit-product") {
    const product = productsList.find((item) => Number(item.id) === id);
    if (product) fillProductForm(product);
  }

  if (button.dataset.action === "delete-product") {
    const product = productsList.find((item) => Number(item.id) === id);
    openConfirmModal({
      title: "Delete product",
      message: `Delete "${product?.name || "this product"}"? This cannot be undone.`,
      onConfirm: () => {
        saveAdminProducts(productsList.filter((item) => Number(item.id) !== id));
        renderAdminProducts();
        renderDashboard();
      },
    });
  }
}

function renderImagePreview(src) {
  const preview = document.getElementById("productImagePreview");

  if (!preview) {
    return;
  }

  if (!src) {
    preview.innerHTML = "<span>No image selected</span>";
    return;
  }

  const safeSrc = getAdminImageUrl(src).replace(/"/g, "&quot;");
  preview.innerHTML = `<img src="${safeSrc}" alt="Product image preview">`;
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];

  if (!file) {
    renderImagePreview(document.getElementById("productImage").value.trim());
    return;
  }

  if (!file.type.startsWith("image/")) {
    setProductFieldError("productImage", "Only image files are supported.");
    event.target.value = "";
    renderImagePreview("");
    return;
  }

  if (file.size > ADMIN_MAX_IMAGE_SIZE) {
    setProductFieldError("productImage", "Image must be 1 MB or smaller.");
    event.target.value = "";
    renderImagePreview("");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("productImage").value = reader.result;
    setProductFieldError("productImage", "");
    renderImagePreview(reader.result);
  };
  reader.readAsDataURL(file);
}

function getFilteredOrders() {
  const status = document.getElementById("orderStatusFilter")?.value || "all";
  const query = document.getElementById("orderSearch")?.value.trim().toLowerCase() || "";
  const date = document.getElementById("orderDateFilter")?.value || "";
  const orders = getAdminOrders();

  return orders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status;
    const createdDate = order.createdAt ? new Date(order.createdAt).toISOString().slice(0, 10) : "";
    const matchesDate = !date || createdDate === date;
    const haystack = [
      order.code,
      order.id,
      order.customer?.fullName,
      order.customer?.email,
      order.customer?.phone,
      order.customer?.address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);

    return matchesStatus && matchesDate && matchesQuery;
  });
}

function renderAdminOrders() {
  const tbody = document.getElementById("adminOrderList");
  const orders = getFilteredOrders();

  tbody.innerHTML = orders.length
    ? orders
        .map((order) => `
          <tr>
            <td>${escapeAdminHtml(order.code || order.id)}</td>
            <td>
              <div class="admin-product-name">${escapeAdminHtml(order.customer?.fullName || "Guest")}</div>
              <div class="admin-product-desc">${escapeAdminHtml(order.customer?.phone || "")}</div>
            </td>
            <td>${formatAdminPrice(order.total)}</td>
            <td>
              <select data-action="change-order-status" data-id="${order.id}">
                ${ORDER_STATUSES.map(
                  (status) => `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`,
                ).join("")}
              </select>
            </td>
            <td>${new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
            <td><button type="button" data-action="view-order" data-id="${order.id}">Detail</button></td>
          </tr>
        `)
        .join("")
    : `<tr><td colspan="6">No orders found.</td></tr>`;

  renderOrderDetail();
}

function renderOrderDetail() {
  const panel = document.getElementById("orderDetailPanel");
  const order = getAdminOrders().find((item) => item.id === selectedOrderId);

  if (!panel) {
    return;
  }

  if (!order) {
    panel.innerHTML = `<p>Select an order to view details.</p>`;
    return;
  }

  panel.innerHTML = `
    <div class="admin-detail-head">
      <h3>${escapeAdminHtml(order.code || order.id)}</h3>
      <span>${escapeAdminHtml(order.status)}</span>
    </div>
    <p><strong>Customer:</strong> ${escapeAdminHtml(order.customer?.fullName || "Guest")}</p>
    <p><strong>Contact:</strong> ${escapeAdminHtml(order.customer?.email || "")} / ${escapeAdminHtml(order.customer?.phone || "")}</p>
    <p><strong>Address:</strong> ${escapeAdminHtml(order.customer?.address || "")}</p>
    <div class="admin-order-items">
      ${(order.items || [])
        .map((item) => `
          <div>
            <span>${escapeAdminHtml(item.name)} x ${Number(item.quantity || 1)}</span>
            <strong>${formatAdminPrice(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
          </div>
        `)
        .join("")}
    </div>
    <p><strong>Total:</strong> ${formatAdminPrice(order.total)}</p>
  `;
}

function handleOrderAction(event) {
  const target = event.target;

  if (target.matches('[data-action="change-order-status"]')) {
    const orders = getAdminOrders();
    const order = orders.find((item) => item.id === target.dataset.id);
    if (order) {
      order.status = target.value;
      saveAdminOrders(orders);
      renderAdminOrders();
      renderDashboard();
    }
  }

  const button = target.closest('button[data-action="view-order"]');
  if (button) {
    selectedOrderId = button.dataset.id;
    renderOrderDetail();
  }
}

function getFilteredUsers() {
  const query = document.getElementById("userSearch")?.value.trim().toLowerCase() || "";
  const users = getAdminUsers();

  if (!query) {
    return users;
  }

  return users.filter((user) =>
    [user.displayName, user.email, user.username, user.role]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query)),
  );
}

function renderAdminUsers() {
  const tbody = document.getElementById("adminUserList");
  const users = getFilteredUsers();
  const currentUser = getCurrentUser();

  document.getElementById("userCount").textContent = `${users.length} users`;

  tbody.innerHTML = users.length
    ? users
        .map((user) => {
          const isSelf = user.id === currentUser.id;
          return `
            <tr>
              <td>${escapeAdminHtml(user.displayName)}</td>
              <td>${escapeAdminHtml(user.email)}</td>
              <td>${escapeAdminHtml(user.username)}</td>
              <td>
                <select data-action="change-user-role" data-id="${user.id}" ${isSelf ? "disabled" : ""}>
                  <option value="user" ${user.role === "user" ? "selected" : ""}>user</option>
                  <option value="admin" ${user.role === "admin" ? "selected" : ""}>admin</option>
                </select>
              </td>
              <td>
                <button type="button" data-action="delete-user" data-id="${user.id}" ${isSelf ? "disabled" : ""}>Delete</button>
              </td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="5">No users found.</td></tr>`;
}

function handleUserAction(event) {
  const target = event.target;
  const users = getAdminUsers();
  const currentUser = getCurrentUser();

  if (target.matches('[data-action="change-user-role"]')) {
    const user = users.find((item) => item.id === target.dataset.id);
    if (user && user.id !== currentUser.id) {
      user.role = target.value;
      saveManagedUsers(users);
      renderAdminUsers();
      renderDashboard();
    }
  }

  const button = target.closest('button[data-action="delete-user"]');
  if (button) {
    const user = users.find((item) => item.id === button.dataset.id);
    openConfirmModal({
      title: "Delete user",
      message: `Delete "${user?.displayName || "this user"}"? This cannot be undone.`,
      onConfirm: () => {
        const nextUsers = users.filter((item) => item.id !== button.dataset.id || item.id === currentUser.id);
        saveManagedUsers(nextUsers);
        renderAdminUsers();
        renderDashboard();
      },
    });
  }
}

function renderDashboard() {
  const productsList = getAdminProducts();
  const users = getAdminUsers();
  const orders = getAdminOrders();
  const revenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  document.getElementById("statProducts").textContent = productsList.length;
  document.getElementById("statUsers").textContent = users.length;
  document.getElementById("statOrders").textContent = orders.length;
  document.getElementById("statRevenue").textContent = formatAdminPrice(revenue);

  document.getElementById("recentOrders").innerHTML = orders.slice(0, 5).length
    ? orders
        .slice(0, 5)
        .map((order) => `
          <div class="admin-mini-row">
            <span>${escapeAdminHtml(order.code || order.id)}</span>
            <strong>${formatAdminPrice(order.total)}</strong>
          </div>
        `)
        .join("")
    : "No orders yet.";

  const lowStock = productsList.filter((product) => Number(product.stock ?? 1) <= 5).slice(0, 5);
  document.getElementById("lowStockProducts").innerHTML = lowStock.length
    ? lowStock
        .map((product) => `
          <div class="admin-mini-row">
            <span>${escapeAdminHtml(product.name)}</span>
            <strong>${Number(product.stock ?? 1)}</strong>
          </div>
        `)
        .join("")
    : "No low-stock products.";
}

function initAdminDashboard() {
  if (!guardAdminPage()) {
    return;
  }

  const user = getCurrentUser();
  document.getElementById("adminUser").textContent = `${user.displayName} / ${user.role}`;

  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => setActiveAdminTab(button.dataset.adminTab));
  });

  document.getElementById("productForm").addEventListener("submit", upsertProduct);
  document.getElementById("resetProductForm").addEventListener("click", resetProductForm);
  document.getElementById("productImageUpload").addEventListener("change", handleImageUpload);
  document.getElementById("productImage").addEventListener("input", (event) => {
    setProductFieldError("productImage", "");
    renderImagePreview(event.target.value.trim());
  });
  document.getElementById("adminProductList").addEventListener("click", handleProductTableClick);
  document.getElementById("productSearch").addEventListener("input", () => {
    adminProductPage = 1;
    renderAdminProducts();
  });
  document.getElementById("productPagination").addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-page]");
    if (button) {
      adminProductPage = Number(button.dataset.productPage);
      renderAdminProducts();
    }
  });

  document.getElementById("orderStatusFilter").addEventListener("change", renderAdminOrders);
  document.getElementById("orderSearch").addEventListener("input", renderAdminOrders);
  document.getElementById("orderDateFilter").addEventListener("change", renderAdminOrders);
  document.getElementById("adminOrderList").addEventListener("click", handleOrderAction);
  document.getElementById("adminOrderList").addEventListener("change", handleOrderAction);

  document.getElementById("userSearch").addEventListener("input", renderAdminUsers);
  document.getElementById("adminUserList").addEventListener("click", handleUserAction);
  document.getElementById("adminUserList").addEventListener("change", handleUserAction);
  document.getElementById("adminLogout").addEventListener("click", logoutUser);
  document.getElementById("adminConfirmCancel").addEventListener("click", closeConfirmModal);
  document.getElementById("adminConfirmAccept").addEventListener("click", acceptConfirmModal);
  document.getElementById("adminConfirmModal").addEventListener("click", (event) => {
    if (event.target.id === "adminConfirmModal") {
      closeConfirmModal();
    }
  });

  renderDashboard();
  renderAdminProducts();
  renderAdminOrders();
  renderAdminUsers();
}

initAdminDashboard();
