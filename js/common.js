const hamMenu = document.querySelector(".head-right");
const hiddenMenu = document.querySelector(".right-menu");
const closeHamMenuBtn = document.querySelector(".right-menu-svg svg");
const shopCartBtn = document.querySelector(".head-left svg");
const basket = document.querySelector(".basket");
const overlay = document.querySelector(".overlay");
const plusBtn = document.querySelectorAll(".svg-plus");
closeHamMenuBtn.addEventListener("click", () => {
  hiddenMenu.classList.add("hidden");
});
closeHamMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  hiddenMenu.classList.add("hidden");
  overlay.classList.add("hidden");
});
hamMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  hiddenMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
shopCartBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  basket.classList.remove("hidden");
  overlay.classList.remove("hidden");
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
