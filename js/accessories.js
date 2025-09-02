const productWrapper = document.querySelector(".product");
const paginationWrapper = document.querySelector("#pagination");
const searchBoxInput = document.querySelector(".search-box input");
const searchBoxBtn = document.querySelector(".search-box button");
const expensiveCheckInput = document.querySelector(".expensive input");
const cheapCheckInput = document.querySelector(".cheap input");
const mostSaledCheckInput = document.querySelector(".most-saled input");
const checkInputs = document.querySelectorAll(".toggle-btn input");
const filterBar = document.querySelectorAll(".products-bar_left span");
const productCount = document.querySelector(".product-title-wrapper span");
const filterinMobileBtn = document.querySelector("#filter-btns_filtering");
const removeFilterinMobileBtn = document.querySelector(
  "#filter-btns_all__products"
);
const filterMoblie = document.querySelector(".mobile-filter");
const removeFilterBtn = document.querySelector(".filter-head div");
const checkInputsMobile = document.querySelectorAll(".toggle-btn_mobile input");
const mobileApplyFilter = document.querySelector(".filter-footer button");

let accessoriesProductArray = [];
let currentPage = 1;
const itemsPerPage = 6;
const renderProducts = (products, page) => {
  productWrapper.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = products.slice(start, end);

  paginatedItems.forEach((product) => {
    productWrapper.insertAdjacentHTML(
      "beforeend",
      `
                <div class="cover-new">
                        <a href="../pages/product.html?id=${product.id}">
                                <img src="../${product.image}" alt="glasess">
                                <div class="new-prouducts-info">
                                    <div class="products-info-wrapper">
                                        <span>${product.title}</span>
                                        <div class="price-wrapper">
                                          <span>${product.price.toLocaleString()}</span>
                                          <span>تومان</span>
                                        </div>
                                    </div>
                                    <div>
                                       <button class="new-prouducts-info-svg" onclick="event.preventDefault();event.stopPropagation(); addInUserBasket(${
                                         product.id
                                       })">
                                        <svg>
                                            <use href="#shop-basket"></use>
                                        </svg>
                                       </button>
                                    </div>
                                </div>
                        </a>
                </div>
            `
    );
  });
};
const renderPagination = (products) => {
  paginationWrapper.innerHTML = "";

  const pageCount = Math.ceil(products.length / itemsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    if (i === currentPage) {
      button.style.fontWeight = "bold";
      button.style.background = "#87CEFA";
      button.style.color = "#fff";
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderProducts(products, currentPage);
      renderPagination(products);
    });
    paginationWrapper.appendChild(button);
  }
};
const accessoriesProduct = async () => {
  const response = await fetch("../data/products.json");
  const data = await response.json();

  accessoriesProductArray = data.filter(
    (item) => item.category === "accessory"
  );
  productCount.innerHTML = `${accessoriesProductArray.length} عدد`;

  renderProducts(accessoriesProductArray, currentPage);
  renderPagination(accessoriesProductArray);
  searchBox(accessoriesProductArray);
  searchEnter(accessoriesProductArray);
  expensiveProducts(accessoriesProductArray);
  cheapProducts(accessoriesProductArray);
  mostSaledProducts(accessoriesProductArray);
  filterSection(accessoriesProductArray);
  mobileFiltering(accessoriesProductArray);
};
const searchBox = (accessoriesProductArray) => {
  searchBoxBtn.addEventListener("click", () => {
    const searchValue = searchBoxInput.value.toLowerCase();
    const filteredProducts = accessoriesProductArray.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    currentPage = 1;
    if (filteredProducts.length === 0) {
      productWrapper.insertAdjacentHTML(
        "beforeend",
        `
              <div style="text-align:center" ><span>محصولی با عنوان <span style="font-weight:bold" >${searchValue}</span> یافت نشد):</span></div>
            `
      );
    } else {
      renderProducts(filteredProducts, currentPage);
      renderPagination(filteredProducts);
    }
  });
};
const searchEnter = (accessoriesProductArray) => {
  searchBoxInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchValue = searchBoxInput.value.toLowerCase();

      const filteredProducts = accessoriesProductArray.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
      );
      currentPage = 1;
      productWrapper.innerHTML = "";
      if (filteredProducts.length === 0) {
        productWrapper.insertAdjacentHTML(
          "beforeend",
          `
          <div style="text-align:center" ><span>محصولی با عنوان <span style="font-weight:bold" >${searchValue}</span> یافت نشد):</span></div>
        `
        );
      } else {
        renderProducts(filteredProducts, currentPage);
        renderPagination(filteredProducts);
      }
    }
  });
};
const expensiveProducts = (accessoriesProductArray) => {
  expensiveCheckInput.addEventListener("change", () => {
    currentPage = 1;
    let filteredProducts;

    if (expensiveCheckInput.checked) {
      filteredProducts = accessoriesProductArray.filter(
        (item) => item.price >= 300000
      );
    } else {
      filteredProducts = accessoriesProductArray;
    }
    renderProducts(filteredProducts, currentPage);
    renderPagination(filteredProducts);
  });
};
const cheapProducts = (accessoriesProductArray) => {
  cheapCheckInput.addEventListener("change", () => {
    currentPage = 1;
    let filteredProducts;
    if (cheapCheckInput.checked) {
      filteredProducts = accessoriesProductArray.filter(
        (item) => item.price < 300000
      );
    } else {
      filteredProducts = accessoriesProductArray;
    }
    renderProducts(filteredProducts, currentPage);
    renderPagination(filteredProducts);
  });
};
const mostSaledProducts = (accessoriesProductArray) => {
  mostSaledCheckInput.addEventListener("change", () => {
    currentPage = 1;
    let filteredProducts;
    if (mostSaledCheckInput.checked) {
      filteredProducts = accessoriesProductArray.filter(
        (item) => item.saled >= 80
      );
    } else {
      filteredProducts = accessoriesProductArray;
    }
    renderProducts(filteredProducts, currentPage);
    renderPagination(filteredProducts);
  });
};
checkInputs.forEach((checkInput) => {
  checkInput.addEventListener("change", (e) => {
    if (e.target.checked) {
      checkInputs.forEach((cb) => {
        if (cb !== e.target) {
          cb.checked = false;
        }
      });
    }
  });
});
const filterSection = (accessoriesProductArray) => {
  filterBar.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      const dataSetValue = event.target.dataset.filter;

      filterBar.forEach((item) => {
        item.classList.remove("border-white");
        filter.classList.add("border-white");
      });
      switch (dataSetValue) {
        case "all":
          renderProducts(accessoriesProductArray, 1);
          renderPagination(accessoriesProductArray);
          break;

        case "expensive":
          const expensive = accessoriesProductArray.filter(
            (item) => item.price >= 300000
          );
          renderProducts(expensive, 1);
          renderPagination(expensive);
          break;

        case "cheap":
          const cheap = accessoriesProductArray.filter(
            (item) => item.price < 300000
          );
          renderProducts(cheap, 1);
          renderPagination(cheap);
          break;
        case "moastsaled":
          const moastsaled = accessoriesProductArray.filter(
            (item) => item.saled >= 80
          );
          renderProducts(moastsaled, 1);
          renderPagination(moastsaled);
          break;
      }
    });
  });
};
const closeFilterMobile = () => {
  filterMoblie.style.display = "none";
};
const mobileFiltering = (accessoriesProductArray) => {
  checkInputsMobile.forEach((checkInput) => {
    checkInput.addEventListener("change", (e) => {
      const dataSetValue = e.target.dataset.set;

      switch (dataSetValue) {
        case "all":
          renderProducts(accessoriesProductArray, 1);
          renderPagination(accessoriesProductArray);
          break;

        case "expensive":
          const expensive = accessoriesProductArray.filter(
            (item) => item.price >= 300000
          );
          renderProducts(expensive, 1);
          renderPagination(expensive);
          break;

        case "cheap":
          const cheap = accessoriesProductArray.filter(
            (item) => item.price < 300000
          );
          renderProducts(cheap, 1);
          renderPagination(cheap);
          break;
        case "moastsaled":
          const moastsaled = accessoriesProductArray.filter(
            (item) => item.saled >= 80
          );
          renderProducts(moastsaled, 1);
          renderPagination(moastsaled);
          break;
      }
    });
    closeFilterMobile();
  });
};
filterinMobileBtn.addEventListener("click", () => {
  filterMoblie.style.display = "flex";
});
const uncheckInputs = () => {
  checkInputsMobile.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
};
checkInputsMobile.forEach((checkInput) => {
  checkInput.addEventListener("change", (e) => {
    if (e.target.checked) {
      checkInputsMobile.forEach((cb) => {
        if (cb !== e.target) {
          cb.checked = false;
        }
      });
    }
  });
});
removeFilterBtn.addEventListener("click", closeFilterMobile);
mobileApplyFilter.addEventListener("click", mobileFiltering);
removeFilterinMobileBtn.addEventListener("click", () => {
  accessoriesProduct();
  uncheckInputs();
});
/////////////////////////////////basket section/////////////////////////////////////
let purchasedProduct = JSON.parse(localStorage.getItem("userbasket")) || [];
const basketProducts = document.querySelector(".middle-section-basket");
const price = document.querySelector(".price");
const counter = document.querySelector("#counter");
const shopCartCounter = document.querySelector(".head-left span");

const addInUserBasket = (productId) => {
  const mainProduct = accessoriesProductArray.find(
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
window.addEventListener("load", () => {
  accessoriesProduct();
  showUserBasket();
  finallPrice();
  updateBasketIcon();
});
