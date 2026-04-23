const detailDescriptions = {
  tops:
    "Thiết kế mang tinh thần streetwear hiện đại với phom dáng vừa vặn, chất liệu dày dặn và bề mặt hoàn thiện sạch sẽ cho cảm giác cao cấp.",
  bottoms:
    "Phom dáng rộng vừa, tập trung vào chuyển động tự nhiên và sự thoải mái khi phối cùng áo oversized hoặc outerwear đặc trưng.",
  outerwear:
    "Lớp ngoài tối giản nhưng sắc nét, được xử lý bề mặt để giữ cảm giác cứng cáp, phù hợp với phong cách layering của streetwear hiện đại.",
  underwear:
    "Thiết kế gọn gàng, chất liệu mềm, tập trung vào sự linh hoạt hằng ngày nhưng vẫn giữ tinh thần thương hiệu mạnh mẽ.",
  bags:
    "Phụ kiện mang tinh thần utilitarian với bề mặt chắc tay, cấu trúc gọn và phù hợp cho nhịp sống đô thị.",
  accessories:
    "Chi tiết nhỏ nhưng có độ nhận diện cao, giúp hoàn thiện outfit theo tinh thần tối giản và cá tính.",
  sale:
    "Phiên bản ưu đãi với phom dáng đặc trưng của thương hiệu, giữ nguyên tinh thần thiết kế nhưng có mức giá dễ tiếp cận hơn.",
};

const detailInfoMap = {
  tops: [
    "Chất liệu cotton dày, bề mặt đứng form.",
    "Đường may sạch, cổ áo giữ phom ổn định.",
    "Phù hợp mặc độc lập hoặc layering.",
  ],
  bottoms: [
    "Phom loose fit thoải mái.",
    "Chất vải bền, dễ phối với nhiều kiểu áo.",
    "Tập trung vào chuyển động và độ rũ đẹp.",
  ],
  outerwear: [
    "Cấu trúc ngoài cứng cáp, dễ layering.",
    "Tông màu tối, tối giản và hiện đại.",
    "Phù hợp outfit streetwear hằng ngày.",
  ],
  underwear: [
    "Chất liệu mềm, độ co giãn tốt.",
    "Thiết kế tối giản, dễ sử dụng mỗi ngày.",
    "Tạo cảm giác gọn gàng và linh hoạt.",
  ],
  bags: [
    "Bề mặt chắc tay, giữ form tốt.",
    "Không gian chứa đồ đủ dùng hằng ngày.",
    "Chi tiết hoàn thiện gọn gàng, hiện đại.",
  ],
  accessories: [
    "Hoàn thiện outfit bằng điểm nhấn nhỏ.",
    "Thiết kế tối giản, dễ phối đồ.",
    "Giữ tinh thần nhận diện thương hiệu.",
  ],
  sale: [
    "Sản phẩm trong nhóm ưu đãi nổi bật.",
    "Thiết kế nguyên bản, giá dễ tiếp cận hơn.",
    "Phù hợp làm điểm bắt đầu cho outfit mới.",
  ],
};

const detailCategoryLabels = {
  tops: "TOPS",
  bottoms: "BOTTOMS",
  outerwear: "OUTERWEARS",
  underwear: "UNDERWEARS",
  bags: "BAGS",
  accessories: "ACCESSORIES",
  sale: "SALE",
};

const DETAIL_DEFAULT_SIZE = "M";

let selectedDetailSize = DETAIL_DEFAULT_SIZE;
let currentDetailProduct = null;

function getDetailElements() {
  return {
    name: document.getElementById("detailName"),
    sku: document.getElementById("detailSku"),
    price: document.getElementById("detailPrice"),
    colorName: document.getElementById("detailColorName"),
    description: document.getElementById("detailDescription"),
    info: document.getElementById("detailInfo"),
    note: document.getElementById("detailNote"),
    breadcrumbName: document.getElementById("detailBreadcrumbName"),
    categoryLink: document.getElementById("detailCategoryLink"),
    thumbsContainer: document.getElementById("detailThumbs"),
    mainImage: document.getElementById("detailMainImage"),
    feedback: document.getElementById("detailFeedback"),
  };
}

function getDetailProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));
  return productData.find((product) => product.id === productId) || productData[0];
}

function getDetailImages(product) {
  return [product.imgFront, product.imgBack].filter(Boolean).map(getImageUrl);
}

function getDetailCategoryHref(category) {
  if (category === "accessories") {
    return getPageUrl("accessory.html#product-list");
  }

  return getPageUrl(`${category}.html#product-list`);
}

function renderDetailThumbnails(product, images, elements) {
  if (!elements.thumbsContainer || !elements.mainImage) {
    return;
  }

  elements.mainImage.src = images[0];
  elements.mainImage.alt = product.name;
  elements.thumbsContainer.innerHTML = images
    .map(
      (image, index) => `
        <button
          class="detail-thumb ${index === 0 ? "is-active" : ""}"
          type="button"
          data-image="${image}"
        >
          <img src="${image}" alt="${product.name}">
        </button>
      `,
    )
    .join("");
}

function renderDetailInfo(category, infoElement) {
  if (!infoElement) {
    return;
  }

  infoElement.innerHTML = (detailInfoMap[category] || detailInfoMap.tops)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderDetailProduct() {
  const elements = getDetailElements();
  currentDetailProduct = getDetailProduct();

  if (
    !currentDetailProduct ||
    !elements.name ||
    !elements.sku ||
    !elements.price ||
    !elements.colorName ||
    !elements.description ||
    !elements.info ||
    !elements.note
  ) {
    return;
  }

  const images = getDetailImages(currentDetailProduct);

  elements.name.textContent = currentDetailProduct.name;
  elements.sku.textContent = `SKU: HDS-${currentDetailProduct.id}`;
  elements.price.textContent = formatPrice(currentDetailProduct.price);
  elements.colorName.textContent = currentDetailProduct.name.includes("BLACK")
    ? "Black"
    : "Signature";
  elements.description.textContent =
    detailDescriptions[currentDetailProduct.category] || detailDescriptions.tops;
  elements.note.textContent =
    "Model cao 1m78, mặc size M. Đơn hàng nội thành dự kiến giao trong 2-4 ngày làm việc. Kiểm tra kỹ thông tin size trước khi đặt hàng.";

  if (elements.breadcrumbName) {
    elements.breadcrumbName.textContent = currentDetailProduct.name;
  }

  if (elements.categoryLink) {
    elements.categoryLink.textContent =
      detailCategoryLabels[currentDetailProduct.category] || "DANH MỤC";
    elements.categoryLink.href = getDetailCategoryHref(currentDetailProduct.category);
  }

  renderDetailInfo(currentDetailProduct.category, elements.info);
  renderDetailThumbnails(currentDetailProduct, images, elements);
}

function setActiveSize(size) {
  selectedDetailSize = size;

  document.querySelectorAll(".detail-size-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.size === size);
  });
}

function showDetailFeedback(message) {
  const { feedback } = getDetailElements();

  if (feedback) {
    feedback.textContent = message;
  }
}

function saveDetailItemToCart(redirectToCheckout = false) {
  if (!currentDetailProduct) {
    return;
  }

  const detailItem = buildCartItem(currentDetailProduct, {
    selectedSize: selectedDetailSize,
  });

  if (redirectToCheckout) {
    saveCartStorage([detailItem]);
    window.location.href = getPageUrl("checkout.html");
    return;
  }

  let cart = getCartStorage();
  const existingItem = cart.find(
    (item) =>
      item.id === currentDetailProduct.id && item.selectedSize === selectedDetailSize,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart = [...cart, detailItem];
  }

  saveCartStorage(cart);
  renderCart();
  updateCartCount();
  openCart();
  showDetailFeedback(`Đã thêm size ${selectedDetailSize} vào giỏ hàng.`);
}

function addDetailProductToCart() {
  saveDetailItemToCart(false);
}

function buyDetailProductNow() {
  saveDetailItemToCart(true);
}

function handleDetailClick(event) {
  const thumbButton = event.target.closest(".detail-thumb");
  const sizeButton = event.target.closest(".detail-size-btn");

  if (thumbButton) {
    const { mainImage } = getDetailElements();

    if (mainImage) {
      mainImage.src = thumbButton.dataset.image;
    }

    document.querySelectorAll(".detail-thumb").forEach((button) => {
      button.classList.toggle("is-active", button === thumbButton);
    });
  }

  if (sizeButton) {
    setActiveSize(sizeButton.dataset.size);
  }
}

function initDetailPage() {
  document.addEventListener("click", handleDetailClick);
  document
    .getElementById("detailAddToCart")
    ?.addEventListener("click", addDetailProductToCart);
  document
    .getElementById("detailBuyNow")
    ?.addEventListener("click", buyDetailProductNow);

  renderDetailProduct();
  setActiveSize(selectedDetailSize);
}

initDetailPage();
