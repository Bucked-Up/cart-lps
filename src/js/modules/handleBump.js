import { getProductQuantity, setCoupon, setProductQuantity } from "./appData.js";
import createProductBase from "./createProductBase.js";

const handleBump = ({ type, ids, quantity, name, image, price, couponCode }, ogCouponCode, cartOrderBumpsContainer, inCartContainer) => {
  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.innerHTML = `Add to cart for only +$${price}`;
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerHTML = "Added to cart";
  const [card, cardImage, imageWrapper, productTitle, optionTitle, productInfoWrapper] = createProductBase();
  cardImage.src = image;
  productTitle.innerHTML = name;
  productInfoWrapper.appendChild(addButton);
  productInfoWrapper.appendChild(removeButton);
  cartOrderBumpsContainer.appendChild(card);

  const oldQuantities = {};

  addButton.addEventListener("click", () => {
    inCartContainer.appendChild(card);
    ids.forEach((id) => {
      oldQuantities[id] = getProductQuantity({ productId: id });
      setProductQuantity({ productId: id, productQuantity: quantity });
      setCoupon(couponCode);
    });
  });
  removeButton.addEventListener("click", () => {
    cartOrderBumpsContainer.appendChild(card);
    ids.forEach((id) => {
      setProductQuantity({ productId: id, productQuantity: oldQuantities[id] });
      setCoupon(ogCouponCode);
    });
  });
};

export default handleBump;
