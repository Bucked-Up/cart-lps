import { resetProducts } from "./appData.js";

const closeCart = () => {
  const inCartContainer = document.querySelector(".cart__in-cart-container");
  const bumpContainer = document.querySelector(".cart__order-bumps-container");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const bumpCard = inCartContainer.querySelector(".cart__product:has(.remove-button)");

  document.body.classList.remove("no-scroll");
  cartWrapper.classList.remove("active");
  if (bumpCard) bumpContainer.appendChild(bumpCard);
  inCartContainer.innerHTML = "";
  resetProducts();
};

export default closeCart;
