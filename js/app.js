const hamMenu = document.querySelector(".head-right");
const hiddenMenu = document.querySelector(".right-menu");
const closeHamMenuBtn = document.querySelector(".right-menu-svg svg");
const shopCartBtn = document.querySelector(".head-left svg");
const shopCartCounter = document.querySelector(".head-left span");
const basket = document.querySelector(".basket");
const overlay = document.querySelector(".overlay");
const latestProductsWrapper = document.querySelector("#latest");
const plusBtn = document.querySelectorAll(".svg-plus");
const minusBtn = document.querySelectorAll(".svg-minus");
const answer = document.querySelectorAll(".answer");
const questionBtn = document.querySelectorAll(".question-btn");
const qOneButton = document.querySelector(".q-one button");
const svgplusOne = document.querySelector(".q-one button .svg-plus");
const svgminusOne = document.querySelector(".q-one button .svg-minus");
const qTwoButton = document.querySelector(".q-two button");
const svgplusTwo = document.querySelector(".q-two button .svg-plus");
const svgminusTwo = document.querySelector(".q-two button .svg-minus");
const answerOne = document.querySelector(".answer_one");
const answerTwo = document.querySelector(".answer_two");

let isShown = false;

const groupingProducts = async () => {
  const response = await fetch("/data/products.json");
  const data = await response.json();
  const latestProducts = data.filter((item) => {
    return item.isNew === true;
  });
  productsForBasket.push(...latestProducts);

  latestProducts.forEach((product) => {
    latestProductsWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cover-new"> 
          <a href="/pages/product.html?id=${product.id}">
                <img src="${product.image}" alt="glasses">
              <div class="new-prouducts-info">
                    <div class="products-info-wrapper">
                        <span>${product.title}</span>
                        <div class="price-wrapper">
                          <span>${product.price.toLocaleString()}</span>
                          <span>تومان</span>
                        </div>
                          </div>
                        <div>
                             <button type="button" class="new-prouducts-info-svg" onclick = "event.preventDefault();event.stopPropagation(); addInUserBasket(${
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

closeHamMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  hiddenMenu.classList.add("hidden");
  overlay.classList.add("hidden");
});
hamMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  hiddenMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("m");
});
basket.addEventListener("click", (event) => {
  event.stopPropagation();
});
hiddenMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});
document.addEventListener("click", (event) => {
  if (!basket.contains(event.target)) {
    basket.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  if (!hiddenMenu.contains(event.target)) {
    hiddenMenu.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
qOneButton.addEventListener("click", () => {
  if (!isShown) {
    answerOne.style.display = "block";
    svgplusOne.style.display = " none";
    svgminusOne.style.display = " block";
    isShown = true;
  } else {
    answerOne.style.display = "none";
    svgplusOne.style.display = " block";
    svgminusOne.style.display = " none";
    isShown = false;
  }
});
qTwoButton.addEventListener("click", () => {
  if (!isShown) {
    answerTwo.style.display = "block";
    svgplusTwo.style.display = " none";
    svgminusTwo.style.display = " block";
    isShown = true;
  } else {
    answerTwo.style.display = "none";
    svgplusTwo.style.display = " block";
    svgminusTwo.style.display = " none";
    isShown = false;
  }
});

///////////////////////////////basket///////////////
const basketProducts = document.querySelector(".middle-section-basket");
const price = document.querySelector(".price");
const counter = document.querySelector("#counter");
let userbasket = [];
let productsForBasket = [];

const addInUserBasket = (productId) => {
  const mainProduct = productsForBasket.find(
    (product) => product.id === productId
  );

  const isAlreadyInBasket = userbasket.some(
    (product) => product.id === productId
  );
  if (!isAlreadyInBasket) {
    userbasket.push(mainProduct);
    localStorage.setItem("userbasket", JSON.stringify(userbasket));
  }
  updateBasketIcon();
};
const showUserBasket = () => {
  basketProducts.innerHTML = "";
  if (userbasket.length === 0) {
    basketProducts.innerHTML = `<span style = " display:flex ; align-items: center; justify-content: center; height: 100%;">سبد خرید شما خالی است</span>`;

    localStorage.setItem("userbasket", JSON.stringify(userbasket));
  } else {
    userbasket.forEach((product) => {
      basketProducts.insertAdjacentHTML(
        "beforeend",
        `
      <div class="middle-section-basket_product">
                  <a href="">
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
  counter.innerHTML = `${userbasket.length} عدد`;
  updateBasketIcon();
};

const removeProduct = (productId) => {
  const index = userbasket.findIndex((product) => product.id === productId);

  if (index !== -1) {
    userbasket.splice(index, 1);
    localStorage.setItem("userbasket", JSON.stringify(userbasket));
    showUserBasket();
    finallPrice();
  }
  updateBasketIcon();
};
const stored = () => {
  const storedBasket = localStorage.getItem("userbasket");
  if (storedBasket) {
    userbasket = JSON.parse(storedBasket);
  }
};
const finallPrice = () => {
  let sum = 0;
  userbasket.forEach((product) => {
    sum = sum + product.price;
  });
  price.innerHTML = `${sum.toLocaleString()} تومان`;
  localStorage.setItem("userbasket", JSON.stringify(userbasket));
  showUserBasket();
};
shopCartBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  basket.classList.remove("hidden");
  overlay.classList.remove("hidden");
  showUserBasket();
  finallPrice();
});
const updateBasketIcon = () => {
  if (userbasket.length === 0) {
    shopCartCounter.style.display = "none";
  } else {
    shopCartCounter.style.display = "flex";
    shopCartCounter.innerHTML = userbasket.length;
  }
};
window.addEventListener("load", () => {
  groupingProducts();
  stored();
  updateBasketIcon();
});
