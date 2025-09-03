const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 40,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productImage = document.querySelector(".product-description_img img");
const productName = document.querySelector(".product-description_text h1");
const productPrice = document.querySelector(".price-section span");
const inventory = document.querySelector(".buy-section span");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const addProductBtn = document.querySelector(".buy-section button");
let selectedProduct = [];
let relatedProduct = [];

const showSelectedProduct = (product) => {
  if (product) {
    productImage.src = product.image;
    productName.textContent = product.title;
    productPrice.textContent = `${product.price.toLocaleString()} تومان`;
    inventory.textContent = `موجودی : ${product.inventory} عدد`;
  }
};
const fetchData = async () => {
  const response = await fetch("../data/products.json");
  const data = await response.json();

  selectedProduct = data.find((p) => p.id == productId);
  relatedProduct = data.filter((p) => p.category === selectedProduct.category);
  showSelectedProduct(selectedProduct);
  showRelatedProducts(relatedProduct);
};
const showRelatedProducts = (products) => {
  swiperWrapper.innerHTML = "";
  products.forEach((product) => {
    swiperWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 4" data-swiper-slide-index="0" style="width: 346.667px; margin-left: 40px;">
                    <div class="cover-new">
                        <a href="../pages/product.html?id=${product.id}">
                            <img src="../${product.image}" alt="">
                            <div class="new-prouducts-info">
                                <div class="products-info-wrapper">
                                    <span>${product.title}</span>
                                    <span>${product.price.toLocaleString()} تومان</span> 
                                </div>
                                <div>
                                </a>
                                    <button class="new-prouducts-info-svg" onclick = "addRelatedProducts(${
                                      product.id
                                    })">
                                        <svg>
                                            <use href="#shop-basket"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        
                    </div>
                </div>
    `
    );
  });
};
/////////////////////////////////basket section/////////////////////////////////////
let purchasedProduct = JSON.parse(localStorage.getItem("userbasket")) || [];
const basketProducts = document.querySelector(".middle-section-basket");
const price = document.querySelector(".price");
const counter = document.querySelector("#counter");
const shopCartCounter = document.querySelector(".head-left span");

const addInUserBasket = () => {
  const isAlreadyInBasket = purchasedProduct.some(
    (p) => p.id === selectedProduct.id
  );
  if (!isAlreadyInBasket) {
    purchasedProduct.push(selectedProduct);
    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  }
  showUserBasket();
  updateBasketIcon();
  finallPrice();
};
const addRelatedProducts = (productId) => {
  const mainProduct = relatedProduct.find(
    (product) => product.id === productId
  );

  const isAlreadyInBasket = purchasedProduct.some(
    (product) => product.id === productId
  );
  if (!isAlreadyInBasket) {
    purchasedProduct.push(mainProduct);
    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  }
  showUserBasket();
  updateBasketIcon();
  finallPrice();
};
const showUserBasket = () => {
  basketProducts.innerHTML = "";
  if (purchasedProduct.length === 0) {
    basketProducts.innerHTML = `<span style = " display:flex ; align-items: center; justify-content: center; height: 100%;">سبد خرید شما خالی است</span>`;
    counter.innerHTML = "0";
    localStorage.setItem("userbasket", JSON.stringify(purchasedProduct));
  } else {
    purchasedProduct.forEach((product) => {
      basketProducts.insertAdjacentHTML(
        "beforeend",
        `
      <div class="middle-section-basket_product">
                  <a href="../pages/product.html?id=${product.id}">
                      <img src="../${product.image}" alt="">
                  </a>
                  <div class="middle-section-basket_info">
                      <a href="../pages/product.html?id=${product.id}">${
          product.title
        }</a>
                      <span>${product.price.toLocaleString()} تومان</span>
                  </div>
                  <button class="middle-section-basket_btn" onclick = "removeProduct(${
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
    counter.innerHTML = `${purchasedProduct.length} عدد`;
  }

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
addProductBtn.addEventListener("click", addInUserBasket);
window.addEventListener("load", () => {
  fetchData();
  showUserBasket();
  finallPrice();
  updateBasketIcon();
});
