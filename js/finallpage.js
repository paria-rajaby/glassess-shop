let purchasedProduct = JSON.parse(localStorage.getItem("userbasket")) || [];
const basketContainer = document.querySelector(".products-list");
const productNum = document.querySelector(".count-result_number");
const priceProductNum = document.querySelector(".price-result_number");
const basketProducts = document.querySelector(".middle-section-basket");
const counter = document.querySelector("#counter");
const price = document.querySelector(".price");
const confirmBtn = document.querySelector(".result-buttons_confirm");
const prevBtn = document.querySelector(".result-buttons_prev");
const shopCartCounter = document.querySelector(".head-left span");

const showProducts = () => {
  basketContainer.innerHTML = "";
  let totalPrice = 0;
  purchasedProduct.forEach((product) => {
    const totalPriceForProduct = product.price * product.count;
    totalPrice = totalPrice + totalPriceForProduct;
    basketContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="product">
                    <div class="image">
                        <img src="${product.image}" alt="">
                        <span>${product.title}</span>
                    </div>
                    <div class="price">
                        <span>${totalPriceForProduct.toLocaleString()} تومان</span>
                    </div>
                    <div class="count">
                        <button class="add" onclick = "addNumberOfProduct(${
                          product.id
                        })">
                            <svg>
                                <use href="#plus"></use>
                            </svg>
                        </button>
                        <span>${product.count}</span>
                        <button class="minus" onclick = "removeNumberOfProduct(${
                          product.id
                        })">
                            <svg>
                                <use href="#minus"></use>
                            </svg>
                        </button>
                    </div>
                    <div class="remove">
                        <button class="remove-btn" onclick = "removeProduct(${
                          product.id
                        })">
                            <svg>
                                <use href="#trash"></use>
                            </svg>
                        </button>
                    </div>
                </div>
        `
    );
  });

  productNum.innerHTML = getTotalCount();
  priceProductNum.innerHTML = totalPrice.toLocaleString();
};
const addNumberOfProduct = (productId) => {
  const existingProduct = purchasedProduct.find(
    (product) => product.id === productId
  );

  if (existingProduct.count >= 10) {
    alert("شما مجاز به انتخاب بیشتر از ده تا از هر محصول نیستید");
    existingProduct.count = 9;
  } else {
    existingProduct.count++;

    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
    showProducts();
  }
};
const removeNumberOfProduct = (productId) => {
  const existingProduct = purchasedProduct.find(
    (product) => product.id === productId
  );

  if (existingProduct.count <= 1) {
    purchasedProduct = purchasedProduct.filter(
      (product) => product.id !== productId
    );
  } else {
    existingProduct.count = --existingProduct.count;
  }
  localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  showProducts();
};
const getTotalCount = () => {
  return purchasedProduct.reduce((sum, product) => sum + product.count, 0);
};
const showUserBasket = () => {
  basketProducts.innerHTML = "";
  if (purchasedProduct.length === 0) {
    basketProducts.innerHTML = `<span style = " display:flex ; align-items: center; justify-content: center; height: 100%;">سبد خرید شما خالی است</span>`;

    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  } else {
    purchasedProduct.forEach((product) => {
      basketProducts.insertAdjacentHTML(
        "beforeend",
        `
      <div class="middle-section-basket_product">
                  <a href="/pages/product.html?id=${product.id}">
                      <img src="${product.image}" alt="">
                  </a>
                  <div class="middle-section-basket_info">
                      <a href="/pages/product.html?id=${product.id}">${
          product.title
        }</a>
                      <span>${product.price.toLocaleString()} تومان</span>
                  </div>
                  <button class="middle-section-basket_btn" onclick="removeProduct(${
                    product.id
                  })">
                      <svg>
                          <use href="#trash"></use>
                      </svg>
                  </button>
              </div>
      `
      );
    });
  }
  counter.innerHTML = `${purchasedProduct.length} عدد`;
  updateBasketIcon();
};
const removeProduct = (productId) => {
  const index = purchasedProduct.findIndex(
    (product) => product.id === productId
  );

  if (index !== -1) {
    purchasedProduct.splice(index, 1);
    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
    showUserBasket();
    finallPrice();
    showProducts();
  }
  updateBasketIcon();
};
const finallPrice = () => {
  let sum = 0;
  purchasedProduct.forEach((product) => {
    sum = sum + product.price;
  });
  price.innerHTML = `${sum.toLocaleString()} تومان`;
  localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  showUserBasket();
};
const updateBasketIcon = () => {
  if (purchasedProduct.length === 0) {
    shopCartCounter.style.display = "none";
  } else {
    shopCartCounter.style.display = "flex";
    shopCartCounter.innerHTML = purchasedProduct.length;
  }
};
confirmBtn.addEventListener("click", () => {
  alert("سفارش شما با موفقیت ثبت شد");
});
prevBtn.addEventListener("click", () => {
  history.back();
});
window.addEventListener("load", () => {
  showProducts();
  showUserBasket();
  finallPrice();
  updateBasketIcon();
});
