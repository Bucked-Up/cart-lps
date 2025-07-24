import createBumpButtons from "./createBumpButtons.js";
import createProductBase from "./createProductBase.js";

const handleQuantityBump = ({ type, ids, quantity, name, image, price, couponCode }, cartOrderBumpsContainer, inCartContainer) => {
  const [card, cardImage, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  cardImage.src = image;
  productTitle.innerHTML = name;
  cartOrderBumpsContainer.appendChild(card);
  createBumpButtons({ price, productInfoWrapper, ids, card, couponCode, quantity });
};

export default handleQuantityBump;
